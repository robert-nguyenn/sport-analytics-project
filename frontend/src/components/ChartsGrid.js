import React, { useState } from 'react';
import { 
  Grid, Card, CardContent, IconButton, Tooltip, Typography, 
  Box, CardActions, Divider, Button, Chip, Menu, MenuItem, Paper
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Plot from 'react-plotly.js';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import BarChartIcon from '@mui/icons-material/BarChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import PieChartIcon from '@mui/icons-material/PieChart';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import TableChartIcon from '@mui/icons-material/TableChart';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import { sampleMatchData } from '../utils/sampleData'; // Import sample data

const getChartTypeIcon = (chartData) => {
  if (!chartData?.data || !chartData.data[0]) return <BarChartIcon />;
  
  const chartType = chartData.data[0]?.type;
  switch (chartType) {
    case 'scatter':
      return chartData.data[0]?.mode === 'lines' || chartData.data[0]?.mode === 'lines+markers' 
        ? <TimelineIcon /> 
        : <BubbleChartIcon />;
    case 'pie':
      return <PieChartIcon />;
    case 'heatmap':
      return <TableChartIcon />;
    case 'sunburst':
      return <DonutLargeIcon />;
    case 'indicator':
      return <DonutLargeIcon />;
    case 'scatterpolar':
      return <DonutLargeIcon />;
    case 'bar':
      return <BarChartIcon />;
    default:
      return <BarChartIcon />;
  }
};

const ChartCard = ({ chartKey, chartData, onExportChart }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(100);
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    handleMenuClose();
  };
  
  const handleDownload = () => {
    onExportChart(chartKey);
    handleMenuClose();
  };
  
  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 20, 200));
  };
  
  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 20, 60));
  };
  
  // Determine chart type for display
  const ChartTypeIcon = getChartTypeIcon(chartData);
  const chartType = chartData?.data?.[0]?.type || 'chart';
  
  return (
    <Card 
      elevation={3} 
      sx={{ 
        height: isFullscreen ? '90vh' : '100%', 
        width: isFullscreen ? '90vw' : '100%',
        position: isFullscreen ? 'fixed' : 'relative',
        top: isFullscreen ? '5vh' : 'auto',
        left: isFullscreen ? '5vw' : 'auto',
        zIndex: isFullscreen ? 1300 : 1,
        borderRadius: 2,
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        p: 2,
        pb: 1
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {React.cloneElement(ChartTypeIcon, { color: "primary", sx: { mr: 1 } })}
          <Typography variant="h6" noWrap sx={{ maxWidth: 200 }}>
            {chartData?.layout?.title?.text || chartData?.layout?.title || chartKey.replace(/_/g, ' ')}
          </Typography>
          
          <Chip 
            label={chartType} 
            size="small" 
            color="primary"
            variant="outlined" 
            sx={{ ml: 1 }}
          />
        </Box>
        
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {!isFullscreen && (
            <>
              <Tooltip title="Zoom in">
                <IconButton onClick={handleZoomIn} size="small">
                  <ZoomInIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Zoom out">
                <IconButton onClick={handleZoomOut} size="small">
                  <ZoomOutIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </>
          )}
          
          <Tooltip title="More options">
            <IconButton onClick={handleMenuOpen} size="small">
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={toggleFullscreen}>
            <FullscreenIcon fontSize="small" sx={{ mr: 1 }} />
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </MenuItem>
          <MenuItem onClick={handleDownload}>
            <DownloadIcon fontSize="small" sx={{ mr: 1 }} />
            Download Image
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <ContentCopyIcon fontSize="small" sx={{ mr: 1 }} />
            Copy Data
          </MenuItem>
        </Menu>
      </Box>
      
      <Divider />
      
      <CardContent sx={{ 
        p: 1, 
        flexGrow: 1, 
        height: isFullscreen ? 'calc(90vh - 120px)' : 400,
        transform: `scale(${zoom/100})`,
        transformOrigin: 'top center'
      }}>
        {chartData && chartData.data ? (
          <Box sx={{ height: '100%', width: '100%', position: 'relative' }}>
            <Plot
              data={chartData.data}
              layout={{
                ...chartData.layout,
                autosize: true,
                margin: { l: 50, r: 20, t: 30, b: 50, ...(chartData.layout?.margin || {}) },
                height: null,
                font: {
                  family: '"Roboto", "Helvetica", "Arial", sans-serif'
                }
              }}
              config={{
                responsive: true,
                displayModeBar: true,
                displaylogo: false,
                modeBarButtonsToRemove: ['sendDataToCloud', 'lasso2d', 'select2d']
              }}
              style={{ width: '100%', height: '100%' }}
              useResizeHandler={true}
              data-testid={`plotly-chart-${chartKey}`}
            />
          </Box>
        ) : (
          <Box sx={{ 
            display: 'flex', 
            height: '100%', 
            alignItems: 'center', 
            justifyContent: 'center'
          }}>
            <Typography variant="body2" color="text.secondary">
              Invalid chart data
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

// Add this helper function to safely convert objects to strings in ChartsGrid.js
const safeStringify = (value) => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
};

const ChartsGrid = ({ visualizations, onExportChart }) => {
  // Use sample visualizations if no real visualizations available
  const effectiveVisualizations = React.useMemo(() => {
    if (visualizations && Object.keys(visualizations).length > 0) {
      return visualizations;
    }
    return sampleMatchData.visualizations;
  }, [visualizations]);

  const [filterOption, setFilterOption] = useState('all');
  
  // Filter charts based on selected option
  const filteredCharts = React.useMemo(() => {
    if (filterOption === 'all') {
      return effectiveVisualizations;
    }
    
    return Object.fromEntries(
      Object.entries(effectiveVisualizations).filter(([_, chart]) => {
        const chartType = chart?.data?.[0]?.type;
        if (filterOption === 'bar' && chartType === 'bar') return true;
        if (filterOption === 'line' && (chartType === 'scatter' && (chart?.data?.[0]?.mode === 'lines' || chart?.data?.[0]?.mode === 'lines+markers'))) return true;
        if (filterOption === 'pie' && chartType === 'pie') return true;
        if (filterOption === 'scatter' && chartType === 'scatter' && chart?.data?.[0]?.mode === 'markers') return true;
        if (filterOption === 'other' && !['bar', 'scatter', 'pie'].includes(chartType)) return true;
        return false;
      })
    );
  }, [effectiveVisualizations, filterOption]);

  if (!effectiveVisualizations || Object.keys(effectiveVisualizations).length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">No visualizations available</Typography>
      </Box>
    );
  }

  // Show sample data notice if using fallback data
  const isSampleData = !visualizations || Object.keys(visualizations).length === 0;

  return (
    <>
      {isSampleData && (
        <Paper sx={{ 
          backgroundColor: 'info.light', 
          color: 'info.contrastText',
          px: 2,
          py: 1,
          borderRadius: 1,
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Typography variant="body2">
            <strong>Note:</strong> Showing sample visualizations for demonstration purposes.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              size="small" 
              variant={filterOption === 'all' ? "contained" : "outlined"} 
              color="inherit" 
              onClick={() => setFilterOption('all')}
            >
              All
            </Button>
            <Button 
              size="small" 
              variant={filterOption === 'bar' ? "contained" : "outlined"} 
              color="inherit"
              onClick={() => setFilterOption('bar')}
              startIcon={<BarChartIcon />}
            >
              Bar
            </Button>
            <Button 
              size="small" 
              variant={filterOption === 'line' ? "contained" : "outlined"} 
              color="inherit"
              onClick={() => setFilterOption('line')}
              startIcon={<TimelineIcon />}
            >
              Line
            </Button>
            <Button 
              size="small" 
              variant={filterOption === 'pie' ? "contained" : "outlined"} 
              color="inherit"
              onClick={() => setFilterOption('pie')}
              startIcon={<PieChartIcon />}
            >
              Pie
            </Button>
            <Button 
              size="small" 
              variant={filterOption === 'scatter' ? "contained" : "outlined"} 
              color="inherit"
              onClick={() => setFilterOption('scatter')}
              startIcon={<BubbleChartIcon />}
            >
              Scatter
            </Button>
            <Button 
              size="small" 
              variant={filterOption === 'other' ? "contained" : "outlined"} 
              color="inherit"
              onClick={() => setFilterOption('other')}
            >
              Other
            </Button>
          </Box>
        </Paper>
      )}
    
      <Grid container spacing={3}>
        {Object.entries(filteredCharts || {}).map(([key, viz]) => (
          <Grid item xs={12} md={6} key={key}>
            <ChartCard 
              chartKey={key} 
              chartData={viz} 
              onExportChart={onExportChart} 
            />
          </Grid>
        ))}
        
        {Object.keys(filteredCharts).length === 0 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                No charts found matching the selected filter.
              </Typography>
              <Button 
                variant="outlined" 
                color="primary" 
                onClick={() => setFilterOption('all')} 
                sx={{ mt: 2 }}
              >
                Show All Charts
              </Button>
            </Paper>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default ChartsGrid;