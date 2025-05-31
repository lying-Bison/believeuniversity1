import React from 'react';
import { Box, Typography, Container, Button, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #121212 0%, #1E1E1E 100%)',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            BEUhouse
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            A platform focused on cryptocurrency education, speculative trading, and community-driven investments.
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button variant="contained" color="primary" size="large" sx={{ mr: 2 }}>
              Learn More
            </Button>
            <Button variant="outlined" color="primary" size="large">
              Join Community
            </Button>
          </Box>
          <Typography variant="body2" sx={{ mt: 8, opacity: 0.7 }}>
            © {new Date().getFullYear()} BEUhouse. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
