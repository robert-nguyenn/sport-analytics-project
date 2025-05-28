from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import pandas as pd
import numpy as np
from typing import Dict, List, Any
import json
from datetime import datetime
import plotly.express as px
import plotly.graph_objects as go
from io import StringIO
import traceback

app = FastAPI(title="CSV Analysis API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    """API root endpoint - used to verify API is running"""
    return {"status": "online", "message": "CSV Analysis API is running"}

class DataAnalyzer:
    def __init__(self, df: pd.DataFrame):
        self.df = df
        self.cleaning_log = []
        self.column_types = {}
        self.analysis_results = {}

    def clean_data(self) -> None:
        """Clean and preprocess the data"""
        # Log initial state
        self.cleaning_log.append({
            "step": "initial",
            "rows": len(self.df),
            "columns": len(self.df.columns),
            "columns_list": list(self.df.columns)
        })

        # Remove duplicate rows
        initial_rows = len(self.df)
        self.df.drop_duplicates(inplace=True)
        if len(self.df) < initial_rows:
            self.cleaning_log.append({
                "step": "remove_duplicates",
                "removed_rows": initial_rows - len(self.df)
            })

        # Clean column names
        original_columns = list(self.df.columns)
        self.df.columns = [col.strip().lower().replace(' ', '_') for col in self.df.columns]
        
        # Log column name changes if any
        if list(self.df.columns) != original_columns:
            self.cleaning_log.append({
                "step": "clean_column_names",
                "original_columns": original_columns,
                "cleaned_columns": list(self.df.columns)
            })
        
        # Infer and convert data types
        for col in self.df.columns:
            # Check for all missing values
            if self.df[col].isna().all():
                self.column_types[col] = "empty"
                continue
                
            # Try to convert to datetime
            try:
                if self.df[col].dtype == 'object':
                    # Check if the column name contains time-related keywords
                    if any(time_keyword in col.lower() for time_keyword in ['time', 'date', 'clock']):
                        # Try parsing with different time formats
                        dt_series = pd.to_datetime(self.df[col], errors='coerce')
                        if dt_series.notna().mean() > 0.5:
                            self.df[col] = dt_series
                            self.column_types[col] = "datetime"
                            self.cleaning_log.append({
                                "step": f"convert_datetime_{col}",
                                "action": "Converted column to datetime",
                                "success_rate": f"{dt_series.notna().mean()*100:.1f}%"
                            })
                            continue
                    
                    # Try common date formats as a fallback
                    self.df[col] = pd.to_datetime(self.df[col], errors='coerce')
                    if self.df[col].notna().mean() > 0.5:
                        self.column_types[col] = "datetime"
                        self.cleaning_log.append({
                            "step": f"convert_{col}_to_datetime",
                            "success_rate": f"{self.df[col].notna().mean() * 100:.2f}%"
                        })
                        continue
                    else:
                        # Revert if most values couldn't be converted
                        self.df[col] = self.df[col].astype('object')
            except Exception as e:
                print(f"Error converting {col} to datetime: {e}")

            # Try to convert to numeric
            try:
                if self.df[col].dtype == 'object':
                    numeric_col = pd.to_numeric(self.df[col], errors='coerce')
                    # If most values converted successfully
                    if numeric_col.notna().mean() > 0.5:
                        self.df[col] = numeric_col
                        self.column_types[col] = "numeric"
                        self.cleaning_log.append({
                            "step": f"convert_{col}_to_numeric",
                            "success_rate": f"{numeric_col.notna().mean() * 100:.2f}%"
                        })
                        continue
            except Exception as e:
                print(f"Error converting {col} to numeric: {e}")

            # If not datetime or numeric, treat as categorical
            self.column_types[col] = "categorical"

        # Handle missing values
        for col in self.df.columns:
            missing_count = self.df[col].isna().sum()
            if missing_count > 0:
                if self.column_types[col] == "numeric":
                    median_value = self.df[col].median()
                    self.df[col].fillna(median_value, inplace=True)
                    self.cleaning_log.append({
                        "step": f"handle_missing_{col}",
                        "missing_count": int(missing_count),
                        "action": "filled with median",
                        "value": float(median_value)
                    })
                elif self.column_types[col] == "categorical":
                    mode_value = self.df[col].mode()[0] if not self.df[col].mode().empty else "Unknown"
                    self.df[col].fillna(mode_value, inplace=True)
                    self.cleaning_log.append({
                        "step": f"handle_missing_{col}",
                        "missing_count": int(missing_count),
                        "action": "filled with mode",
                        "value": str(mode_value)
                    })
                elif self.column_types[col] == "datetime":
                    # For datetime, fill with median date if possible
                    try:
                        median_date = self.df[col].median()
                        self.df[col].fillna(median_date, inplace=True)
                        self.cleaning_log.append({
                            "step": f"handle_missing_{col}",
                            "missing_count": int(missing_count),
                            "action": "filled with median date",
                            "value": str(median_date)
                        })
                    except:
                        # If median fails, just forward fill
                        self.df[col].fillna(method='ffill', inplace=True)
                        self.df[col].fillna(method='bfill', inplace=True)  # In case ffill leaves NaNs at the beginning
                        self.cleaning_log.append({
                            "step": f"handle_missing_{col}",
                            "missing_count": int(missing_count),
                            "action": "filled with forward/backward fill"
                        })

    def analyze_data(self) -> Dict[str, Any]:
        """Perform statistical analysis on the data"""
        results = {
            "summary": {},
            "correlations": {},
            "distributions": {}
        }

        # Generate overall dataset info
        results["dataset_info"] = {
            "rows": len(self.df),
            "columns": len(self.df.columns),
            "column_types": self.column_types,
            "memory_usage": f"{self.df.memory_usage(deep=True).sum() / (1024 * 1024):.2f} MB"
        }

        # Generate summary statistics for numeric columns
        numeric_cols = [col for col, type_ in self.column_types.items() if type_ == "numeric"]
        if numeric_cols:
            results["summary"]["numeric"] = {}
            numeric_summary = self.df[numeric_cols].describe().to_dict()
            for col, stats in numeric_summary.items():
                results["summary"]["numeric"][col] = {k: float(v) for k, v in stats.items()}

        # Generate frequency counts for categorical columns
        categorical_cols = [col for col, type_ in self.column_types.items() if type_ == "categorical"]
        for col in categorical_cols:
            # Limit to top categories if there are too many unique values
            unique_count = self.df[col].nunique()
            if unique_count > 20:  # If more than 20 unique values
                top_n = 10
                top_categories = self.df[col].value_counts().nlargest(top_n)
                results["summary"][col] = {
                    "unique_values": int(unique_count),
                    "top_categories": top_categories.to_dict(),
                    "note": f"Showing top {top_n} of {unique_count} categories"
                }
            else:
                results["summary"][col] = {
                    "unique_values": int(unique_count),
                    "categories": self.df[col].value_counts().to_dict()
                }

        # Generate summary for datetime columns
        datetime_cols = [col for col, type_ in self.column_types.items() if type_ == "datetime"]
        if datetime_cols:
            results["summary"]["datetime"] = {}
            for col in datetime_cols:
                try:
                    results["summary"]["datetime"][col] = {
                        "min": self.df[col].min().strftime('%Y-%m-%d %H:%M:%S'),
                        "max": self.df[col].max().strftime('%Y-%m-%d %H:%M:%S'),
                        "range_days": (self.df[col].max() - self.df[col].min()).days
                    }
                except:
                    # Some datetime columns might have issues
                    results["summary"]["datetime"][col] = {
                        "error": "Could not calculate datetime summary"
                    }

        # Calculate correlations between numeric columns
        if len(numeric_cols) > 1:
            try:
                corr_matrix = self.df[numeric_cols].corr().round(3)
                results["correlations"] = corr_matrix.to_dict()
            except Exception as e:
                print(f"Error calculating correlations: {e}")
                results["correlations"] = {"error": str(e)}

        # Identify potential outliers in numeric data
        results["outliers"] = {}
        for col in numeric_cols:
            try:
                Q1 = self.df[col].quantile(0.25)
                Q3 = self.df[col].quantile(0.75)
                IQR = Q3 - Q1
                lower_bound = Q1 - 1.5 * IQR
                upper_bound = Q3 + 1.5 * IQR
                outliers = self.df[(self.df[col] < lower_bound) | (self.df[col] > upper_bound)][col]
                
                if not outliers.empty:
                    results["outliers"][col] = {
                        "count": len(outliers),
                        "percentage": f"{(len(outliers) / len(self.df)) * 100:.2f}%",
                        "range": [float(outliers.min()), float(outliers.max())] if not outliers.empty else None
                    }
            except Exception as e:
                print(f"Error finding outliers for {col}: {e}")

        # Calculate basic distributions for numeric columns
        for col in numeric_cols:
            try:
                results["distributions"][col] = {
                    "min": float(self.df[col].min()),
                    "max": float(self.df[col].max()),
                    "mean": float(self.df[col].mean()),
                    "median": float(self.df[col].median()),
                    "std": float(self.df[col].std()),
                    "skew": float(self.df[col].skew()),
                    "kurtosis": float(self.df[col].kurtosis())
                }
            except Exception as e:
                print(f"Error calculating distribution for {col}: {e}")

        return results

    def generate_visualizations(self) -> Dict[str, Any]:
        """Generate Plotly visualizations for the data"""
        viz = {}

        # Generate histograms for numeric columns
        numeric_cols = [col for col, type_ in self.column_types.items() if type_ == "numeric"]
        for col in numeric_cols:
            try:
                fig = px.histogram(
                    self.df, 
                    x=col, 
                    title=f"Frequency of {col}",
                    labels={col: col.replace('_', ' ')}
                )
                fig.update_layout(
                    template="plotly_white",
                    xaxis_title=col.replace('_', ' '),
                    yaxis_title="count"
                )
                viz[f"hist_{col}"] = json.loads(fig.to_json())
            except Exception as e:
                print(f"Error generating histogram for {col}: {e}")

        # Generate bar charts for categorical columns (limit to those with fewer unique values)
        categorical_cols = [col for col, type_ in self.column_types.items() if type_ == "categorical" and self.df[col].nunique() < 15]
        for col in categorical_cols:
            try:
                # Only create visualization if there are actual values (not all Unknown/NaN)
                if self.df[col].nunique() > 1 or (self.df[col].nunique() == 1 and self.df[col].iloc[0] != "Unknown"):
                    value_counts = self.df[col].value_counts().nlargest(10).reset_index()
                    value_counts.columns = [col, 'count']
                    fig = px.bar(
                        value_counts, 
                        x=col, 
                        y='count', 
                        title=f"Frequency of {col}",
                        labels={col: col.replace('_', ' '), 'count': 'count'}
                    )
                    fig.update_layout(
                        template="plotly_white",
                        xaxis_title=col.replace('_', ' '),
                        yaxis_title="count"
                    )
                    viz[f"bar_{col}"] = json.loads(fig.to_json())
            except Exception as e:
                print(f"Error generating bar chart for {col}: {e}")

        # Generate timeline plots for datetime columns
        datetime_cols = [col for col, type_ in self.column_types.items() if type_ == "datetime"]
        if datetime_cols and numeric_cols:
            for date_col in datetime_cols[:2]:  # Limit to first 2 datetime columns
                for num_col in numeric_cols[:3]:  # Limit to first 3 numeric columns
                    try:
                        # Make sure data is sorted by date
                        sorted_df = self.df.sort_values(date_col)
                        fig = px.line(
                            sorted_df, 
                            x=date_col, 
                            y=num_col, 
                            title=f"{num_col} over {date_col}",
                            labels={date_col: date_col.replace('_', ' '), num_col: num_col.replace('_', ' ')}
                        )
                        fig.update_layout(
                            template="plotly_white",
                            xaxis_title=date_col.replace('_', ' '),
                            yaxis_title=num_col.replace('_', ' ')
                        )
                        viz[f"time_{date_col}_{num_col}"] = json.loads(fig.to_json())
                    except Exception as e:
                        print(f"Error generating timeline for {date_col}/{num_col}: {e}")

        # Generate correlation heatmap if we have numeric columns
        if len(numeric_cols) > 1:
            try:
                corr_matrix = self.df[numeric_cols].corr().round(2)
                fig = px.imshow(
                    corr_matrix,
                    title="Correlation Heatmap",
                    labels=dict(color="Correlation"),
                    color_continuous_scale=px.colors.diverging.RdBu_r,
                    zmin=-1, zmax=1
                )
                fig.update_layout(template="plotly_white")
                viz["correlation_heatmap"] = json.loads(fig.to_json())
            except Exception as e:
                print(f"Error generating correlation heatmap: {e}")

        # Generate scatter plot for two numeric columns if available
        if len(numeric_cols) >= 2:
            try:
                fig = px.scatter(
                    self.df, 
                    x=numeric_cols[0], 
                    y=numeric_cols[1],
                    title=f"Scatter Plot: {numeric_cols[0]} vs {numeric_cols[1]}",
                    labels={
                        numeric_cols[0]: numeric_cols[0].replace('_', ' '), 
                        numeric_cols[1]: numeric_cols[1].replace('_', ' ')
                    }
                )
                fig.update_layout(template="plotly_white")
                viz[f"scatter_{numeric_cols[0]}_{numeric_cols[1]}"] = json.loads(fig.to_json())
            except Exception as e:
                print(f"Error generating scatter plot: {e}")

        return viz

@app.post("/analyze-csv")
async def analyze_csv(file: UploadFile = File(...)):
    try:
        # Read the CSV file
        contents = await file.read()
        
        # Try to parse using different strategies
        try:
            # First try with standard UTF-8 encoding
            df = pd.read_csv(StringIO(contents.decode('utf-8')))
        except UnicodeDecodeError:
            # If that fails, try latin-1 encoding
            df = pd.read_csv(StringIO(contents.decode('latin-1')))
        except Exception as e:
            # Catch any other parsing issues
            raise HTTPException(status_code=400, detail=f"CSV parsing error: {str(e)}")

        # Validate that the DataFrame is not empty
        if df.empty:
            raise HTTPException(status_code=400, detail="The CSV file appears to be empty")

        # Handle timestamps in the clock column that might be problematic
        if 'Clock' in df.columns:
            try:
                # Convert clock patterns like "25:00:00" to proper time format
                df['Clock'] = df['Clock'].astype(str).replace(
                    r'(\d+):(\d+):(\d+)', 
                    lambda m: f"2025-05-28 {int(m.group(1)):02d}:{int(m.group(2)):02d}:{int(m.group(3)):02d}", 
                    regex=True
                )
                # Convert clock patterns like "25:32:00" to proper time format
                df['Clock'] = df['Clock'].replace(
                    r'(\d+):(\d+)', 
                    lambda m: f"2025-05-28 {int(m.group(1)):02d}:{int(m.group(2)):02d}:00", 
                    regex=True
                )
                # Convert special patterns like "--" to NaN
                df['Clock'] = df['Clock'].replace(['--', '-', 'nan', ''], pd.NA)
            except Exception as e:
                print(f"Error preprocessing Clock column: {e}")
        
        # Pre-process all data to make it JSON-serializable
        # Convert all Timestamp objects to strings
        for col in df.columns:
            # Convert any timestamp columns to strings right away
            if pd.api.types.is_datetime64_any_dtype(df[col]):
                df[col] = df[col].astype(str)
            # Convert any timestamp objects that might be in index
            if isinstance(df.index, pd.DatetimeIndex):
                df.index = df.index.astype(str)
                
        # Aggressively clean numeric data to prevent JSON serialization issues
        for col in df.select_dtypes(include=['float', 'int']).columns:
            # Replace infinite and NaN values
            df[col] = df[col].replace([np.inf, -np.inf, np.nan], None)
            
            # Extra check to convert any problematic values to None
            df[col] = df[col].map(lambda x: None if isinstance(x, float) and (pd.isna(x) or np.isnan(x) or np.isinf(x)) else x)
            
        # Initialize analyzer
        analyzer = DataAnalyzer(df)
        
        # Clean the data
        analyzer.clean_data()
        
        # Perform analysis
        analysis_results = analyzer.analyze_data()
        
        # Generate visualizations
        visualizations = analyzer.generate_visualizations()
        
        # Recursive function to ensure all objects are JSON serializable
        def make_json_safe(obj):
            if isinstance(obj, (pd.Timestamp, datetime, np.datetime64)):
                return str(obj)
            elif isinstance(obj, (np.int_, np.intc, np.intp, np.int8, np.int16, np.int32, np.int64,
                                np.uint8, np.uint16, np.uint32, np.uint64)):
                return int(obj)
            elif isinstance(obj, (np.float_, np.float16, np.float32, np.float64)):
                if np.isnan(obj) or np.isinf(obj):
                    return None
                return float(obj)
            elif isinstance(obj, (np.ndarray, pd.Series)):
                return make_json_safe(obj.tolist())
            elif isinstance(obj, pd.DataFrame):
                return make_json_safe(obj.to_dict(orient='records'))
            elif isinstance(obj, dict):
                return {make_json_safe(k): make_json_safe(v) for k, v in obj.items()}
            elif isinstance(obj, list):
                return [make_json_safe(item) for item in obj]
            elif isinstance(obj, tuple):
                return [make_json_safe(item) for item in obj]
            elif isinstance(obj, set):
                return [make_json_safe(item) for item in obj]
            return obj

        # Prepare response
        response = {
            "cleaning_log": make_json_safe(analyzer.cleaning_log),
            "column_types": make_json_safe(analyzer.column_types),
            "analysis": make_json_safe(analysis_results),
            "visualizations": make_json_safe(visualizations),
            "preview": make_json_safe(df.head(10).to_dict(orient='records'))
        }

        # Direct JSON response to ensure we have full control over serialization
        return JSONResponse(content=response)

    except HTTPException:
        # Re-raise HTTP exceptions
        raise
    except Exception as e:
        # Log all other exceptions
        print(f"Error processing CSV: {str(e)}")
        print(traceback.format_exc())
        raise HTTPException(status_code=400, detail=f"Error processing file: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)