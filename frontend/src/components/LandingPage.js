import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, Container, Typography, Button, Grid, Card, CardContent, 
  Divider, Avatar, Chip, Paper, useTheme, alpha, CardMedia,
  Stack, IconButton, Fade, Grow, Zoom
} from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SchoolIcon from '@mui/icons-material/School';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import GitHubIcon from '@mui/icons-material/GitHub';
import BarChartIcon from '@mui/icons-material/BarChart';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import ShowChartIcon from '@mui/icons-material/ShowChart';

const LandingPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [animatedElements, setAnimatedElements] = useState({
    hero: false,
    infoCards: false,
    highlights: false
  });

  // Animation sequence with delays
  useEffect(() => {
    const timer1 = setTimeout(() => setAnimatedElements(prev => ({ ...prev, hero: true })), 100);
    const timer2 = setTimeout(() => setAnimatedElements(prev => ({ ...prev, infoCards: true })), 600);
    const timer3 = setTimeout(() => setAnimatedElements(prev => ({ ...prev, highlights: true })), 1200);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleStartAnalyzing = () => {
    navigate('/analysis');
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Hero Section */}
      <Fade in={animatedElements.hero} timeout={1000}>
        <Box sx={{ 
          bgcolor: theme.palette.mode === 'dark' 
            ? 'background.paper' 
            : 'primary.main',
          color: '#fff',
          pt: 10, 
          pb: 8,
          position: 'relative',
          backgroundImage: `url(https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: theme.palette.mode === 'dark' 
              ? 'rgba(0, 0, 0, 0.85)' 
              : 'rgba(25, 118, 210, 0.85)',
            backgroundImage: theme.palette.mode === 'dark' 
              ? 'linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.75) 100%)' 
              : 'linear-gradient(180deg, rgba(25,118,210,0.9) 0%, rgba(25,118,210,0.75) 100%)',
          }
        }}>
          <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <SportsSoccerIcon sx={{ 
                fontSize: 70, 
                mb: 3, 
                animation: 'spin 10s linear infinite', 
                '@keyframes spin': { 
                  '0%': { transform: 'rotate(0deg)' }, 
                  '100%': { transform: 'rotate(360deg)' } 
                },
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
              }} />
              
              <Typography variant="overline" sx={{ 
                letterSpacing: 3, 
                fontWeight: 600,
                fontSize: '1rem',
                display: 'block',
                mb: 1
              }}>
                CENTRE COLLEGE RESEARCH PROJECT
              </Typography>
              
              <Typography 
                component="h1" 
                variant="h1" 
                sx={{ 
                  fontWeight: 800, 
                  mb: 3,
                  background: 'linear-gradient(45deg, #ffffff 30%, #e0e0e0 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 2px 30px rgba(0,0,0,0.15)',
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' }
                }}
              >
                Sports Analytics Research
              </Typography>
              
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 5, 
                  fontWeight: 300, 
                  opacity: 0.9,
                  maxWidth: '800px',
                  mx: 'auto',
                  lineHeight: 1.5
                }}
              >
                Advanced Statistical Analysis of Soccer Match Data
              </Typography>
              
              <Button 
                variant="contained" 
                size="large"
                color="secondary"
                onClick={handleStartAnalyzing}
                endIcon={<ArrowForwardIcon />}
                sx={{ 
                  py: 1.8, 
                  px: 5, 
                  fontWeight: 600, 
                  borderRadius: 3,
                  boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                  fontSize: '1.1rem',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.4)'
                  }
                }}
              >
                Start Analyzing
              </Button>
            </Box>
            
            <Box sx={{ 
              textAlign: 'center', 
              mt: 8, 
              animation: 'bounce 2s infinite ease', 
              '@keyframes bounce': { 
                '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' }, 
                '40%': { transform: 'translateY(-20px)' }, 
                '60%': { transform: 'translateY(-10px)' } 
              }
            }}>
              <KeyboardArrowDownIcon sx={{ fontSize: 48, opacity: 0.8 }} />
            </Box>
          </Container>
        </Box>
      </Fade>

      {/* Research Info Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grow in={animatedElements.infoCards} timeout={1000}>
          <div>
            <Typography 
              variant="h4" 
              component="h2" 
              align="center" 
              gutterBottom 
              sx={{ 
                fontWeight: 700, 
                mb: 6,
                position: 'relative',
                '&:after': {
                  content: '""',
                  display: 'block',
                  width: '80px',
                  height: '4px',
                  backgroundColor: 'primary.main',
                  position: 'absolute',
                  bottom: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)'
                }
              }}
            >
              Research Team
            </Typography>
            
            <Grid container spacing={4}>
              {/* Researcher Info */}
              <Grid item xs={12} md={4}>
                <Card 
                  elevation={4} 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 8
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="220"
                    image="/images/robert.jpg" // Replace with actual image path
                    alt="Robert"
                    sx={{ 
                      objectFit: 'cover',
                      objectPosition: 'center',
                      transition: 'transform 0.5s ease',
                      '&:hover': {
                        transform: 'scale(1.05)'
                      }
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Avatar 
                        sx={{ 
                          width: 80, 
                          height: 80,
                          backgroundColor: 'primary.main',
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: '1.8rem',
                          boxShadow: 2
                        }}
                      >
                        RN
                      </Avatar>
                      <Box sx={{ ml: 2 }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                          Nguyen Hung Anh
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          (Robert Nguyen)
                        </Typography>
                      </Box>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Stack spacing={2}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <SchoolIcon color="primary" sx={{ mr: 1.5, fontSize: '1.3rem' }} />
                        <Typography variant="body1">
                          Centre College Student Researcher
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CalendarTodayIcon color="primary" sx={{ mr: 1.5, fontSize: '1.3rem' }} />
                        <Typography variant="body1">
                          January 2024 - May 2024
                        </Typography>
                      </Box>
                    </Stack>
                    <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      <Chip 
                        label="Sports Data Science" 
                        color="primary" 
                        variant="outlined"
                        size="medium"
                      />
                      <Chip 
                        label="Statistical Analysis" 
                        color="primary" 
                        variant="outlined"
                        size="medium"
                      />
                      <Chip 
                        label="Soccer Analytics" 
                        color="primary"
                        variant="outlined"
                        size="medium"
                        sx={{ mt: 1 }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Professor Info */}
              <Grid item xs={12} md={4}>
                <Card 
                  elevation={4} 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 8
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="220"
                    image="/images/heath.png" // Replace with actual image path
                    alt="Heath"
                    sx={{ 
                      objectFit: 'cover',
                      objectPosition: 'center',
                      transition: 'transform 0.5s ease',
                      '&:hover': {
                        transform: 'scale(1.05)'
                      }
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Avatar 
                        sx={{ 
                          width: 80, 
                          height: 80,
                          backgroundColor: 'secondary.main',
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: '1.8rem',
                          boxShadow: 2
                        }}
                      >
                        JH
                      </Avatar>
                      <Box sx={{ ml: 2 }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                          Dr. Jeffrey Heath
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          Research Advisor
                        </Typography>
                      </Box>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Stack spacing={2}>
                      <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                        Margaret V. Haggin Professor of Mathematics and Data Science
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                        Chair of the Data Science Program
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                        NCAA Faculty Athletics Representative
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              {/* Research Overview */}
              <Grid item xs={12} md={4}>
                <Card 
                  elevation={4} 
                  sx={{ 
                    height: '100%',
                    borderRadius: 3,
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 8
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="220"
                    image="https://images.unsplash.com/photo-1560272564-c83b66b1ad12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80"
                    alt="Soccer Analytics"
                    sx={{ 
                      objectFit: 'cover',
                      objectPosition: 'center',
                      transition: 'transform 0.5s ease',
                      '&:hover': {
                        transform: 'scale(1.05)'
                      }
                    }}
                  />
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h5" gutterBottom fontWeight="bold">
                      Research Overview
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
                      This project analyzes soccer match data using advanced data analysis techniques in Python.
                    </Typography>
                    <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
                      The research includes comprehensive statistical analysis of match events, player performance metrics, and visualization of key patterns within the game.
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                      Our analysis provides insights into game dynamics, player contributions, and strategic elements that influenced the match outcome.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
        </Grow>
      </Container>

      {/* Research Highlights Section */}
      <Fade in={animatedElements.highlights} timeout={1500}>
        <Box sx={{ 
          bgcolor: theme.palette.mode === 'dark' 
            ? alpha(theme.palette.primary.main, 0.05) 
            : alpha(theme.palette.primary.light, 0.1),
          py: 10,
          borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`
        }}>
          <Container maxWidth="lg">
            <Typography 
              variant="h4" 
              component="h2" 
              gutterBottom 
              align="center" 
              sx={{ 
                fontWeight: 700, 
                mb: 6,
                position: 'relative',
                '&:after': {
                  content: '""',
                  display: 'block',
                  width: '80px',
                  height: '4px',
                  backgroundColor: 'secondary.main',
                  position: 'absolute',
                  bottom: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)'
                }
              }}
            >
              Research Highlights
            </Typography>
            
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={3}>
                <Zoom in={animatedElements.highlights} style={{ transitionDelay: '200ms' }}>
                  <Paper 
                    elevation={3} 
                    sx={{ 
                      p: 4, 
                      height: '100%',
                      borderRadius: 3,
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: 8
                      }
                    }}
                  >
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      mb: 3
                    }}>
                      <Avatar sx={{ 
                        bgcolor: alpha(theme.palette.primary.main, 0.1), 
                        color: 'primary.main',
                        p: 2,
                        width: 70,
                        height: 70
                      }}>
                        <AssessmentIcon sx={{ fontSize: '2rem' }} />
                      </Avatar>
                    </Box>
                    <Typography 
                      variant="h6" 
                      gutterBottom 
                      sx={{ 
                        fontWeight: 'bold', 
                        color: 'primary.main',
                        textAlign: 'center',
                        mb: 2
                      }}
                    >
                      Data Collection
                    </Typography>
                    <Typography variant="body1" align="center" sx={{ lineHeight: 1.7 }}>
                      Comprehensive game play-by-play data collected from the Centre College vs. Emory University soccer match.
                    </Typography>
                  </Paper>
                </Zoom>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Zoom in={animatedElements.highlights} style={{ transitionDelay: '400ms' }}>
                  <Paper 
                    elevation={3} 
                    sx={{ 
                      p: 4, 
                      height: '100%',
                      borderRadius: 3,
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: 8
                      }
                    }}
                  >
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      mb: 3
                    }}>
                      <Avatar sx={{ 
                        bgcolor: alpha(theme.palette.primary.main, 0.1), 
                        color: 'primary.main',
                        p: 2,
                        width: 70,
                        height: 70
                      }}>
                        <BarChartIcon sx={{ fontSize: '2rem' }} />
                      </Avatar>
                    </Box>
                    <Typography 
                      variant="h6" 
                      gutterBottom 
                      sx={{ 
                        fontWeight: 'bold', 
                        color: 'primary.main',
                        textAlign: 'center',
                        mb: 2
                      }}
                    >
                      Statistical Analysis
                    </Typography>
                    <Typography variant="body1" align="center" sx={{ lineHeight: 1.7 }}>
                      Advanced parsing of match events including shots, goals, corner kicks, substitutions, and other key metrics.
                    </Typography>
                  </Paper>
                </Zoom>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Zoom in={animatedElements.highlights} style={{ transitionDelay: '600ms' }}>
                  <Paper 
                    elevation={3} 
                    sx={{ 
                      p: 4, 
                      height: '100%',
                      borderRadius: 3,
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: 8
                      }
                    }}
                  >
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      mb: 3
                    }}>
                      <Avatar sx={{ 
                        bgcolor: alpha(theme.palette.primary.main, 0.1), 
                        color: 'primary.main',
                        p: 2,
                        width: 70,
                        height: 70
                      }}>
                        <DataUsageIcon sx={{ fontSize: '2rem' }} />
                      </Avatar>
                    </Box>
                    <Typography 
                      variant="h6" 
                      gutterBottom 
                      sx={{ 
                        fontWeight: 'bold', 
                        color: 'primary.main',
                        textAlign: 'center',
                        mb: 2
                      }}
                    >
                      Player Metrics
                    </Typography>
                    <Typography variant="body1" align="center" sx={{ lineHeight: 1.7 }}>
                      Individual player performance metrics including shots on goal, goals scored, assists, and substitution patterns.
                    </Typography>
                  </Paper>
                </Zoom>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Zoom in={animatedElements.highlights} style={{ transitionDelay: '800ms' }}>
                  <Paper 
                    elevation={3} 
                    sx={{ 
                      p: 4, 
                      height: '100%',
                      borderRadius: 3,
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: 8
                      }
                    }}
                  >
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      mb: 3
                    }}>
                      <Avatar sx={{ 
                        bgcolor: alpha(theme.palette.primary.main, 0.1), 
                        color: 'primary.main',
                        p: 2,
                        width: 70,
                        height: 70
                      }}>
                        <ShowChartIcon sx={{ fontSize: '2rem' }} />
                      </Avatar>
                    </Box>
                    <Typography 
                      variant="h6" 
                      gutterBottom 
                      sx={{ 
                        fontWeight: 'bold', 
                        color: 'primary.main',
                        textAlign: 'center',
                        mb: 2
                      }}
                    >
                      Data Visualization
                    </Typography>
                    <Typography variant="body1" align="center" sx={{ lineHeight: 1.7 }}>
                      Interactive charts and visualizations that reveal patterns and insights from the match data.
                    </Typography>
                  </Paper>
                </Zoom>
              </Grid>
            </Grid>
            
            <Box sx={{ textAlign: 'center', mt: 8 }}>
              <Button 
                variant="contained" 
                size="large" 
                color="primary"
                onClick={handleStartAnalyzing}
                endIcon={<ArrowForwardIcon />}
                sx={{ 
                  py: 1.5, 
                  px: 5, 
                  fontWeight: 600,
                  borderRadius: 2,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                  }
                }}
              >
                Explore The Analysis
              </Button>
            </Box>
          </Container>
        </Box>
      </Fade>

      {/* Footer */}
      <Box 
        sx={{ 
          bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : '#f7f9fc',
          py: 6,
          borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`
        }} 
        component="footer"
      >
        <Container maxWidth="md">
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center',
            mb: 3
          }}>
            <SportsSoccerIcon 
              color="primary" 
              sx={{ 
                fontSize: 36, 
                mr: 2,
                animation: 'bounce 3s infinite ease'
              }} 
            />
            <Typography variant="h6" fontWeight="bold" color="primary">
              Centre College Sports Analytics
            </Typography>
          </Box>
          
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 1 }}>
            © {new Date().getFullYear()} Centre College Sports Analytics Research
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            Created by Nguyen Hung Anh (Robert Nguyen) under the guidance of Dr. Jeffrey Heath
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            mt: 3
          }}>
            <IconButton 
              color="primary"
              aria-label="GitHub"
              size="medium"
              sx={{ 
                '&:hover': {
                  transform: 'scale(1.1)'
                }
              }}
            >
              <GitHubIcon />
            </IconButton>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;