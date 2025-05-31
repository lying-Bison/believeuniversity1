import { createTheme } from '@mui/material/styles';

// Color palette from the requirements
const colors = {
  deepBlue: '#0A2D5A',
  vibrantYellow: '#F0C14B',
  neutralGray: '#3A3A3C',
  green: '#00A651',
  red: '#D32F2F',
  white: '#FFFFFF',
  black: '#000000',
  lightGray: '#F5F5F5',
};

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: colors.deepBlue,
      light: '#1E4B8D',
      dark: '#071D3B',
      contrastText: colors.white,
    },
    secondary: {
      main: colors.vibrantYellow,
      light: '#F7D47E',
      dark: '#D9A82C',
      contrastText: colors.deepBlue,
    },
    error: {
      main: colors.red,
    },
    success: {
      main: colors.green,
    },
    background: {
      default: colors.lightGray,
      paper: colors.white,
    },
    text: {
      primary: colors.deepBlue,
      secondary: colors.neutralGray,
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Bebas Neue", sans-serif',
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '0.02em',
      color: colors.deepBlue,
    },
    h2: {
      fontFamily: '"Bebas Neue", sans-serif',
      fontSize: '2rem',
      fontWeight: 700,
      letterSpacing: '0.02em',
    },
    h3: {
      fontFamily: '"Bebas Neue", sans-serif',
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontFamily: '"Bebas Neue", sans-serif',
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontFamily: '"Bebas Neue", sans-serif',
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontFamily: '"Bebas Neue", sans-serif',
      fontSize: '1rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          },
        },
        containedPrimary: {
          background: `linear-gradient(135deg, ${colors.deepBlue} 0%, #1E4B8D 100%)`,
        },
        containedSecondary: {
          background: `linear-gradient(135deg, ${colors.vibrantYellow} 0%, #D9A82C 100%)`,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
          overflow: 'hidden',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

export default theme;
export { colors };
