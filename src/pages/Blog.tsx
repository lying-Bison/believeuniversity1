import React from 'react';
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
  Divider,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  ArrowForward,
  CalendarToday,
  Person,
  LocalOffer,
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

const SectionTitle = styled(Typography)`
  text-align: center;
  margin-bottom: 1.5rem;
  font-family: 'Bebas Neue', sans-serif;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -8px;
    width: 60px;
    height: 3px;
    background-color: ${colors.vibrantYellow};
  }
`;

const BlogCard = styled(Card)`
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
  
  .MuiCardMedia-root {
    transition: transform 0.5s ease;
  }
  
  &:hover .MuiCardMedia-root {
    transform: scale(1.05);
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

const HeroContent = styled(Box)`
  position: relative;
  z-index: 1;
  max-width: 800px;
  
  h3 {
    margin-bottom: 1.5rem;
    font-size: 3rem;
    line-height: 1.2;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  h6 {
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }
`;

const Blog: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Mock data for blog posts
  const featuredPosts = [
    {
      id: 1,
      title: 'Understanding Meme Coins: Beyond the Hype',
      excerpt: 'Explore the phenomenon of meme coins, their market dynamics, and what makes them different from traditional cryptocurrencies.',
      image: '/images/blog-post-1.jpg',
      date: 'May 25, 2025',
      author: 'Sarah Johnson',
      readTime: '5 min',
      categories: ['Meme Coins', 'Basics'],
      slug: 'understanding-meme-coins',
    },
    {
      id: 2,
      title: 'Essential Risk Management Strategies for Crypto Investors',
      excerpt: 'Learn practical risk management techniques to protect your investments in the volatile cryptocurrency market.',
      image: '/images/blog-post-2.jpg',
      date: 'May 20, 2025',
      author: 'Michael Chen',
      readTime: '7 min',
      categories: ['Investment', 'Strategy'],
      slug: 'risk-management-strategies',
    },
    {
      id: 3,
      title: 'Technical Analysis Basics for Cryptocurrency Trading',
      excerpt: 'Discover the fundamental principles of technical analysis and how to apply them to cryptocurrency trading.',
      image: '/images/blog-post-3.jpg',
      date: 'May 15, 2025',
      author: 'Alex Rodriguez',
      readTime: '6 min',
      categories: ['Trading', 'Technical Analysis'],
      slug: 'technical-analysis-basics',
    },
  ];
  
  const recentPosts = [
    {
      id: 4,
      title: 'The Role of Social Media in Cryptocurrency Adoption',
      excerpt: 'How platforms like Twitter, Reddit, and Discord are shaping the cryptocurrency landscape and influencing market trends.',
      image: '/images/blog-post-4.jpg',
      date: 'May 10, 2025',
      author: 'Emma Wilson',
      readTime: '4 min',
      categories: ['Social Media', 'Adoption'],
      slug: 'social-media-crypto-adoption',
    },
    {
      id: 5,
      title: 'Decentralized Finance (DeFi): A Beginner\'s Guide',
      excerpt: 'Understanding the basics of DeFi, its potential benefits, and the risks involved for new crypto investors.',
      image: '/images/blog-post-5.jpg',
      date: 'May 5, 2025',
      author: 'David Kim',
      readTime: '8 min',
      categories: ['DeFi', 'Basics'],
      slug: 'defi-beginners-guide',
    },
    {
      id: 6,
      title: 'NFTs and Their Impact on Digital Art and Collectibles',
      excerpt: 'Exploring how non-fungible tokens are revolutionizing digital ownership and creating new opportunities for artists and collectors.',
      image: '/images/blog-post-6.jpg',
      date: 'April 30, 2025',
      author: 'Sophia Martinez',
      readTime: '6 min',
      categories: ['NFTs', 'Digital Art'],
      slug: 'nfts-digital-art-collectibles',
    },
  ];
  
  const categories = [
    'Meme Coins',
    'Basics',
    'Investment',
    'Strategy',
    'Trading',
    'Technical Analysis',
    'Social Media',
    'Adoption',
    'DeFi',
    'NFTs',
    'Digital Art',
    'Blockchain',
    'Security',
  ];
  
  return (
    <Box>
      {/* Hero Section */}
      <HeroWrapper>
        <Container maxWidth="lg">
          <HeroContent>
            <Typography variant="h6" sx={{ color: colors.vibrantYellow, mb: 1 }}>
              @BEUhouse Blog
            </Typography>
            <Typography variant="h3" sx={{ fontFamily: '"Bebas Neue", sans-serif', mb: 2 }}>
              Latest Insights & Education
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.9, maxWidth: 700 }}>
              Stay informed with our latest articles, guides, and insights on cryptocurrency, blockchain technology, and meme coins. Our expert contributors share valuable knowledge to help you navigate the crypto landscape.
            </Typography>
          </HeroContent>
        </Container>
      </HeroWrapper>
      
      {/* Featured Posts Section */}
      <SectionWrapper>
        <Container maxWidth="lg">
          <SectionTitle variant="h4">
            Featured Articles
          </SectionTitle>
          <Typography variant="body1" color="textSecondary" align="center" sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}>
            Our most popular and informative articles to help you understand the world of cryptocurrency.
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -2 }}>
            {featuredPosts.map(post => (
              <Box key={post.id} sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' }, p: 2 }}>
                <BlogCard>
                  <CardMedia
                    component="img"
                    height="200"
                    image={post.image}
                    alt={post.title}
                  />
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                        <CalendarToday sx={{ fontSize: 14, mr: 0.5, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary">
                          {post.date}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Person sx={{ fontSize: 14, mr: 0.5, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary">
                          {post.author}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {post.excerpt}
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      {post.categories.map(category => (
                        <CategoryChip key={category} label={category} size="small" />
                      ))}
                    </Box>
                    <Button 
                      component={RouterLink} 
                      to={`/blog/${post.slug}`} 
                      endIcon={<ArrowForward />}
                      sx={{ color: colors.deepBlue }}
                    >
                      Read More
                    </Button>
                  </CardContent>
                </BlogCard>
              </Box>
            ))}
          </Box>
        </Container>
      </SectionWrapper>
      
      {/* Recent Posts Section */}
      <SectionWrapper bgcolor={colors.lightGray}>
        <Container maxWidth="lg">
          <SectionTitle variant="h4">
            Recent Articles
          </SectionTitle>
          <Typography variant="body1" color="textSecondary" align="center" sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}>
            Our latest publications covering various aspects of cryptocurrency and blockchain technology.
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -2 }}>
            {recentPosts.map(post => (
              <Box key={post.id} sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' }, p: 2 }}>
                <BlogCard>
                  <CardMedia
                    component="img"
                    height="200"
                    image={post.image}
                    alt={post.title}
                  />
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                        <CalendarToday sx={{ fontSize: 14, mr: 0.5, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary">
                          {post.date}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Person sx={{ fontSize: 14, mr: 0.5, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary">
                          {post.author}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {post.excerpt}
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      {post.categories.map(category => (
                        <CategoryChip key={category} label={category} size="small" />
                      ))}
                    </Box>
                    <Button 
                      component={RouterLink} 
                      to={`/blog/${post.slug}`} 
                      endIcon={<ArrowForward />}
                      sx={{ color: colors.deepBlue }}
                    >
                      Read More
                    </Button>
                  </CardContent>
                </BlogCard>
              </Box>
            ))}
          </Box>
          
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              component={RouterLink}
              to="/blog/archive"
              variant="contained"
              size="large"
              sx={{ 
                bgcolor: colors.deepBlue,
                '&:hover': {
                  bgcolor: '#1E4B8D',
                },
              }}
            >
              View All Articles
            </Button>
          </Box>
        </Container>
      </SectionWrapper>
      
      {/* Categories Section */}
      <SectionWrapper>
        <Container maxWidth="lg">
          <SectionTitle variant="h4">
            Browse by Category
          </SectionTitle>
          <Typography variant="body1" color="textSecondary" align="center" sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}>
            Explore our articles by topic to find exactly what you're looking for.
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1, mb: 4 }}>
            {categories.map(category => (
              <Button
                key={category}
                component={RouterLink}
                to={`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                variant="outlined"
                sx={{ 
                  borderColor: colors.deepBlue,
                  color: colors.deepBlue,
                  '&:hover': {
                    borderColor: colors.vibrantYellow,
                    backgroundColor: 'rgba(240, 193, 75, 0.1)',
                  },
                  m: 0.5,
                }}
              >
                {category}
              </Button>
            ))}
          </Box>
        </Container>
      </SectionWrapper>
    </Box>
  );
};

export default Blog;
