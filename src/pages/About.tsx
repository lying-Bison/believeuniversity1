import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  School,
  Forum,
  ShowChart,
  Security,
  Devices,
  Diversity3,
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

const ValueCard = styled(Card)`
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

const TeamCard = styled(Card)`
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.05);
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
    border-color: rgba(240, 193, 75, 0.3);
  }
`;

const IconBox = styled(Box)`
  width: 70px;
  height: 70px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, ${colors.deepBlue} 0%, #1E4B8D 100%);
  color: ${colors.white};
  box-shadow: 0 10px 20px rgba(10, 45, 90, 0.2);
  position: relative;
  overflow: hidden;
  
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 30%;
    bottom: 0;
    left: 0;
    background: linear-gradient(to top, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%);
  }
  
  svg {
    font-size: 32px;
  }
`;

const StatsBox = styled(Box)`
  background: linear-gradient(135deg, ${colors.deepBlue} 0%, #071D3B 100%);
  color: ${colors.white};
  padding: 4rem;
  border-radius: 24px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('/images/crypto-pattern.png');
    background-size: cover;
    opacity: 0.05;
    z-index: 0;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 70% 30%, rgba(240, 193, 75, 0.1) 0%, rgba(10, 45, 90, 0) 50%);
    z-index: 0;
  }
`;

const StatNumber = styled(Typography)`
  font-family: 'Bebas Neue', sans-serif;
  font-size: 3.5rem;
  color: ${colors.vibrantYellow};
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 10px rgba(240, 193, 75, 0.3);
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 5px;
    left: 0;
    width: 40px;
    height: 4px;
    background-color: ${colors.vibrantYellow};
    border-radius: 2px;
    opacity: 0.7;
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

