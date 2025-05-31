import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Button,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Paper,
  TextField,
  InputAdornment,
  Chip,
  IconButton,
  Badge,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Search,
  Forum,
  People,
  Event,
  Chat,
  ThumbUp,
  Comment,
  Visibility,
  Send,
  Bookmark,
  Share,
  MoreVert,
} from '@mui/icons-material';
import styled from 'styled-components';
import { colors } from '../styles/theme';

const HeroWrapper = styled(Box)`
  background: linear-gradient(135deg, ${colors.deepBlue} 0%, #071D3B 100%);
  color: ${colors.white};
  padding: 5rem 0;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('/images/community-pattern.svg');
    background-size: cover;
    opacity: 0.1;
    z-index: 0;
  }
`;

const SectionWrapper = styled(Box)<{ bgcolor?: string }>`
  padding: 4rem 0;
  background-color: ${props => props.bgcolor || 'transparent'};
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

const ForumCard = styled(Card)`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  }
`;

const TopicItem = styled(ListItem)`
  transition: background-color 0.3s ease;
  border-radius: 8px;
  
  &:hover {
    background-color: rgba(10, 45, 90, 0.05);
  }
`;

const EventCard = styled(Card)`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  }
`;

const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    border-radius: 30px;
    
    &.Mui-focused fieldset {
      border-color: ${colors.deepBlue};
    }
  }
`;

const StyledChip = styled(Chip)`
  background-color: rgba(10, 45, 90, 0.1);
  color: ${colors.deepBlue};
  font-weight: 500;
  
  &:hover {
    background-color: rgba(10, 45, 90, 0.2);
  }
`;

