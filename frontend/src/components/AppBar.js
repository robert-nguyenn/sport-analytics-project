import React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Tooltip } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const AppBar = ({ mode, setMode, showBackButton = false, onBackClick }) => (
  <MuiAppBar 
    position="sticky" 
    elevation={4}
    sx={{
      background: mode === 'dark' 
        ? 'linear-gradient(90deg, #1a1a2e 0%, #16213e 100%)' 
        : 'linear-gradient(90deg, #4b6cb7 0%, #182848 100%)'
    }}
  >
    <Toolbar>
      {showBackButton && (
        <Tooltip title="Back to Home">
          <IconButton 
            color="inherit" 
            edge="start" 
            onClick={onBackClick}
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
      )}
      <AssessmentIcon sx={{ mr: 1.5 }} />
      <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
        CSV Analysis Dashboard
      </Typography>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <Tooltip title="Project Repository">
          <IconButton color="inherit" href="https://github.com/" target="_blank">
            <GitHubIcon />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Help">
          <IconButton color="inherit">
            <HelpOutlineIcon />
          </IconButton>
        </Tooltip>
        
        <Tooltip title={mode === 'light' ? 'Dark Mode' : 'Light Mode'}>
          <IconButton 
            color="inherit" 
            onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
            sx={{ ml: 1 }}
          >
            {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Tooltip>
      </Box>
    </Toolbar>
  </MuiAppBar>
);

export default AppBar;