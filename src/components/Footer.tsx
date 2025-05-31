import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Button,
  TextField,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  YouTube,
  Telegram,
  Reddit,
  Send,
} from '@mui/icons-material';
import styled from 'styled-components';
import { colors } from '../styles/theme';

const FooterWrapper = styled(Box)`
  background: linear-gradient(135deg, ${colors.deepBlue} 0%, #071D3B 100%);
  color: ${colors.white};
  padding: 4rem 0 2rem;
`;

const FooterTitle = styled(Typography)`
  font-family: 'Bebas Neue', sans-serif;
  margin-bottom: 1.5rem;
  position: relative;
  
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

const FooterLink = styled(Link).attrs({ as: 'a' })`
  color: ${colors.white};
  margin-bottom: 0.5rem;
  display: block;
  transition: color 0.3s ease, transform 0.3s ease;
  
  &:hover {
    color: ${colors.vibrantYellow};
    transform: translateX(5px);
  }
`;

const SocialIconButton = styled(IconButton)`
  color: ${colors.white};
  margin-right: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${colors.vibrantYellow};
    transform: translateY(-3px);
  }
`;

const NewsletterForm = styled(Box)`
  display: flex;
  margin-top: 1rem;
`;

const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 8px 0 0 8px;
    
    fieldset {
      border-color: rgba(255, 255, 255, 0.2);
    }
    
    &:hover fieldset {
      border-color: rgba(255, 255, 255, 0.3);
    }
    
    &.Mui-focused fieldset {
      border-color: ${colors.vibrantYellow};
    }
  }
  
  .MuiInputLabel-root {
    color: rgba(255, 255, 255, 0.7);
  }
  
  .MuiInputBase-input {
    color: ${colors.white};
  }
`;

const SubscribeButton = styled(Button)`
  background-color: ${colors.vibrantYellow};
  color: ${colors.deepBlue};
  border-radius: 0 8px 8px 0;
  padding: 0.5rem 1rem;
  
  &:hover {
    background-color: #D9A82C;
  }
`;

const LogoText = styled(Typography)`
  font-family: 'Bebas Neue', sans-serif;
  letter-spacing: 1px;
  background: linear-gradient(135deg, ${colors.white} 0%, ${colors.vibrantYellow} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  margin-bottom: 1rem;
`;

const Footer: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription submitted');
  };
  
  return (
    <FooterWrapper>
      <Container maxWidth="lg">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 4, mb: 4 }}>
          {/* Logo and About */}
          <Box>
            <LogoText variant="h4">@BEUhouse</LogoText>
            <Typography variant="body2" sx={{ mb: 3, color: 'rgba(255, 255, 255, 0.7)' }}>
              A platform focused on cryptocurrency education, speculative trading, and community-driven investments, particularly emphasizing meme coins.
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              <SocialIconButton aria-label="Facebook" size="small">
                <Facebook />
              </SocialIconButton>
              <SocialIconButton aria-label="Twitter" size="small">
                <Twitter />
              </SocialIconButton>
              <SocialIconButton aria-label="Instagram" size="small">
                <Instagram />
              </SocialIconButton>
              <SocialIconButton aria-label="LinkedIn" size="small">
                <LinkedIn />
              </SocialIconButton>
              <SocialIconButton aria-label="Telegram" size="small">
                <Telegram />
              </SocialIconButton>
              <SocialIconButton aria-label="Reddit" size="small">
                <Reddit />
              </SocialIconButton>
            </Box>
          </Box>
          
          {/* Quick Links */}
          <Box>
            <FooterTitle variant="h6">Quick Links</FooterTitle>
            <FooterLink as={RouterLink} to="/">Home</FooterLink>
            <FooterLink as={RouterLink} to="/education">Education</FooterLink>
            <FooterLink as={RouterLink} to="/community">Community</FooterLink>
            <FooterLink as={RouterLink} to="/blog">Blog</FooterLink>
            <FooterLink as={RouterLink} to="/tracker">Crypto Tracker</FooterLink>
            <FooterLink as={RouterLink} to="/about">About Us</FooterLink>
          </Box>
          
          {/* Resources */}
          <Box>
            <FooterTitle variant="h6">Resources</FooterTitle>
            <FooterLink as={RouterLink} to="/glossary">Crypto Glossary</FooterLink>
            <FooterLink as={RouterLink} to="/faq">FAQ</FooterLink>
            <FooterLink as={RouterLink} to="/tutorials">Tutorials</FooterLink>
            <FooterLink as={RouterLink} to="/events">Events</FooterLink>
            <FooterLink as={RouterLink} to="/simulator">Investment Simulator</FooterLink>
            <FooterLink as={RouterLink} to="/contact">Contact Us</FooterLink>
          </Box>
          
          {/* Newsletter */}
          <Box>
            <FooterTitle variant="h6">Newsletter</FooterTitle>
            <Typography variant="body2" sx={{ mb: 2, color: 'rgba(255, 255, 255, 0.7)' }}>
              Subscribe to our newsletter to receive the latest updates, educational content, and crypto insights.
            </Typography>
            <form onSubmit={handleSubscribe}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <StyledTextField
                  label="Email Address"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                />
                <SubscribeButton type="submit" variant="contained" endIcon={<Send />}>
                  {!isSmall ? 'Subscribe' : <Send />}
                </SubscribeButton>
              </Box>
            </form>
          </Box>
        </Box>
        
        <Divider sx={{ my: 4, bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
        
        {/* Bottom Footer */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between', gap: 2, width: '100%' }}>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: { xs: 'center', md: 'left' } }}>
            © {new Date().getFullYear()} @BEUhouse. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-end' } }}>
            <Link href="/privacy" color="inherit" sx={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)' }}>
              Privacy Policy
            </Link>
            <Link href="/terms" color="inherit" sx={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)' }}>
              Terms of Service
            </Link>
            <Link href="/cookies" color="inherit" sx={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)' }}>
              Cookie Policy
            </Link>
          </Box>
        </Box>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
