import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  TextField,
  InputAdornment,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  School,
  MenuBook,
  VideoLibrary,
  Assignment,
  Search,
  ArrowForward,
  CheckCircle,
  Lightbulb,
  TrendingUp,
  AccountBalance,
  Security,
  Psychology,
} from '@mui/icons-material';
import styled from 'styled-components';
import { colors } from '../styles/theme';

const HeroWrapper = styled(Box)`
  background: linear-gradient(135deg, ${colors.deepBlue} 0%, #071D3B 100%);
  color: ${colors.white};
  padding: 7rem 0 6rem;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('/images/crypto-pattern.png');
    background-size: cover;
    opacity: 0.1;
    z-index: 0;
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 100px;
    background: linear-gradient(to top, #fff 0%, rgba(255,255,255,0) 100%);
    z-index: 1;
  }
`;

const HeroIllustration = styled('img')`
  max-width: 100%;
  height: auto;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2));
  animation: float 6s ease-in-out infinite;
  
  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0px);
    }
  }
`;

const HeroContent = styled(Box)`
  position: relative;
  z-index: 1;
`;

const SectionWrapper = styled(Box)<{ bgcolor?: string }>`
  padding: 6rem 0;
  background-color: ${props => props.bgcolor || 'transparent'};
  position: relative;
  
  &.with-wave-top:before {
    content: '';
    position: absolute;
    top: -70px;
    left: 0;
    width: 100%;
    height: 70px;
    background-image: url('/images/wave-divider.svg');
    background-size: cover;
    z-index: 2;
  }
  
  &.with-wave-bottom:after {
    content: '';
    position: absolute;
    bottom: -70px;
    left: 0;
    width: 100%;
    height: 70px;
    background-image: url('/images/wave-divider-bottom.svg');
    background-size: cover;
    z-index: 2;
  }
`;

const StyledTabs = styled(Tabs)`
  margin-bottom: 3rem;
  
  .MuiTabs-indicator {
    background-color: ${colors.vibrantYellow};
    height: 4px;
    border-radius: 2px;
  }
  
  .MuiTab-root {
    text-transform: none;
    font-weight: 700;
    font-size: 1.1rem;
    min-width: 140px;
    transition: all 0.3s ease;
    padding: 12px 24px;
    
    &.Mui-selected {
      color: ${colors.deepBlue};
    }
    
    &:hover {
      color: ${colors.vibrantYellow};
      background-color: rgba(240, 193, 75, 0.05);
    }
  }
`;

const SectionTitle = styled(Typography)`
  font-family: 'Bebas Neue', sans-serif;
  position: relative;
  margin-bottom: 1.5rem;
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -8px;
    width: 40px;
    height: 3px;
    background-color: ${colors.vibrantYellow};
  }
`;

const CenteredSectionTitle = styled(SectionTitle)`
  text-align: center;
  
  &:after {
    left: 50%;
    transform: translateX(-50%);
  }
`;

const CourseCard = styled(Card)`
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
    border-color: rgba(240, 193, 75, 0.3);
  }
`;

const ResourceCard = styled(Card)`
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  }
`;

const IconBox = styled(Box)`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, ${colors.deepBlue} 0%, #1E4B8D 100%);
  color: ${colors.white};
`;

const LevelChip = styled(Chip)<{ level: 'beginner' | 'intermediate' | 'advanced' }>`
  background-color: ${props => {
    switch (props.level) {
      case 'beginner':
        return 'rgba(0, 166, 81, 0.1)';
      case 'intermediate':
        return 'rgba(240, 193, 75, 0.1)';
      case 'advanced':
        return 'rgba(211, 47, 47, 0.1)';
      default:
        return 'rgba(0, 166, 81, 0.1)';
    }
  }};
  color: ${props => {
    switch (props.level) {
      case 'beginner':
        return colors.green;
      case 'intermediate':
        return colors.vibrantYellow;
      case 'advanced':
        return colors.red;
      default:
        return colors.green;
    }
  }};
  font-weight: 600;
`;

const StyledListItem = styled(ListItem)`
  padding: 1rem;
  transition: background-color 0.3s ease;
  border-radius: 8px;
  
  &:hover {
    background-color: rgba(10, 45, 90, 0.05);
  }
`;

const CategoryChip = styled(Chip)`
  background-color: rgba(10, 45, 90, 0.08);
  color: ${colors.deepBlue};
  font-weight: 600;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 8px 2px;
  border-radius: 20px;
  border: 1px solid rgba(10, 45, 90, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(240, 193, 75, 0.15);
    color: ${colors.deepBlue};
    border-color: rgba(240, 193, 75, 0.3);
    transform: translateY(-2px);
  }
  
  .MuiChip-label {
    padding: 0 14px;
  }
`;