const About: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Mock data for team members
  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      bio: 'Cryptocurrency enthusiast with over 10 years of experience in fintech and blockchain technology.',
      image: '/images/team-1.jpg',
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Chief Technology Officer',
      bio: 'Former blockchain developer with a passion for creating educational tools for crypto newcomers.',
      image: '/images/team-2.jpg',
    },
    {
      id: 3,
      name: 'Alex Rodriguez',
      role: 'Head of Education',
      bio: 'Financial educator specializing in cryptocurrency investments and risk management strategies.',
      image: '/images/team-3.jpg',
    },
    {
      id: 4,
      name: 'Emma Wilson',
      role: 'Community Manager',
      bio: 'Social media expert focused on building engaged crypto communities and fostering meaningful discussions.',
      image: '/images/team-4.jpg',
    },
  ];
  
  return (
    <Box>
      {/* Hero Section */}
      <HeroWrapper>
        <Container maxWidth="lg">
          <HeroContent>
            <Typography variant="h6" sx={{ color: colors.vibrantYellow, mb: 1 }}>
              About @BEUhouse
            </Typography>
            <Typography variant="h3" sx={{ fontFamily: '"Bebas Neue", sans-serif', mb: 2 }}>
              Our Mission & Vision
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.9, maxWidth: 700 }}>
              @BEUhouse is dedicated to providing a trustworthy platform for cryptocurrency education and community engagement, with a special focus on meme coins and speculative trading. Our mission is to empower investors with knowledge, tools, and a supportive community.
            </Typography>
          </HeroContent>
        </Container>
      </HeroWrapper>
      
      {/* Our Story Section */}
      <SectionWrapper>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 4 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" sx={{ fontFamily: '"Bebas Neue", sans-serif', mb: 2 }}>
                Our Story
              </Typography>
              <Typography variant="body1" paragraph>
                @BEUhouse was founded in 2023 by a group of cryptocurrency enthusiasts who recognized the need for accessible, reliable education in the rapidly evolving world of digital assets.
              </Typography>
              <Typography variant="body1" paragraph>
                What began as a small online forum has grown into a comprehensive platform offering educational resources, investment tools, and a vibrant community for cryptocurrency enthusiasts of all experience levels.
              </Typography>
              <Typography variant="body1" paragraph>
                Our focus on meme coins stems from our belief that these assets, while often dismissed as mere jokes, represent an important gateway for many new investors entering the cryptocurrency space. We aim to provide balanced, honest information about these assets alongside traditional cryptocurrencies.
              </Typography>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <Box
                component="img"
                src="/images/about-story.svg"
                alt="Our Story"
                sx={{
                  maxWidth: '100%',
                  height: 'auto',
                  maxHeight: 400,
                }}
              />
            </Box>
          </Box>
        </Container>
      </SectionWrapper>
      
      {/* Our Values Section */}
      <SectionWrapper bgcolor={colors.lightGray}>
        <Container maxWidth="lg">
          <SectionTitle variant="h4">
            Our Core Values
          </SectionTitle>
          <Typography variant="body1" color="textSecondary" align="center" sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}>
            These principles guide everything we do at @BEUhouse, from content creation to community management.
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -2 }}>
            {/* Value 1 */}
            <Box sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' }, p: 2 }}>
              <ValueCard>
                <CardContent sx={{ p: 4 }}>
                  <IconBox>
                    <School fontSize="large" />
                  </IconBox>
                  <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                    Education First
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    We believe that informed investors make better decisions. Our educational content is designed to be accessible, accurate, and comprehensive.
                  </Typography>
                </CardContent>
              </ValueCard>
            </Box>
            
            {/* Value 2 */}
            <Box sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' }, p: 2 }}>
              <ValueCard>
                <CardContent sx={{ p: 4 }}>
                  <IconBox>
                    <Forum fontSize="large" />
                  </IconBox>
                  <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                    Community-Driven
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    We foster an inclusive, supportive community where members can share insights, ask questions, and learn from each other's experiences.
                  </Typography>
                </CardContent>
              </ValueCard>
            </Box>
            
            {/* Value 3 */}
            <Box sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' }, p: 2 }}>
              <ValueCard>
                <CardContent sx={{ p: 4 }}>
                  <IconBox>
                    <Security fontSize="large" />
                  </IconBox>
                  <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                    Transparency & Trust
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    We're committed to providing honest, unbiased information about cryptocurrencies, including both potential rewards and risks.
                  </Typography>
                </CardContent>
              </ValueCard>
            </Box>
            
            {/* Value 4 */}
            <Box sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' }, p: 2 }}>
              <ValueCard>
                <CardContent sx={{ p: 4 }}>
                  <IconBox>
                    <ShowChart fontSize="large" />
                  </IconBox>
                  <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                    Practical Tools
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    We develop and provide practical tools that help users apply their knowledge in real-world scenarios.
                  </Typography>
                </CardContent>
              </ValueCard>
            </Box>
            
            {/* Value 5 */}
            <Box sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' }, p: 2 }}>
              <ValueCard>
                <CardContent sx={{ p: 4 }}>
                  <IconBox>
                    <Devices fontSize="large" />
                  </IconBox>
                  <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                    Accessibility
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    We strive to make cryptocurrency education accessible to everyone, regardless of technical background or experience level.
                  </Typography>
                </CardContent>
              </ValueCard>
            </Box>
            
            {/* Value 6 */}
            <Box sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' }, p: 2 }}>
              <ValueCard>
                <CardContent sx={{ p: 4 }}>
                  <IconBox>
                    <Diversity3 fontSize="large" />
                  </IconBox>
                  <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                    Inclusivity
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    We welcome diverse perspectives and believe that cryptocurrency should be accessible to people from all backgrounds.
                  </Typography>
                </CardContent>
              </ValueCard>
            </Box>
          </Box>
        </Container>
      </SectionWrapper>
      
      {/* Stats Section */}
      <SectionWrapper>
        <Container maxWidth="lg">
          <StatsBox>
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <SectionTitle variant="h4" sx={{ color: colors.white, '&:after': { backgroundColor: colors.vibrantYellow } }}>
                @BEUhouse by the Numbers
              </SectionTitle>
              <Typography variant="body1" align="center" sx={{ mb: 4, opacity: 0.9, maxWidth: 800, mx: 'auto' }}>
                Our growing community and expanding resources
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', textAlign: 'center' }}>
                <Box sx={{ width: { xs: '50%', md: '25%' }, p: 2 }}>
                  <StatNumber variant="h2">10,000+</StatNumber>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    Community Members
                  </Typography>
                </Box>
                <Box sx={{ width: { xs: '50%', md: '25%' }, p: 2 }}>
                  <StatNumber variant="h2">500+</StatNumber>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    Educational Articles
                  </Typography>
                </Box>
                <Box sx={{ width: { xs: '50%', md: '25%' }, p: 2 }}>
                  <StatNumber variant="h2">50+</StatNumber>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    Cryptocurrencies Tracked
                  </Typography>
                </Box>
                <Box sx={{ width: { xs: '50%', md: '25%' }, p: 2 }}>
                  <StatNumber variant="h2">24/7</StatNumber>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    Community Support
                  </Typography>
                </Box>
              </Box>
            </Box>
          </StatsBox>
        </Container>
      </SectionWrapper>
      
      {/* Team Section */}
      <SectionWrapper bgcolor={colors.lightGray}>
        <Container maxWidth="lg">
          <SectionTitle variant="h4">
            Meet Our Team
          </SectionTitle>
          <Typography variant="body1" color="textSecondary" align="center" sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}>
            The passionate individuals behind @BEUhouse who are dedicated to making cryptocurrency education accessible to everyone.
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -2 }}>
            {teamMembers.map(member => (
              <Box key={member.id} sx={{ width: { xs: '100%', sm: '50%', md: '25%' }, p: 2 }}>
                <TeamCard>
                  <Box sx={{ p: 3 }}>
                    <Avatar
                      src={member.image}
                      alt={member.name}
                      sx={{ width: 120, height: 120, mx: 'auto', mb: 2, border: `3px solid ${colors.deepBlue}` }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {member.name}
                    </Typography>
                    <Typography variant="subtitle1" color="primary" sx={{ mb: 2 }}>
                      {member.role}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {member.bio}
                    </Typography>
                  </Box>
                </TeamCard>
              </Box>
            ))}
          </Box>
          
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              component={RouterLink}
              to="/careers"
              variant="contained"
              size="large"
              sx={{ 
                bgcolor: colors.deepBlue,
                '&:hover': {
                  bgcolor: '#1E4B8D',
                },
              }}
            >
              Join Our Team
            </Button>
          </Box>
        </Container>
      </SectionWrapper>
      
      {/* Contact Section */}
      <SectionWrapper>
        <Container maxWidth="lg">
          <SectionTitle variant="h4">
            Get in Touch
          </SectionTitle>
          <Typography variant="body1" color="textSecondary" align="center" sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}>
            Have questions or suggestions? We'd love to hear from you!
          </Typography>
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              General Inquiries
            </Typography>
            <Typography variant="body1" paragraph>
              info@beuhouse.com
            </Typography>
            
            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Support
            </Typography>
            <Typography variant="body1" paragraph>
              support@beuhouse.com
            </Typography>
            
            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Business Partnerships
            </Typography>
            <Typography variant="body1" paragraph>
              partnerships@beuhouse.com
            </Typography>
            
            <Button
              component={RouterLink}
              to="/contact"
              variant="contained"
              size="large"
              sx={{ 
                mt: 4,
                bgcolor: colors.deepBlue,
                '&:hover': {
                  bgcolor: '#1E4B8D',
                },
              }}
            >
              Contact Us
            </Button>
          </Box>
        </Container>
      </SectionWrapper>
    </Box>
  );
};

export default About;
