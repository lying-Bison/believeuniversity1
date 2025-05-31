import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Button, Container, Grid, useTheme, useMediaQuery } from '@mui/material';
import styled from 'styled-components';
import { colors } from '../styles/theme';

const HeroWrapper = styled(Box)`
  position: relative;
  background: linear-gradient(135deg, ${colors.deepBlue} 0%, #071D3B 100%);
  color: ${colors.white};
  overflow: hidden;
  padding: 6rem 0;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('/images/crypto-pattern.svg');
    background-size: cover;
    opacity: 0.1;
    z-index: 0;
  }
`;

const GradientText = styled(Typography)`
  background: linear-gradient(135deg, ${colors.white} 0%, ${colors.vibrantYellow} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;

const HeroTitle = styled(Typography)`
  font-family: 'Bebas Neue', sans-serif;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
`;

const HeroSubtitle = styled(Typography)`
  margin-bottom: 2rem;
  max-width: 600px;
`;

const PrimaryButton = styled(Button)`
  background: linear-gradient(135deg, ${colors.vibrantYellow} 0%, #D9A82C 100%);
  color: ${colors.deepBlue};
  font-weight: 600;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  margin-right: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, #D9A82C 0%, ${colors.vibrantYellow} 100%);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const SecondaryButton = styled(Button)`
  color: ${colors.white};
  border: 2px solid ${colors.vibrantYellow};
  font-weight: 600;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
  
  &:hover {
    background-color: rgba(240, 193, 75, 0.1);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const HeroImage = styled(Box)`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FloatingCoin = styled(Box)<{ delay: string }>`
  position: absolute;
  animation: float 6s infinite ease-in-out;
  animation-delay: ${props => props.delay};
  
  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
    100% {
      transform: translateY(0px);
    }
  }
`;

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title = "Educating the Next Generation of Crypto Investors",
  subtitle = "Join the @BEUhouse community to learn about cryptocurrency investments, speculative trading strategies, and the exciting world of meme coins in a safe, educational environment.",
  primaryButtonText = "Start Learning",
  primaryButtonLink = "/education",
  secondaryButtonText = "Join Community",
  secondaryButtonLink = "/community",
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  return (
    <HeroWrapper>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <GradientText variant="h6" gutterBottom>
                @BEUhouse
              </GradientText>
              <HeroTitle variant={isMobile ? 'h3' : 'h2'}>
                {title}
              </HeroTitle>
              <HeroSubtitle variant="body1">
                {subtitle}
              </HeroSubtitle>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <PrimaryButton 
                  component={RouterLink} 
                  to={primaryButtonLink} 
                  variant="contained" 
                  size="large"
                >
                  {primaryButtonText}
                </PrimaryButton>
                <SecondaryButton 
                  component={RouterLink} 
                  to={secondaryButtonLink} 
                  variant="outlined" 
                  size="large"
                >
                  {secondaryButtonText}
                </SecondaryButton>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <HeroImage>
              {/* Placeholder for hero image - in a real implementation, replace with actual images */}
              <Box
                component="img"
                src="/images/hero-illustration.png"
                alt="Cryptocurrency Education"
                sx={{
                  maxWidth: '100%',
                  height: 'auto',
                  filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2))',
                }}
              />
              <FloatingCoin 
                delay="0s"
                sx={{ 
                  top: '10%', 
                  left: '10%',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, #F7931A 0%, #FFAE34 100%)`,
                  boxShadow: '0 5px 15px rgba(247, 147, 26, 0.4)',
                }}
              />
              <FloatingCoin 
                delay="1s"
                sx={{ 
                  top: '20%', 
                  right: '15%',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, #627EEA 0%, #8CA3F4 100%)`,
                  boxShadow: '0 5px 15px rgba(98, 126, 234, 0.4)',
                }}
              />
              <FloatingCoin 
                delay="2s"
                sx={{ 
                  bottom: '15%', 
                  left: '20%',
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, #345D9D 0%, #517AC9 100%)`,
                  boxShadow: '0 5px 15px rgba(52, 93, 157, 0.4)',
                }}
              />
              <FloatingCoin 
                delay="1.5s"
                sx={{ 
                  bottom: '25%', 
                  right: '10%',
                  width: '45px',
                  height: '45px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${colors.vibrantYellow} 0%, #D9A82C 100%)`,
                  boxShadow: `0 5px 15px rgba(240, 193, 75, 0.4)`,
                }}
              />
            </HeroImage>
          </Grid>
        </Grid>
      </Container>
    </HeroWrapper>
  );
};

export default HeroSection;
