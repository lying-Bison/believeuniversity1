import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Theme
import theme from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { CryptoProvider } from './context/CryptoContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Education from './pages/Education';
import Community from './pages/Community';
import Blog from './pages/Blog';
import Tracker from './pages/Tracker';
import About from './pages/About';

// Create a client for React Query
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <AuthProvider>
          <CryptoProvider>
            <Router>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/education" element={<Education />} />
                <Route path="/community" element={<Community />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/tracker" element={<Tracker />} />
                <Route path="/about" element={<About />} />
                {/* Add more routes as they are implemented */}
              </Routes>
              <Footer />
            </Router>
          </CryptoProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
