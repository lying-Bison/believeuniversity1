import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Search,
  TrendingUp,
  TrendingDown,
  Star,
  StarBorder,
  Refresh,
} from '@mui/icons-material';
import styled from 'styled-components';
import { colors } from '../styles/theme';
import { useCrypto } from '../context/CryptoContext';
import { Cryptocurrency } from '../types';

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

const StyledTableContainer = styled(TableContainer)`
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease;
  
  &:hover {
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  }
`;

const StyledTableHead = styled(TableHead)`
  background-color: ${colors.deepBlue};
  
  .MuiTableCell-head {
    color: ${colors.white};
    font-weight: 700;
    font-size: 0.95rem;
    padding: 16px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
`;

const StyledTableRow = styled(TableRow)`
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  
  &:hover {
    background-color: rgba(10, 45, 90, 0.05);
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    z-index: 1;
    position: relative;
  }
  
  .MuiTableCell-root {
    padding: 16px;
    font-size: 0.95rem;
  }
`;

const PriceChangeChip = styled(Chip)<{ change: 'positive' | 'negative' | 'neutral' }>`
  background-color: ${props => {
    switch (props.change) {
      case 'positive':
        return 'rgba(0, 166, 81, 0.1)';
      case 'negative':
        return 'rgba(211, 47, 47, 0.1)';
      default:
        return 'rgba(158, 158, 158, 0.1)';
    }
  }};
  color: ${props => {
    switch (props.change) {
      case 'positive':
        return '#00A651';
      case 'negative':
        return '#D32F2F';
      default:
        return '#9E9E9E';
    }
  }};
  font-weight: 700;
  border: 1px solid ${props => {
    switch (props.change) {
      case 'positive':
        return 'rgba(0, 166, 81, 0.3)';
      case 'negative':
        return 'rgba(211, 47, 47, 0.3)';
      default:
        return 'rgba(158, 158, 158, 0.3)';
    }
  }};
  padding: 4px;
  height: 28px;
  
  .MuiChip-label {
    padding: 0 8px;
  }
  
  .MuiChip-icon {
    margin-left: 6px;
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

const Tracker: React.FC = () => {
  const { topCryptos, memeCryptos, loading, error, refreshData } = useCrypto();
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  const toggleWatchlist = (coinId: string) => {
    if (watchlist.includes(coinId)) {
      setWatchlist(watchlist.filter(id => id !== coinId));
    } else {
      setWatchlist([...watchlist, coinId]);
    }
  };
  
  const getDisplayedCryptos = () => {
    let cryptos;
    
    switch (tabValue) {
      case 0:
        cryptos = topCryptos;
        break;
      case 1:
        cryptos = memeCryptos;
        break;
      case 2:
        cryptos = [...topCryptos, ...memeCryptos].filter(crypto => watchlist.includes(crypto.id));
        break;
      default:
        cryptos = topCryptos;
    }
    
    if (searchTerm) {
      return cryptos.filter(crypto => 
        crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return cryptos;
  };
  
  const displayedCryptos = getDisplayedCryptos();
  
  return (
    <Box>
      {/* Hero Section */}
      <HeroWrapper>
        <Container maxWidth="lg">
          <HeroContent>
            <Typography variant="h6" sx={{ color: colors.vibrantYellow, mb: 1 }}>
              @BEUhouse Crypto Tracker
            </Typography>
            <Typography variant="h3" sx={{ fontFamily: '"Bebas Neue", sans-serif', mb: 2 }}>
              Real-Time Cryptocurrency Prices
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.9, maxWidth: 700 }}>
              Stay updated with real-time prices and market data for major cryptocurrencies and popular meme coins. Track your favorite coins and monitor market trends.
            </Typography>
          </HeroContent>
        </Container>
      </HeroWrapper>
      
      {/* Tracker Section */}
      <SectionWrapper>
        <Container maxWidth="lg">
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <TextField
              placeholder="Search cryptocurrencies..."
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ minWidth: 300, flex: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={refreshData}
              sx={{ 
                borderColor: colors.deepBlue,
                color: colors.deepBlue,
                '&:hover': {
                  borderColor: colors.vibrantYellow,
                  backgroundColor: 'rgba(240, 193, 75, 0.1)',
                },
              }}
            >
              Refresh Data
            </Button>
          </Box>
          
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="crypto tabs">
              <Tab label="Top Cryptocurrencies" />
              <Tab label="Meme Coins" />
              <Tab label="Watchlist" />
            </Tabs>
          </Box>
          
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
              <CircularProgress sx={{ color: colors.deepBlue }} />
            </Box>
          ) : displayedCryptos.length > 0 ? (
            <StyledTableContainer as={Paper}>
              <Table>
                <StyledTableHead>
                  <TableRow>
                    <TableCell width="50">#</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">24h %</TableCell>
                    <TableCell align="right">7d %</TableCell>
                    <TableCell align="right">Market Cap</TableCell>
                    <TableCell align="right">Volume (24h)</TableCell>
                    <TableCell align="center">Watchlist</TableCell>
                  </TableRow>
                </StyledTableHead>
                <TableBody>
                  {displayedCryptos.map((crypto, index) => (
                    <StyledTableRow key={crypto.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box
                            component="img"
                            src={crypto.logo || `/images/crypto/${crypto.symbol.toLowerCase()}.png`}
                            alt={crypto.name}
                            sx={{ width: 24, height: 24, mr: 1 }}
                          />
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {crypto.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                            {crypto.symbol.toUpperCase()}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          ${crypto.currentPrice.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <PriceChangeChip
                          label={`${crypto.priceChangePercentage24h.toFixed(2)}%`}
                          size="small"
                          change={crypto.priceChangePercentage24h > 0 ? 'positive' : crypto.priceChangePercentage24h < 0 ? 'negative' : 'neutral'}
                          icon={crypto.priceChangePercentage24h > 0 ? <TrendingUp fontSize="small" /> : <TrendingDown fontSize="small" />}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <PriceChangeChip
                          label={`${(crypto.priceChangePercentage24h * 0.7).toFixed(2)}%`}
                          size="small"
                          change={(crypto.priceChangePercentage24h * 0.7) > 0 ? 'positive' : (crypto.priceChangePercentage24h * 0.7) < 0 ? 'negative' : 'neutral'}
                          icon={(crypto.priceChangePercentage24h * 0.7) > 0 ? <TrendingUp fontSize="small" /> : <TrendingDown fontSize="small" />}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2">
                          ${crypto.marketCap.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2">
                          ${crypto.volume24h.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton onClick={() => toggleWatchlist(crypto.id)}>
                          {watchlist.includes(crypto.id) ? (
                            <Star sx={{ color: colors.vibrantYellow }} />
                          ) : (
                            <StarBorder />
                          )}
                        </IconButton>
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </StyledTableContainer>
          ) : (
            <Box sx={{ textAlign: 'center', py: 5 }}>
              <Typography variant="h6" color="text.secondary">
                {tabValue === 2 ? 'No coins in your watchlist yet' : 'No cryptocurrencies found'}
              </Typography>
              {tabValue === 2 && (
                <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                  Add coins to your watchlist by clicking the star icon
                </Typography>
              )}
            </Box>
          )}
        </Container>
      </SectionWrapper>
    </Box>
  );
};

export default Tracker;
