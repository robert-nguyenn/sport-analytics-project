import React, { useState, useEffect } from 'react';
import { 
  Box, FormControl, InputLabel, Select, MenuItem, Button, IconButton,
  Stack, Paper, Typography, Divider, Tooltip, Chip, ToggleButtonGroup, ToggleButton
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import BarChartIcon from '@mui/icons-material/BarChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import SendIcon from '@mui/icons-material/Send';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import ShuffleIcon from '@mui/icons-material/Shuffle';

const ChartControls = ({ 
  columns, 
  columnTypes = {}, 
  groupBy, 
  setGroupBy, 
  xAxis, 
  setXAxis, 
  yAxis, 
  setYAxis,
  chartType,
  setChartType, 
  onGenerateChart,
  onRunRegression 
}) => {
  const [suggestedColumns, setSuggestedColumns] = useState({
    categorical: [],
    numeric: [],
    datetime: []
  });
  
  const [autoSuggestion, setAutoSuggestion] = useState(false);
  
  useEffect(() => {
    if (!columns || !columnTypes) return;
    
    const categorized = {
      categorical: [],
      numeric: [],
      datetime: []
    };
    
    // Categorize columns based on their types
    columns.forEach(col => {
      const type = columnTypes[col] || 'categorical'; // Default to categorical if type is unknown
      if (type === 'numeric') {
        categorized.numeric.push(col);
      } else if (type === 'datetime') {
        categorized.datetime.push(col);
      } else if (type === 'categorical') {
        categorized.categorical.push(col);
      }
    });
    
    setSuggestedColumns(categorized);
    
    // Auto-suggest columns if enabled
    if (autoSuggestion) {
      // For group by, suggest categorical with few unique values
      if (categorized.categorical.length > 0 && !groupBy) {
        setGroupBy(categorized.categorical[0]);
      }
      
      // For x-axis, suggest datetime or categorical
      if ((categorized.datetime.length > 0 || categorized.categorical.length > 0) && !xAxis) {
        setXAxis(categorized.datetime[0] || categorized.categorical[0]);
      }
      
      // For y-axis, suggest numeric
      if (categorized.numeric.length > 0 && !yAxis) {
        setYAxis(categorized.numeric[0]);
      }
    }
  }, [columns, columnTypes, autoSuggestion]);
  
  const handleAutoSuggest = () => {
    setAutoSuggestion(true);
    
    // For group by, prefer categorical with fewer unique values
    if (suggestedColumns.categorical.length > 0) {
      setGroupBy(suggestedColumns.categorical[0]);
    }
    
    // For x-axis, prefer datetime, then categorical
    if (suggestedColumns.datetime.length > 0) {
      setXAxis(suggestedColumns.datetime[0]);
    } else if (suggestedColumns.categorical.length > 0) {
      setXAxis(suggestedColumns.categorical[0]);
    }
    
    // For y-axis, prefer numeric
    if (suggestedColumns.numeric.length > 0) {
      setYAxis(suggestedColumns.numeric[0]);
    }
    
    // Set appropriate chart type based on selected columns
    if (suggestedColumns.datetime.length > 0 && suggestedColumns.numeric.length > 0) {
      setChartType('line');
    } else if (suggestedColumns.categorical.length > 0 && suggestedColumns.numeric.length > 0) {
      setChartType('bar');
    } else if (suggestedColumns.numeric.length > 1) {
      setChartType('scatter');
    }
  };
  
  const getMenuItems = (type) => {
    const columns = suggestedColumns[type] || [];
    
    if (columns.length === 0) {
      return [<MenuItem key="none" value="" disabled>No {type} columns found</MenuItem>];
    }
    
    return [
      <MenuItem key="none" value="">None</MenuItem>,
      ...columns.map(col => (
        <MenuItem key={col} value={col}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {col}
            <Chip 
              label={type} 
              size="small" 
              sx={{ ml: 1, height: 20, fontSize: '0.6rem' }} 
              color={
                type === 'numeric' ? 'primary' : 
                type === 'datetime' ? 'secondary' : 'default'
              }
              variant="outlined"
            />
          </Box>
        </MenuItem>
      ))
    ];
  };
  
  if (!columns || columns.length === 0) {
    return null;
  }
  
  return (
    <Box>
      <Stack 
        direction="row" 
        spacing={2} 
        sx={{ mb: 2 }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="subtitle1" fontWeight="medium">
          Configure Chart
        </Typography>
        
        <Tooltip title="Auto-suggest best columns and chart type">
          <Button
            variant="outlined"
            size="small"
            startIcon={<AutoGraphIcon />}
            onClick={handleAutoSuggest}
          >
            Auto-suggest
          </Button>
        </Tooltip>
      </Stack>
      
      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        spacing={2} 
        sx={{ mb: 2 }}
        alignItems="flex-start"
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Box sx={{ minWidth: 160 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <FormatListBulletedIcon color="primary" fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="body1" fontWeight={500}>Group Data By</Typography>
          </Box>
          <FormControl fullWidth size="small">
            <InputLabel id="group-by-label">Group By</InputLabel>
            <Select
              labelId="group-by-label"
              value={groupBy}
              label="Group By"
              onChange={e => setGroupBy(e.target.value)}
            >
              {getMenuItems('categorical')}
              {suggestedColumns.datetime.length > 0 && [
                <Divider key="divider" />,
                ...suggestedColumns.datetime.map(col => (
                  <MenuItem key={col} value={col}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {col}
                      <Chip label="datetime" size="small" sx={{ ml: 1, height: 20, fontSize: '0.6rem' }} color="secondary" variant="outlined" />
                    </Box>
                  </MenuItem>
                ))
              ]}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ minWidth: 160 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <ScatterPlotIcon color="primary" fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="body1" fontWeight={500}>Chart Axes</Typography>
          </Box>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
            <FormControl fullWidth size="small">
              <InputLabel id="x-axis-label">X Axis</InputLabel>
              <Select
                labelId="x-axis-label"
                value={xAxis}
                label="X Axis"
                onChange={e => setXAxis(e.target.value)}
              >
                <MenuItem value="">Select...</MenuItem>
                {suggestedColumns.datetime.length > 0 && [
                  <MenuItem key="dt-header" disabled>
                    <Typography variant="caption" color="text.secondary">
                      Datetime Columns
                    </Typography>
                  </MenuItem>,
                  ...suggestedColumns.datetime.map(col => (
                    <MenuItem key={col} value={col}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {col}
                        <Chip label="datetime" size="small" sx={{ ml: 1, height: 20, fontSize: '0.6rem' }} color="secondary" variant="outlined" />
                      </Box>
                    </MenuItem>
                  )),
                  <Divider key="divider-dt" />
                ]}
                
                {suggestedColumns.categorical.length > 0 && [
                  <MenuItem key="cat-header" disabled>
                    <Typography variant="caption" color="text.secondary">
                      Categorical Columns
                    </Typography>
                  </MenuItem>,
                  ...suggestedColumns.categorical.map(col => (
                    <MenuItem key={col} value={col}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {col}
                        <Chip label="categorical" size="small" sx={{ ml: 1, height: 20, fontSize: '0.6rem' }} variant="outlined" />
                      </Box>
                    </MenuItem>
                  )),
                  <Divider key="divider-cat" />
                ]}
                
                {suggestedColumns.numeric.length > 0 && [
                  <MenuItem key="num-header" disabled>
                    <Typography variant="caption" color="text.secondary">
                      Numeric Columns
                    </Typography>
                  </MenuItem>,
                  ...suggestedColumns.numeric.map(col => (
                    <MenuItem key={col} value={col}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {col}
                        <Chip label="numeric" size="small" sx={{ ml: 1, height: 20, fontSize: '0.6rem' }} color="primary" variant="outlined" />
                      </Box>
                    </MenuItem>
                  ))
                ]}
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel id="y-axis-label">Y Axis</InputLabel>
              <Select
                labelId="y-axis-label"
                value={yAxis}
                label="Y Axis"
                onChange={e => setYAxis(e.target.value)}
              >
                <MenuItem value="">Select...</MenuItem>
                {suggestedColumns.numeric.length > 0 && [
                  <MenuItem key="num-header" disabled>
                    <Typography variant="caption" color="text.secondary">
                      Numeric Columns (Recommended)
                    </Typography>
                  </MenuItem>,
                  ...suggestedColumns.numeric.map(col => (
                    <MenuItem key={col} value={col}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {col}
                        <Chip label="numeric" size="small" sx={{ ml: 1, height: 20, fontSize: '0.6rem' }} color="primary" variant="outlined" />
                      </Box>
                    </MenuItem>
                  )),
                  <Divider key="divider-num" />
                ]}
                
                {/* Allow other column types, but not recommended */}
                {[...suggestedColumns.categorical, ...suggestedColumns.datetime].length > 0 && [
                  <MenuItem key="other-header" disabled>
                    <Typography variant="caption" color="text.secondary">
                      Other Columns (Not Recommended)
                    </Typography>
                  </MenuItem>,
                  ...[...suggestedColumns.categorical, ...suggestedColumns.datetime].map(col => (
                    <MenuItem key={col} value={col}>
                      {col}
                    </MenuItem>
                  ))
                ]}
              </Select>
            </FormControl>
          </Stack>
        </Box>
      </Stack>
      
      <Box sx={{ mb: 2 }}>
        <Typography variant="body1" fontWeight={500} sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
          <ShowChartIcon color="primary" fontSize="small" sx={{ mr: 1 }} />
          Chart Type
        </Typography>
        <ToggleButtonGroup
          value={chartType}
          exclusive
          onChange={(e, newValue) => setChartType(newValue)}
          size="small"
          color="primary"
          sx={{ width: '100%' }}
        >
          <ToggleButton value="bar" aria-label="bar chart" sx={{ flex: 1 }}>
            <BarChartIcon fontSize="small" sx={{ mr: 1 }} />
            Bar
          </ToggleButton>
          <ToggleButton value="line" aria-label="line chart" sx={{ flex: 1 }}>
            <ShowChartIcon fontSize="small" sx={{ mr: 1 }} />
            Line
          </ToggleButton>
          <ToggleButton value="scatter" aria-label="scatter plot" sx={{ flex: 1 }}>
            <ScatterPlotIcon fontSize="small" sx={{ mr: 1 }} />
            Scatter
          </ToggleButton>
          <ToggleButton value="pie" aria-label="pie chart" sx={{ flex: 1 }}>
            <PieChartIcon fontSize="small" sx={{ mr: 1 }} />
            Pie
          </ToggleButton>
          <ToggleButton value="time" aria-label="timeline" sx={{ flex: 1 }}>
            <TimelineIcon fontSize="small" sx={{ mr: 1 }} />
            Time
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 1 }}>
        <Button
          variant="outlined"
          startIcon={<ShuffleIcon />}
          onClick={handleAutoSuggest}
        >
          Randomize
        </Button>
        
        <Box>
          <Tooltip title={(!xAxis || !yAxis) ? "Please select X and Y axes first" : "Generate chart with selected options"}>
            <span>
              <Button 
                variant="contained" 
                disableElevation
                startIcon={<ShowChartIcon />}
                onClick={onGenerateChart}
                disabled={!xAxis || !yAxis || !chartType}
                sx={{ height: 40, mr: 1 }}
              >
                Generate Chart
              </Button>
            </span>
          </Tooltip>
          
          <Tooltip title={(!xAxis || !yAxis) ? "Please select X and Y axes first" : "Run regression analysis"}>
            <span>
              <Button 
                variant="outlined" 
                color="secondary"
                startIcon={<TrendingUpIcon />}
                onClick={onRunRegression}
                disabled={!xAxis || !yAxis || !suggestedColumns.numeric.includes(yAxis)}
                sx={{ height: 40 }}
              >
                Regression
              </Button>
            </span>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

export default ChartControls;