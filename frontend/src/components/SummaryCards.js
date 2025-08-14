import React from 'react';
import { Grid, Card, CardContent, Typography, Button, Stack, Box, Divider, Tooltip, IconButton, Chip } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ImageIcon from '@mui/icons-material/Image';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import NumbersIcon from '@mui/icons-material/Numbers';
import CategoryIcon from '@mui/icons-material/Category';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { alpha } from '@mui/material/styles';
// import removed: use dynamic data from props or API

const SummaryCards = ({ summary, onDownload, onExportChart }) => {
  // If no summary provided, use sample data summary
  const effectiveSummary = React.useMemo(() => {
    if (summary && Object.keys(summary).length > 0) {
      return summary;
    }
    return sampleMatchData.analysis.summary;
  }, [summary]);

  if (!effectiveSummary || Object.keys(effectiveSummary).length === 0) {
    return null;
  }

  // Function to safely render the content of objects
  const renderObject = (obj) => {
    if (obj === null || obj === undefined) return 'N/A';
    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') return String(obj);
    
    // Handle nested objects recursively
    if (typeof obj === 'object') {
      return (
        <pre style={{ margin: 0, fontSize: '0.75rem', overflow: 'auto', maxHeight: '150px' }}>
          {JSON.stringify(obj, null, 2)}
        </pre>
      );
    }
    
    return String(obj);
  };

  const renderSummaryContent = (key, value) => {
    // Render different content based on data type
    if (key === 'numeric' && typeof value === 'object') {
      return (
        <Box sx={{ mt: 1 }}>
          {Object.entries(value).map(([column, stats]) => (
            <Box key={column} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <NumbersIcon fontSize="small" color="primary" sx={{ mr: 0.5 }} />
                <Typography variant="subtitle2" color="primary">{column}</Typography>
              </Box>
              <Divider sx={{ mb: 1 }} />
              <Grid container spacing={1}>
                {Object.entries(stats).map(([stat, val]) => (
                  <Grid item xs={6} key={stat}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption" color="text.secondary">{stat}:</Typography>
                      <Typography variant="body2" fontWeight="medium">
                        {typeof val === 'number' ? Number(val).toFixed(2) : renderObject(val)}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </Box>
      );
    } else if (key === 'datetime' && typeof value === 'object') {
      return (
        <Box>
          {Object.entries(value).map(([column, dateInfo]) => (
            <Box key={column} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <CalendarTodayIcon fontSize="small" color="primary" sx={{ mr: 0.5 }} />
                <Typography variant="subtitle2" color="primary">{column}</Typography>
              </Box>
              <Divider sx={{ mb: 1 }} />
              <Stack spacing={0.5}>
                {Object.entries(dateInfo).map(([key, val]) => (
                  <Box key={key} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" color="text.secondary">{key}:</Typography>
                    <Typography variant="body2">{renderObject(val)}</Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          ))}
        </Box>
      );
    } else if (key === 'categorical' && typeof value === 'object') {
      // Handle categorical data differently
      return (
        <Box>
          {Object.entries(value).map(([category, count]) => (
            <Box key={category} sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2">{category}</Typography>
              <Chip size="small" label={String(count)} variant="outlined" />
            </Box>
          ))}
        </Box>
      );
    } else if (key === 'temporal' && typeof value === 'object') {
      // Handle temporal data
      return (
        <Box>
          {Object.entries(value).map(([subKey, subValue]) => (
            <Box key={subKey} sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="primary">{subKey.replace(/_/g, ' ')}</Typography>
              <Divider sx={{ my: 1 }} />
              {typeof subValue === 'object' && (
                subKey === 'score_progression' ? (
                  // Display score progression as a table
                  <Box sx={{ maxHeight: 150, overflow: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr>
                          <th style={{ textAlign: 'left', padding: '4px' }}>Time</th>
                          <th style={{ textAlign: 'center', padding: '4px' }}>Home</th>
                          <th style={{ textAlign: 'center', padding: '4px' }}>Away</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(subValue) && subValue.map((item, idx) => (
                          <tr key={idx}>
                            <td style={{ padding: '4px' }}>{renderObject(item.time)}</td>
                            <td style={{ textAlign: 'center', padding: '4px' }}>{renderObject(item.home)}</td>
                            <td style={{ textAlign: 'center', padding: '4px' }}>{renderObject(item.away)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Box>
                ) : (
                  // Handle other temporal data structures
                  <Box sx={{ maxHeight: 150, overflow: 'auto' }}>
                    {renderObject(subValue)}
                  </Box>
                )
              )}
            </Box>
          ))}
        </Box>
      );
    } else if (key === 'statistical' && typeof value === 'object') {
      // Handle statistical data
      return (
        <Box>
          {Object.entries(value).map(([statCategory, statValue]) => (
            <Box key={statCategory} sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="primary">{statCategory.replace(/_/g, ' ')}</Typography>
              <Divider sx={{ my: 1 }} />
              {typeof statValue === 'object' ? (
                <Box sx={{ maxHeight: 150, overflow: 'auto' }}>
                  {Object.entries(statValue).map(([teamKey, teamValue]) => (
                    <Box key={teamKey} sx={{ mb: 1 }}>
                      <Typography variant="caption" fontWeight="medium">{teamKey.replace(/_/g, ' ')}:</Typography>
                      {typeof teamValue === 'object' ? (
                        <Box sx={{ pl: 2 }}>
                          {Object.entries(teamValue).map(([subKey, subValue]) => (
                            <Box key={subKey} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography variant="caption">{subKey}:</Typography>
                              <Typography variant="body2">{renderObject(subValue)}</Typography>
                            </Box>
                          ))}
                        </Box>
                      ) : (
                        <Typography variant="body2" sx={{ pl: 2 }}>{renderObject(teamValue)}</Typography>
                      )}
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography variant="body2">{renderObject(statValue)}</Typography>
              )}
            </Box>
          ))}
        </Box>
      );
    } else if (key === 'performance' && typeof value === 'object') {
      // Handle performance data
      return (
        <Box>
          {Object.entries(value).map(([perfCategory, perfValue]) => (
            <Box key={perfCategory} sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="primary">{perfCategory.replace(/_/g, ' ')}</Typography>
              <Divider sx={{ my: 1 }} />
              {perfCategory === 'player_ratings' ? (
                // Show player ratings as a simple table
                <Box sx={{ maxHeight: 150, overflow: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        <th style={{ textAlign: 'left', padding: '4px' }}>Player</th>
                        <th style={{ textAlign: 'right', padding: '4px' }}>Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(perfValue).map(([player, rating]) => (
                        <tr key={player}>
                          <td style={{ padding: '4px' }}>{player}</td>
                          <td style={{ textAlign: 'right', padding: '4px' }}>{renderObject(rating)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Box>
              ) : (
                <Box sx={{ maxHeight: 150, overflow: 'auto' }}>
                  {renderObject(perfValue)}
                </Box>
              )}
            </Box>
          ))}
        </Box>
      );
    } else if (key === 'dataset_info') {
      return (
        <Box>
          <Stack spacing={0.5}>
            {Object.entries(value).map(([infoKey, infoVal]) => {
              if (infoKey === 'column_types') return null; // Skip column_types for brevity
              return (
                <Box key={infoKey} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" color="text.secondary">
                    {infoKey.replace(/_/g, ' ')}:
                  </Typography>
                  <Typography variant="body2">
                    {renderObject(infoVal)}
                  </Typography>
                </Box>
              );
            })}
          </Stack>
        </Box>
      );
    } else if (key === 'outliers' && typeof value === 'object') {
      return (
        <Box>
          {Object.keys(value).length === 0 ? (
            <Typography variant="body2" color="text.secondary">No outliers detected</Typography>
          ) : (
            Object.entries(value).map(([column, outlierInfo]) => (
              <Box key={column} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  <WarningAmberIcon fontSize="small" color="warning" sx={{ mr: 0.5 }} />
                  <Typography variant="subtitle2" color="warning.main">{column}</Typography>
                </Box>
                <Stack spacing={0.5}>
                  {Object.entries(outlierInfo).map(([key, val]) => (
                    <Box key={key} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" color="text.secondary">{key}:</Typography>
                      <Typography variant="body2">
                        {Array.isArray(val) ? `${val[0]} to ${val[1]}` : renderObject(val)}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            ))
          )}
        </Box>
      );
    } else if (typeof value === 'object' && value !== null) {
      // Check if it's a categorical column summary
      if (value.categories || value.top_categories) {
        const categories = value.categories || value.top_categories;
        return (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <CategoryIcon fontSize="small" color="primary" sx={{ mr: 0.5 }} />
              <Typography variant="subtitle2" color="primary">
                {value.unique_values ? `${value.unique_values} unique values` : ''}
              </Typography>
            </Box>
            {value.note && (
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                {value.note}
              </Typography>
            )}
            <Box sx={{ 
              maxHeight: 150, 
              overflow: 'auto',
              backgroundColor: theme => alpha(theme.palette.background.default, 0.5),
              borderRadius: 1,
              p: 1
            }}>
              {Object.entries(categories).map(([cat, count], idx) => (
                <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="caption" sx={{ maxWidth: '70%', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {cat || '(empty)'}
                  </Typography>
                  <Chip 
                    label={String(count)} 
                    size="small" 
                    variant="outlined" 
                    sx={{ height: 20, '& .MuiChip-label': { px: 1, py: 0 } }} 
                  />
                </Box>
              ))}
            </Box>
          </Box>
        );
      }
      
      // Generic object rendering as JSON
      return (
        <Typography 
          variant="body2" 
          component="div"
          sx={{ 
            whiteSpace: 'pre-wrap', 
            wordBreak: 'break-word',
            backgroundColor: theme => alpha(theme.palette.background.default, 0.5),
            p: 1,
            borderRadius: 1,
            fontSize: '0.75rem',
            maxHeight: 150,
            overflow: 'auto'
          }}
        >
          {renderObject(value)}
        </Typography>
      );
    } else {
      // Fallback for simple values
      return (
        <Typography variant="body1">
          {renderObject(value)}
        </Typography>
      );
    }
  };

  // Check if we're using sample data
  // Use dynamic data: summary should be provided by props or fetched from API
  const isDataAvailable = summary && Object.keys(summary).length > 0;

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
        <AnalyticsIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
        Data Summary
  {!isDataAvailable && (
          <Chip 
            label="Sample Data" 
            size="small" 
            color="secondary" 
            variant="outlined"
            sx={{ ml: 2 }}
          />
        )}
      </Typography>
      
      <Grid container spacing={2}>
        {Object.entries(effectiveSummary).map(([key, value]) => {
          // Special handling for dataset_info - always show first
          const priority = key === 'dataset_info' ? 0 : 1;
          
          return (
            <Grid item xs={12} sm={6} md={4} lg={key === 'dataset_info' ? 12 : 4} key={key} order={priority}>
              <Card elevation={3} sx={{ 
                height: '100%', 
                borderRadius: 2,
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6
                }
              }}>
                <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="subtitle1" gutterBottom fontWeight="bold" color="primary">
                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}
                  </Typography>
                  
                  <Divider sx={{ mb: 2 }} />
                  
                  <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
                    {renderSummaryContent(key, value)}
                  </Box>
                  
                  <Stack 
                    direction="row" 
                    spacing={1} 
                    sx={{ mt: 2, justifyContent: 'flex-end' }}
                  >
                    {onDownload && (
                      <Tooltip title="Download data as CSV">
                        <IconButton 
                          size="small" 
                          color="primary"
                          onClick={() => onDownload(key)}
                        >
                          <DownloadIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                    {onExportChart && key !== 'dataset_info' && (
                      <Tooltip title="Export visualization as image">
                        <IconButton 
                          size="small"
                          color="primary" 
                          onClick={() => onExportChart(key)}
                        >
                          <ImageIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default SummaryCards;