import React from 'react';
import { 
  Paper, Typography, Box, Collapse, IconButton, 
  List, ListItem, ListItemText, Divider, Chip, 
  LinearProgress, Tooltip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import BuildIcon from '@mui/icons-material/Build';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { sampleMatchData } from '../utils/sampleData'; // Import sample data

const CleaningLog = ({ log }) => {
  const [expanded, setExpanded] = React.useState(true);
  
  // Use sample data if no log provided
  const effectiveLog = React.useMemo(() => {
    if (log && log.length > 0) {
      return log;
    }
    return sampleMatchData.cleaning_log;
  }, [log]);
  
  if (!effectiveLog || effectiveLog.length === 0) {
    return null;
  }

  const initialStep = effectiveLog.find(step => step.step === 'initial');
  const totalSteps = effectiveLog.length;
  const completedSteps = effectiveLog.length - 1; // Excluding initial
  
  const usingSampleData = log && log.length === 0;
  
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 0, 
        mb: 3, 
        borderRadius: 2, 
        overflow: 'hidden' 
      }}
    >
      <Box 
        sx={{ 
          p: 2, 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          bgcolor: 'background.default'
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <BuildIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6">Data Cleaning Log</Typography>
          
          <Chip 
            icon={<CheckCircleOutlineIcon fontSize="small" />}
            label={`${completedSteps} operations`}
            color="success"
            size="small"
            variant="outlined"
            sx={{ ml: 2 }}
          />
          
          {usingSampleData && (
            <Chip 
              label="Sample Data" 
              size="small" 
              color="secondary" 
              variant="outlined"
              sx={{ ml: 1 }}
            />
          )}
        </Box>
        <IconButton size="small">
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
      
      <Divider />
      
      <LinearProgress 
        variant="determinate" 
        value={(completedSteps / totalSteps) * 100} 
        sx={{ height: 4 }}
      />
      
      <Collapse in={expanded}>
        <Box sx={{ maxHeight: 300, overflow: 'auto', p: 0 }}>
          <List dense disablePadding>
            {effectiveLog.map((step, idx) => (
              <React.Fragment key={idx}>
                <ListItem 
                  sx={{ 
                    pl: 3,
                    bgcolor: idx % 2 ? 'background.default' : 'transparent',
                  }}
                >
                  <ListItemText
                    primary={
                      <Box 
                        sx={{ 
                          textTransform: 'capitalize',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        {step.step === 'initial' ? (
                          <Tooltip title="Initial data state before cleaning">
                            <InfoOutlinedIcon fontSize="small" sx={{ mr: 0.5, color: theme => theme.palette.primary.main }} />
                          </Tooltip>
                        ) : null}
                        <Typography 
                          variant="subtitle2" 
                          color="primary"
                        >
                          {step.step.replace(/_/g, ' ')}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Box 
                        component="div" 
                        sx={{ 
                          my: 0.5,
                          p: 1,
                          borderRadius: 1,
                          backgroundColor: 'background.paper',
                          fontSize: '0.75rem',
                          maxHeight: 100,
                          overflow: 'auto'
                        }}
                      >
                        {/* Show rows and columns info if available */}
                        {step.rows !== undefined && (
                          <Typography variant="caption" component="div" display="block">
                            Rows: {step.rows}
                          </Typography>
                        )}
                        {step.columns !== undefined && (
                          <Typography variant="caption" component="div" display="block">
                            Columns: {step.columns}
                          </Typography>
                        )}
                        {step.missing_values !== undefined && (
                          <Typography variant="caption" component="div" display="block">
                            Missing values: {step.missing_values}
                          </Typography>
                        )}
                        {step.duplicate_rows !== undefined && (
                          <Typography variant="caption" component="div" display="block">
                            Duplicate rows: {step.duplicate_rows}
                          </Typography>
                        )}
                        {step.message && (
                          <Typography variant="caption" component="div" display="block" sx={{ mt: 0.5, fontWeight: 'medium' }}>
                            {step.message}
                          </Typography>
                        )}
                        {/* Show any other properties */}
                        {Object.entries(step).filter(([k]) => !['step', 'rows', 'columns', 'missing_values', 'duplicate_rows', 'message'].includes(k)).length > 0 && (
                          <Box component="pre" sx={{ mt: 1, mb: 0, fontSize: '0.7rem' }}>
                            {JSON.stringify(
                              Object.fromEntries(
                                Object.entries(step).filter(([k]) => !['step', 'rows', 'columns', 'missing_values', 'duplicate_rows', 'message'].includes(k))
                              ), 
                              null, 
                              2
                            )}
                          </Box>
                        )}
                      </Box>
                    }
                  />
                </ListItem>
                {idx < effectiveLog.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Collapse>
    </Paper>
  );
};

export default CleaningLog;