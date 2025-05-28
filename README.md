# CSV Analysis Dashboard

A modern web application for analyzing and visualizing CSV data. This tool provides automatic data cleaning, statistical analysis, and interactive visualizations for any CSV file.

## Features

- Universal CSV ingestion with automatic data type detection
- Data cleaning pipeline with missing value handling
- Statistical analysis including summary statistics and correlations
- Interactive visualizations using Plotly
- Modern, responsive UI built with React and Material-UI

## Project Structure

```
.
├── backend/
│   └── main.py           # FastAPI backend service
├── frontend/
│   ├── src/
│   │   └── App.js        # React frontend application
│   └── package.json      # Frontend dependencies
├── requirements.txt      # Backend dependencies
└── README.md            # This file
```

## Setup

### Backend

1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Start the backend server:
   ```bash
   cd backend
   uvicorn main:app --reload
   ```

### Frontend

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

The application will be available at http://localhost:3000

## Usage

1. Open the application in your web browser
2. Drag and drop a CSV file onto the upload area or click to select a file
3. Wait for the analysis to complete
4. Explore the data preview, summary statistics, and visualizations

## API Documentation

The backend API documentation is available at http://localhost:8000/docs when the server is running.

## Extending the Application

### Adding New Analysis Types

1. Add new methods to the `DataAnalyzer` class in `backend/main.py`
2. Update the API endpoint to include the new analysis results
3. Add corresponding visualization components in the frontend

### Customizing Visualizations

1. Modify the `generate_visualizations` method in `backend/main.py`
2. Update the frontend visualization rendering in `frontend/src/App.js`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License 