const GlossaryWrapper = styled(Box)`
  max-height: 500px;
  overflow-y: auto;
  padding-right: 1rem;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${colors.deepBlue};
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #1E4B8D;
  }
`;

const Education: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  // Mock data for educational content
  const courses = [
    {
      id: 1,
      title: 'Cryptocurrency Basics',
      description: 'Learn the fundamentals of cryptocurrency, blockchain technology, and digital assets.',
      image: '/images/course-crypto-basics.jpg',
      level: 'beginner',
      duration: '2 hours',
      modules: 5,
    },
    {
      id: 2,
      title: 'Understanding Meme Coins',
      description: 'Explore the phenomenon of meme coins, their market dynamics, and investment considerations.',
      image: '/images/course-meme-coins.jpg',
      level: 'beginner',
      duration: '1.5 hours',
      modules: 4,
    },
    {
      id: 3,
      title: 'Technical Analysis for Crypto',
      description: 'Master the tools and techniques for analyzing cryptocurrency price charts and market trends.',
      image: '/images/course-technical-analysis.jpg',
      level: 'intermediate',
      duration: '3 hours',
      modules: 6,
    },
    {
      id: 4,
      title: 'Risk Management in Crypto',
      description: 'Develop strategies to manage risk and protect your investments in the volatile crypto market.',
      image: '/images/course-risk-management.jpg',
      level: 'intermediate',
      duration: '2.5 hours',
      modules: 5,
    },
    {
      id: 5,
      title: 'Advanced Trading Strategies',
      description: 'Learn sophisticated trading techniques and strategies for experienced crypto investors.',
      image: '/images/course-advanced-trading.jpg',
      level: 'advanced',
      duration: '4 hours',
      modules: 8,
    },
    {
      id: 6,
      title: 'Crypto Taxation and Compliance',
      description: 'Understand the tax implications of cryptocurrency investments and how to stay compliant.',
      image: '/images/course-crypto-tax.jpg',
      level: 'intermediate',
      duration: '2 hours',
      modules: 4,
    },
  ];
  
  const tutorials = [
    {
      id: 1,
      title: 'How to Create a Crypto Wallet',
      type: 'video',
      duration: '15 min',
      level: 'beginner',
    },
    {
      id: 2,
      title: 'Reading Candlestick Charts',
      type: 'article',
      duration: '10 min',
      level: 'intermediate',
    },
    {
      id: 3,
      title: 'Dollar-Cost Averaging Strategy',
      type: 'video',
      duration: '12 min',
      level: 'beginner',
    },
    {
      id: 4,
      title: 'Identifying Pump and Dump Schemes',
      type: 'article',
      duration: '8 min',
      level: 'intermediate',
    },
    {
      id: 5,
      title: 'Setting Up Stop-Loss Orders',
      type: 'video',
      duration: '9 min',
      level: 'beginner',
    },
    {
      id: 6,
      title: 'Analyzing Token Metrics',
      type: 'article',
      duration: '15 min',
      level: 'advanced',
    },
    {
      id: 7,
      title: 'Understanding Market Cycles',
      type: 'video',
      duration: '20 min',
      level: 'intermediate',
    },
    {
      id: 8,
      title: 'Securing Your Crypto Assets',
      type: 'article',
      duration: '12 min',
      level: 'beginner',
    },
  ];
  
  const glossaryTerms = [
    {
      term: 'Blockchain',
      definition: 'A distributed ledger technology that records transactions across multiple computers to ensure security, transparency, and decentralization.',
      category: 'Technology',
    },
    {
      term: 'Cryptocurrency',
      definition: 'A digital or virtual currency that uses cryptography for security and operates on a blockchain, typically decentralized and not controlled by any central authority.',
      category: 'General',
    },
    {
      term: 'Meme Coin',
      definition: 'A cryptocurrency inspired by internet memes, jokes, or pop culture references, often created as a parody but sometimes gaining significant value.',
      category: 'Tokens',
    },
    {
      term: 'HODL',
      definition: 'A term derived from a misspelling of "hold" that refers to the strategy of buying and holding cryptocurrency regardless of price fluctuations.',
      category: 'Trading',
    },
    {
      term: 'DeFi',
      definition: 'Decentralized Finance; financial services built on blockchain technology that operate without centralized intermediaries like banks.',
      category: 'Finance',
    },
    {
      term: 'NFT',
      definition: 'Non-Fungible Token; a unique digital asset that represents ownership of a specific item or piece of content, typically using blockchain technology.',
      category: 'Tokens',
    },
    {
      term: 'Market Cap',
      definition: 'The total value of a cryptocurrency, calculated by multiplying the current price by the circulating supply.',
      category: 'Trading',
    },
    {
      term: 'Whale',
      definition: 'An individual or entity that holds a large amount of a particular cryptocurrency, capable of influencing market prices through large buy or sell orders.',
      category: 'Trading',
    },
    {
      term: 'Smart Contract',
      definition: 'Self-executing contracts with the terms directly written into code, automatically enforcing and executing agreements when predetermined conditions are met.',
      category: 'Technology',
    },
    {
      term: 'Liquidity Pool',
      definition: 'A collection of funds locked in a smart contract, used to facilitate trading by providing liquidity for decentralized exchanges.',
      category: 'Finance',
    },
  ];
  
  const filteredGlossaryTerms = searchTerm
    ? glossaryTerms.filter(term =>
        term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : glossaryTerms;
  
  return (
    <Box>
      {/* Hero Section */}
      <HeroWrapper>
        <Container maxWidth="lg">
          <HeroContent>
            <Grid container spacing={4} alignItems="center">
              <Grid xs={12} md={6}>
                <Typography variant="h6" sx={{ color: colors.vibrantYellow, mb: 1 }}>
                  @BEUhouse Education
                </Typography>
                <Typography variant="h3" sx={{ fontFamily: '"Bebas Neue", sans-serif', mb: 2 }}>
                  Learn, Understand, Invest
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
                  Access comprehensive educational resources to understand cryptocurrency, blockchain technology, and meme coins. From beginner guides to advanced trading strategies, we've got you covered.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    component={RouterLink}
                    to="/education/courses"
                    variant="contained"
                    size="large"
                    sx={{ 
                      bgcolor: colors.vibrantYellow,
                      color: colors.deepBlue,
                      '&:hover': {
                        bgcolor: '#D9A82C',
                      },
                    }}
                  >
                    Start Learning
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/education/glossary"
                    variant="outlined"
                    size="large"
                    sx={{ 
                      borderColor: colors.white,
                      color: colors.white,
                      '&:hover': {
                        borderColor: colors.vibrantYellow,
                        backgroundColor: 'rgba(240, 193, 75, 0.1)',
                      },
                    }}
                  >
                    View Glossary
                  </Button>
                </Box>
              </Grid>
              <Grid xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                <HeroIllustration
                  src="/images/education-hero.svg"
                  alt="Cryptocurrency Education"
                  sx={{
                    maxWidth: '100%',
                    height: 'auto',
                    maxHeight: 400,
                  }}
                />
              </Grid>
            </Grid>
          </HeroContent>
        </Container>
      </HeroWrapper>
      
      {/* Courses Section */}
      <SectionWrapper>
        <Container maxWidth="lg">
          <CenteredSectionTitle variant="h4">
            Featured Courses
          </CenteredSectionTitle>
          <Typography variant="body1" color="textSecondary" align="center" sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}>
            Comprehensive courses designed to take you from crypto novice to confident investor. Each course includes video lessons, reading materials, and quizzes.
          </Typography>
          
          <Grid container spacing={4}>
            {courses.map(course => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                <CourseCard>
                  <CardMedia
                    component="img"
                    height="180"
                    image={course.image}
                    alt={course.title}
                  />
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <LevelChip
                        label={course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                        level={course.level as 'beginner' | 'intermediate' | 'advanced'}
                        size="small"
                      />
                      <Typography variant="body2" color="textSecondary">
                        {course.duration}
                      </Typography>
                    </Box>
                    <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                      {course.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                      {course.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2">
                        {course.modules} modules
                      </Typography>
                      <Button 
                        component={RouterLink} 
                        to={`/education/courses/${course.id}`} 
                        sx={{ color: colors.deepBlue }}
                        endIcon={<ArrowForward />}
                      >
                        Start Course
                      </Button>
                    </Box>
                  </CardContent>
                </CourseCard>
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              component={RouterLink}
              to="/education/courses"
              variant="contained"
              size="large"
              sx={{ 
                bgcolor: colors.deepBlue,
                '&:hover': {
                  bgcolor: '#1E4B8D',
                },
              }}
            >
              View All Courses
            </Button>
          </Box>
        </Container>
      </SectionWrapper>
      
      {/* Tutorials and Resources Section */}
      <SectionWrapper bgcolor={colors.lightGray}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <SectionTitle variant="h4">
                Quick Tutorials
              </SectionTitle>
              <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
                Short, focused tutorials to help you master specific aspects of cryptocurrency investing and trading.
              </Typography>
              
              <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
                <List disablePadding>
                  {tutorials.map((tutorial, index) => (
                    <React.Fragment key={tutorial.id}>
                      {index > 0 && <Divider />}
                      <StyledListItem component={RouterLink} to={`/education/tutorials/${tutorial.id}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                        <ListItemIcon>
                          {tutorial.type === 'video' ? (
                            <VideoLibrary sx={{ color: colors.deepBlue }} />
                          ) : (
                            <MenuBook sx={{ color: colors.deepBlue }} />
                          )}
                        </ListItemIcon>
                        <ListItemText
                          primary={tutorial.title}
                          secondary={`${tutorial.type} • ${tutorial.duration}`}
                        />
                        <LevelChip
                          label={tutorial.level.charAt(0).toUpperCase() + tutorial.level.slice(1)}
                          level={tutorial.level as 'beginner' | 'intermediate' | 'advanced'}
                          size="small"
                        />
                      </StyledListItem>
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
              
              <Button
                component={RouterLink}
                to="/education/tutorials"
                variant="outlined"
                sx={{ 
                  mt: 3,
                  color: colors.deepBlue,
                  borderColor: colors.deepBlue,
                }}
              >
                View All Tutorials
              </Button>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <SectionTitle variant="h4">
                Learning Resources
              </SectionTitle>
              <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
                Additional resources to enhance your cryptocurrency knowledge and investment skills.
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <ResourceCard>
                    <CardContent sx={{ p: 3, flexGrow: 1 }}>
                      <IconBox>
                        <Assignment />
                      </IconBox>
                      <Typography variant="h6" gutterBottom>
                        Crypto Guides
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Step-by-step guides for various cryptocurrency platforms and tools.
                      </Typography>
                    </CardContent>
                    <Button 
                      component={RouterLink} 
                      to="/education/guides" 
                      sx={{ p: 2, color: colors.deepBlue }}
                    >
                      View Guides
                    </Button>
                  </ResourceCard>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <ResourceCard>
                    <CardContent sx={{ p: 3, flexGrow: 1 }}>
                      <IconBox>
                        <Lightbulb />
                      </IconBox>
                      <Typography variant="h6" gutterBottom>
                        Investment Tips
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Practical tips and advice for making informed investment decisions.
                      </Typography>
                    </CardContent>
                    <Button 
                      component={RouterLink} 
                      to="/education/tips" 
                      sx={{ p: 2, color: colors.deepBlue }}
                    >
                      Read Tips
                    </Button>
                  </ResourceCard>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <ResourceCard>
                    <CardContent sx={{ p: 3, flexGrow: 1 }}>
                      <IconBox>
                        <TrendingUp />
                      </IconBox>
                      <Typography variant="h6" gutterBottom>
                        Market Analysis
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Regular market analysis and insights on cryptocurrency trends.
                      </Typography>
                    </CardContent>
                    <Button 
                      component={RouterLink} 
                      to="/education/analysis" 
                      sx={{ p: 2, color: colors.deepBlue }}
                    >
                      View Analysis
                    </Button>
                  </ResourceCard>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <ResourceCard>
                    <CardContent sx={{ p: 3, flexGrow: 1 }}>
                      <IconBox>
                        <Psychology />
                      </IconBox>
                      <Typography variant="h6" gutterBottom>
                        Investor Psychology
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Understanding the psychological aspects of crypto investing.
                      </Typography>
                    </CardContent>
                    <Button 
                      component={RouterLink} 
                      to="/education/psychology" 
                      sx={{ p: 2, color: colors.deepBlue }}
                    >
                      Learn More
                    </Button>
                  </ResourceCard>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </SectionWrapper>
      
      {/* Glossary Section */}
      <SectionWrapper>
        <Container maxWidth="lg">
          <CenteredSectionTitle variant="h4">
            Cryptocurrency Glossary
          </CenteredSectionTitle>
          <Typography variant="body1" color="textSecondary" align="center" sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}>
            A comprehensive glossary of cryptocurrency terms to help you understand the complex world of digital assets.
          </Typography>
          
          <Box sx={{ mb: 4 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search for terms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          
          <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="glossary tabs">
                <Tab label="All Terms" />
                <Tab label="Technology" />
                <Tab label="Trading" />
                <Tab label="Finance" />
                <Tab label="Tokens" />
              </Tabs>
            </Box>
            
            <GlossaryWrapper>
              <List disablePadding>
                {filteredGlossaryTerms.length > 0 ? (
                  filteredGlossaryTerms
                    .filter(term => tabValue === 0 || term.category.toLowerCase() === ['all terms', 'technology', 'trading', 'finance', 'tokens'][tabValue].toLowerCase())
                    .map((term, index, filteredArray) => (
                      <React.Fragment key={term.term}>
                        {index > 0 && <Divider />}
                        <ListItem sx={{ py: 2 }}>
                          <ListItemIcon>
                            <CheckCircle sx={{ color: colors.deepBlue }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                {term.term}
                              </Typography>
                            }
                            secondary={
                              <>
                                <Typography variant="body2" paragraph>
                                  {term.definition}
                                </Typography>
                                <Chip
                                  label={term.category}
                                  size="small"
                                  sx={{
                                    bgcolor: 'rgba(10, 45, 90, 0.1)',
                                    color: colors.deepBlue,
                                  }}
                                />
                              </>
                            }
                            secondaryTypographyProps={{ component: 'div' }}
                          />
                        </ListItem>
                      </React.Fragment>
                    ))
                ) : (
                  <ListItem sx={{ py: 3 }}>
                    <ListItemText
                      primary={
                        <Typography variant="body1" align="center">
                          No terms found matching "{searchTerm}"
                        </Typography>
                      }
                    />
                  </ListItem>
                )}
              </List>
            </GlossaryWrapper>
          </Paper>
          
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              component={RouterLink}
              to="/education/glossary"
              variant="contained"
              size="large"
              sx={{ 
                bgcolor: colors.deepBlue,
                '&:hover': {
                  bgcolor: '#1E4B8D',
                },
              }}
            >
              View Full Glossary
            </Button>
          </Box>
        </Container>
      </SectionWrapper>
      
      {/* Learning Paths Section */}
      <SectionWrapper bgcolor={colors.lightGray}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <SectionTitle variant="h4">
                Learning Paths
              </SectionTitle>
              <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
                Structured learning paths to guide you from beginner to expert in cryptocurrency investing, tailored to your goals and experience level.
              </Typography>
              
              <List>
                <StyledListItem>
                  <ListItemIcon>
                    <IconBox sx={{ width: 40, height: 40, mb: 0 }}>
                      <School fontSize="small" />
                    </IconBox>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Beginner's Path
                      </Typography>
                    }
                    secondary="Start your crypto journey with foundational knowledge and basic investment strategies."
                  />
                  <Button
                    component={RouterLink}
                    to="/education/paths/beginner"
                    sx={{ color: colors.deepBlue }}
                  >
                    View Path
                  </Button>
                </StyledListItem>
                
                <StyledListItem>
                  <ListItemIcon>
                    <IconBox sx={{ width: 40, height: 40, mb: 0 }}>
                      <AccountBalance fontSize="small" />
                    </IconBox>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Investor's Path
                      </Typography>
                    }
                    secondary="Develop a comprehensive understanding of crypto markets and long-term investment strategies."
                  />
                  <Button
                    component={RouterLink}
                    to="/education/paths/investor"
                    sx={{ color: colors.deepBlue }}
                  >
                    View Path
                  </Button>
                </StyledListItem>
                
                <StyledListItem>
                  <ListItemIcon>
                    <IconBox sx={{ width: 40, height: 40, mb: 0 }}>
                      <TrendingUp fontSize="small" />
                    </IconBox>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Trader's Path
                      </Typography>
                    }
                    secondary="Master technical analysis and active trading strategies for the cryptocurrency market."
                  />
                  <Button
                    component={RouterLink}
                    to="/education/paths/trader"
                    sx={{ color: colors.deepBlue }}
                  >
                    View Path
                  </Button>
                </StyledListItem>
                
                <StyledListItem>
                  <ListItemIcon>
                    <IconBox sx={{ width: 40, height: 40, mb: 0 }}>
                      <Security fontSize="small" />
                    </IconBox>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Security Expert Path
                      </Typography>
                    }
                    secondary="Learn how to secure your crypto assets and protect yourself from scams and hacks."
                  />
                  <Button
                    component={RouterLink}
                    to="/education/paths/security"
                    sx={{ color: colors.deepBlue }}
                  >
                    View Path
                  </Button>
                </StyledListItem>
              </List>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/images/learning-paths.png"
                alt="Learning Paths"
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxWidth: 500,
                  mx: 'auto',
                  display: 'block',
                  borderRadius: 4,
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </SectionWrapper>
    </Box>
  );
};

export default Education;