const Community: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  // Mock data for community content
  const forumCategories = [
    {
      id: 1,
      name: 'Cryptocurrency Basics',
      description: 'Discussions about the fundamentals of cryptocurrency and blockchain technology.',
      topics: 156,
      posts: 1243,
      lastActive: '10 minutes ago',
    },
    {
      id: 2,
      name: 'Meme Coins',
      description: 'Everything related to meme coins, trends, and investment opportunities.',
      topics: 203,
      posts: 1876,
      lastActive: '2 minutes ago',
    },
    {
      id: 3,
      name: 'Trading Strategies',
      description: 'Share and discuss various cryptocurrency trading strategies and techniques.',
      topics: 98,
      posts: 754,
      lastActive: '1 hour ago',
    },
    {
      id: 4,
      name: 'Market Analysis',
      description: 'Technical and fundamental analysis of the cryptocurrency market.',
      topics: 112,
      posts: 867,
      lastActive: '30 minutes ago',
    },
    {
      id: 5,
      name: 'Security & Safety',
      description: 'Tips and discussions about securing your crypto assets and avoiding scams.',
      topics: 87,
      posts: 623,
      lastActive: '3 hours ago',
    },
    {
      id: 6,
      name: 'General Discussion',
      description: 'General cryptocurrency discussions that don\'t fit in other categories.',
      topics: 245,
      posts: 1987,
      lastActive: '5 minutes ago',
    },
  ];
  
  const recentTopics = [
    {
      id: 1,
      title: 'What do you think about the recent surge in meme coin prices?',
      author: {
        name: 'CryptoEnthusiast',
        avatar: '/images/avatar-1.jpg',
      },
      category: 'Meme Coins',
      replies: 24,
      views: 156,
      lastActive: '5 minutes ago',
    },
    {
      id: 2,
      title: 'Best hardware wallets for securing your crypto in 2025',
      author: {
        name: 'SecurityFirst',
        avatar: '/images/avatar-2.jpg',
      },
      category: 'Security & Safety',
      replies: 18,
      views: 132,
      lastActive: '30 minutes ago',
    },
    {
      id: 3,
      title: 'Technical analysis: BTC price prediction for Q3 2025',
      author: {
        name: 'ChartMaster',
        avatar: '/images/avatar-3.jpg',
      },
      category: 'Market Analysis',
      replies: 31,
      views: 203,
      lastActive: '1 hour ago',
    },
    {
      id: 4,
      title: 'Beginner\'s guide to DeFi platforms - where to start?',
      author: {
        name: 'DeFiNewbie',
        avatar: '/images/avatar-4.jpg',
      },
      category: 'Cryptocurrency Basics',
      replies: 42,
      views: 287,
      lastActive: '2 hours ago',
    },
    {
      id: 5,
      title: 'Dollar-cost averaging vs. lump sum investing in crypto',
      author: {
        name: 'InvestorPro',
        avatar: '/images/avatar-5.jpg',
      },
      category: 'Trading Strategies',
      replies: 27,
      views: 178,
      lastActive: '3 hours ago',
    },
  ];
  
  const upcomingEvents = [
    {
      id: 1,
      title: 'Meme Coin Market Analysis Webinar',
      description: 'Join our experts for an in-depth analysis of the current meme coin market trends and future predictions.',
      date: 'June 5, 2025',
      time: '3:00 PM - 4:30 PM UTC',
      location: 'Online',
      attendees: 156,
    },
    {
      id: 2,
      title: 'Crypto Trading Workshop',
      description: 'A hands-on workshop to learn practical trading strategies for the cryptocurrency market.',
      date: 'June 12, 2025',
      time: '2:00 PM - 5:00 PM UTC',
      location: 'Online',
      attendees: 98,
    },
    {
      id: 3,
      title: '@BEUhouse Community Meetup',
      description: 'Virtual meetup for community members to network, share insights, and discuss the latest in crypto.',
      date: 'June 20, 2025',
      time: '6:00 PM - 7:30 PM UTC',
      location: 'Online',
      attendees: 124,
    },
  ];
  
  const communityMembers = [
    {
      id: 1,
      name: 'CryptoEnthusiast',
      avatar: '/images/avatar-1.jpg',
      role: 'Member',
      posts: 87,
      joined: 'January 2025',
    },
    {
      id: 2,
      name: 'SecurityFirst',
      avatar: '/images/avatar-2.jpg',
      role: 'Moderator',
      posts: 156,
      joined: 'November 2024',
    },
    {
      id: 3,
      name: 'ChartMaster',
      avatar: '/images/avatar-3.jpg',
      role: 'Member',
      posts: 124,
      joined: 'February 2025',
    },
    {
      id: 4,
      name: 'DeFiNewbie',
      avatar: '/images/avatar-4.jpg',
      role: 'Member',
      posts: 42,
      joined: 'March 2025',
    },
  ];
  
  return (
    <Box>
      {/* Hero Section */}
      <HeroWrapper>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ color: colors.vibrantYellow, mb: 1 }}>
                @BEUhouse Community
              </Typography>
              <Typography variant="h3" sx={{ fontFamily: '"Bebas Neue", sans-serif', mb: 2 }}>
                Connect, Share, Learn Together
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
                Join our vibrant community of cryptocurrency enthusiasts, traders, and investors. Share knowledge, discuss market trends, and connect with like-minded individuals.
              </Typography>
              <Button
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
                Join Community
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/images/community-hero.png"
                alt="Community Hero"
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxWidth: 500,
                  mx: 'auto',
                  display: 'block',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </HeroWrapper>
      
      {/* Forums Section */}
      <SectionWrapper>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
            <SectionTitle variant="h4">
              Discussion Forums
            </SectionTitle>
            <StyledTextField
              placeholder="Search forums..."
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{ width: { xs: '100%', sm: 300 } }}
            />
          </Box>
          
          <Grid container spacing={3}>
            {forumCategories.map(category => (
              <Grid item xs={12} sm={6} md={4} key={category.id}>
                <ForumCard>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: colors.deepBlue,
                          width: 50,
                          height: 50,
                          mr: 2,
                        }}
                      >
                        <Forum />
                      </Avatar>
                      <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                        {category.name}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 3, minHeight: 60 }}>
                      {category.description}
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="body2" component="span" sx={{ mr: 2 }}>
                          <strong>{category.topics}</strong> Topics
                        </Typography>
                        <Typography variant="body2" component="span">
                          <strong>{category.posts}</strong> Posts
                        </Typography>
                      </Box>
                      <Button
                        component={RouterLink}
                        to={`/community/forums/${category.id}`}
                        variant="outlined"
                        size="small"
                        sx={{
                          color: colors.deepBlue,
                          borderColor: colors.deepBlue,
                        }}
                      >
                        View
                      </Button>
                    </Box>
                  </CardContent>
                </ForumCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </SectionWrapper>
      
      {/* Recent Topics Section */}
      <SectionWrapper bgcolor={colors.lightGray}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
            <SectionTitle variant="h4">
              Recent Discussions
            </SectionTitle>
            <Box>
              <Button
                component={RouterLink}
                to="/community/new-topic"
                variant="contained"
                sx={{
                  bgcolor: colors.deepBlue,
                  '&:hover': {
                    bgcolor: '#1E4B8D',
                  },
                }}
                startIcon={<Forum />}
              >
                New Topic
              </Button>
            </Box>
          </Box>
          
          <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <List disablePadding>
              {recentTopics.map((topic, index) => (
                <React.Fragment key={topic.id}>
                  {index > 0 && <Divider />}
                  <TopicItem component={RouterLink} to={`/community/topics/${topic.id}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItemAvatar>
                      <Avatar src={topic.author.avatar} alt={topic.author.name} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {topic.title}
                          </Typography>
                          <StyledChip
                            label={topic.category}
                            size="small"
                          />
                        </Box>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                          <Typography variant="body2" component="span" sx={{ mr: 2 }}>
                            By {topic.author.name}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                            <Comment fontSize="small" sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                            <Typography variant="body2" color="textSecondary">
                              {topic.replies}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Visibility fontSize="small" sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                            <Typography variant="body2" color="textSecondary">
                              {topic.views}
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                    <Typography variant="body2" color="textSecondary" sx={{ ml: 2 }}>
                      {topic.lastActive}
                    </Typography>
                  </TopicItem>
                </React.Fragment>
              ))}
            </List>
          </Paper>
          
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Button
              component={RouterLink}
              to="/community/topics"
              variant="outlined"
              sx={{
                color: colors.deepBlue,
                borderColor: colors.deepBlue,
              }}
            >
              View All Topics
            </Button>
          </Box>
        </Container>
      </SectionWrapper>
      
      {/* Events Section */}
      <SectionWrapper>
        <Container maxWidth="lg">
          <SectionTitle variant="h4">
            Upcoming Events
          </SectionTitle>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
            Join our virtual events to learn from experts, network with community members, and stay updated on the latest crypto trends.
          </Typography>
          
          <Grid container spacing={3}>
            {upcomingEvents.map(event => (
              <Grid item xs={12} md={4} key={event.id}>
                <EventCard>
                  <CardContent>
                    <Typography variant="overline" color="primary" sx={{ fontWeight: 600 }}>
                      {event.date} • {event.time}
                    </Typography>
                    <Typography variant="h5" component="h2" sx={{ fontWeight: 600, my: 1 }}>
                      {event.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 2, minHeight: 60 }}>
                      {event.description}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Event sx={{ color: colors.deepBlue, mr: 1 }} />
                      <Typography variant="body2">
                        {event.location}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <People sx={{ color: colors.deepBlue, mr: 1 }} />
                      <Typography variant="body2">
                        {event.attendees} attending
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          bgcolor: colors.deepBlue,
                          '&:hover': {
                            bgcolor: '#1E4B8D',
                          },
                        }}
                      >
                        Register
                      </Button>
                      <Button
                        variant="outlined"
                        sx={{
                          color: colors.deepBlue,
                          borderColor: colors.deepBlue,
                        }}
                      >
                        Details
                      </Button>
                    </Box>
                  </CardContent>
                </EventCard>
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              component={RouterLink}
              to="/community/events"
              variant="contained"
              sx={{
                bgcolor: colors.deepBlue,
                '&:hover': {
                  bgcolor: '#1E4B8D',
                },
              }}
            >
              View All Events
            </Button>
          </Box>
        </Container>
      </SectionWrapper>
      
      {/* Community Members Section */}
      <SectionWrapper bgcolor={colors.lightGray}>
        <Container maxWidth="lg">
          <SectionTitle variant="h4">
            Active Community Members
          </SectionTitle>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
            Meet some of our most active community members who contribute valuable insights and help others.
          </Typography>
          
          <Grid container spacing={3}>
            {communityMembers.map(member => (
              <Grid item xs={12} sm={6} md={3} key={member.id}>
                <Card sx={{ borderRadius: 2, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Avatar
                      src={member.avatar}
                      alt={member.name}
                      sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {member.name}
                    </Typography>
                    <Chip
                      label={member.role}
                      size="small"
                      sx={{
                        bgcolor: member.role === 'Moderator' ? 'rgba(240, 193, 75, 0.1)' : 'rgba(10, 45, 90, 0.1)',
                        color: member.role === 'Moderator' ? colors.vibrantYellow : colors.deepBlue,
                        my: 1,
                      }}
                    />
                    <Typography variant="body2" color="textSecondary">
                      {member.posts} posts • Joined {member.joined}
                    </Typography>
                    <Button
                      variant="text"
                      component={RouterLink}
                      to={`/community/members/${member.id}`}
                      sx={{ mt: 2, color: colors.deepBlue }}
                    >
                      View Profile
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              component={RouterLink}
              to="/community/members"
              variant="outlined"
              sx={{
                color: colors.deepBlue,
                borderColor: colors.deepBlue,
              }}
            >
              View All Members
            </Button>
          </Box>
        </Container>
      </SectionWrapper>
    </Box>
  );
};

export default Community;
