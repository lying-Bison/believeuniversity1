import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  CircularProgress,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Search,
  TrendingUp,
  ArrowDropUp,
  ArrowDropDown,
  Refresh,
} from '@mui/icons-material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import styled from 'styled-components';
import { useCrypto } from '../context/CryptoContext';
import { Cryptocurrency } from '../types';
import { colors } from '../styles/theme';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TrackerWrapper = styled(Box)`
  padding: 2rem 0;
`;

const TrackerHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const TrackerTitle = styled(Typography)`
  font-family: 'Bebas Neue', sans-serif;
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

const StyledTableContainer = styled(TableContainer).attrs({ as: 'div' })`
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  overflow: hidden;
  
  .MuiTableCell-head {
    background-color: ${colors.deepBlue};
    color: ${colors.white};
    font-weight: 600;
  }
  
  .MuiTableRow-root {
    transition: background-color 0.3s ease;
    
    &:hover {
      background-color: rgba(10, 45, 90, 0.05);
    }
  }
`;

const PercentageChip = styled(Chip)<{ ispositive: string }>`
  background-color: ${props => props.ispositive === 'true' ? 'rgba(0, 166, 81, 0.1)' : 'rgba(211, 47, 47, 0.1)'};
  color: ${props => props.ispositive === 'true' ? colors.green : colors.red};
  font-weight: 600;
  display: flex;
  align-items: center;
`;

const SparklineContainer = styled(Box)`
  width: 120px;
  height: 40px;
`;

const RefreshButton = styled(Button)`
  background-color: ${colors.deepBlue};
  color: ${colors.white};
  
  &:hover {
    background-color: #1E4B8D;
  }
`;

const CryptoTracker: React.FC = () => {
  const { topCryptos, memeCryptos, loading, error, refreshData } = useCrypto();
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [filteredCryptos, setFilteredCryptos] = useState<Cryptocurrency[]>([]);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  
  useEffect(() => {
    const cryptoList = tabValue === 0 ? topCryptos : memeCryptos;
    
    if (searchTerm.trim() === '') {
      setFilteredCryptos(cryptoList);
    } else {
      const filtered = cryptoList.filter(
        crypto =>
          crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCryptos(filtered);
    }
  }, [searchTerm, tabValue, topCryptos, memeCryptos]);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setSearchTerm('');
  };
  
  const handleRefresh = async () => {
    await refreshData();
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: value < 1 ? 4 : 2,
      maximumFractionDigits: value < 1 ? 6 : 2,
    }).format(value);
  };
  
  const formatLargeNumber = (value: number) => {
    if (value >= 1e9) {
      return `$${(value / 1e9).toFixed(2)}B`;
    } else if (value >= 1e6) {
      return `$${(value / 1e6).toFixed(2)}M`;
    } else if (value >= 1e3) {
      return `$${(value / 1e3).toFixed(2)}K`;
    } else {
      return `$${value.toFixed(2)}`;
    }
  };
  
  const renderSparkline = (data: number[] | undefined, isPositive: boolean) => {
    if (!data || data.length === 0) return null;
    
    const chartData = {
      labels: Array(data.length).fill(''),
      datasets: [
        {
          data,
          borderColor: isPositive ? colors.green : colors.red,
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          pointRadius: 0,
        },
      ],
    };
    
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
      },
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
        },
      },
    };
    
    return <Line data={chartData} options={options} />;
  };
  
  return (
    <TrackerWrapper>
      <Container maxWidth="lg">
        <TrackerHeader>
          <Box>
            <TrackerTitle variant="h4">Crypto Tracker</TrackerTitle>
            <Typography variant="body1" color="textSecondary">
              Real-time prices and market data for cryptocurrencies
            </Typography>
          </Box>
          <RefreshButton
            variant="contained"
            startIcon={<Refresh />}
            onClick={handleRefresh}
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </RefreshButton>
        </TrackerHeader>
        
        <Box sx={{ mb: 3 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
            sx={{ mb: 2 }}
          >
            <Tab label="Top Cryptocurrencies" />
            <Tab label="Meme Coins" />
          </Tabs>
          
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search by name or symbol..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
        </Box>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'rgba(211, 47, 47, 0.1)', color: colors.red }}>
            <Typography variant="body1">{error}</Typography>
            <Button variant="outlined" color="error" sx={{ mt: 2 }} onClick={handleRefresh}>
              Try Again
            </Button>
          </Paper>
        ) : (
          <StyledTableContainer as={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Price</TableCell>
                  {!isSmall && <TableCell align="right">24h %</TableCell>}
                  {!isMobile && <TableCell align="right">Market Cap</TableCell>}
                  {!isMobile && <TableCell align="right">Volume (24h)</TableCell>}
                  {!isSmall && <TableCell align="center">Last 7 Days</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCryptos.length > 0 ? (
                  filteredCryptos.map((crypto, index) => (
                    <TableRow key={crypto.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar src={crypto.logo} alt={crypto.name} sx={{ width: 24, height: 24, mr: 1 }} />
                          <Box>
                            <Typography variant="body1" component="span" sx={{ fontWeight: 600, mr: 1 }}>
                              {crypto.name}
                            </Typography>
                            <Typography variant="body2" component="span" color="textSecondary">
                              {crypto.symbol}
                            </Typography>
                            {crypto.isMeme && (
                              <Chip
                                label="Meme"
                                size="small"
                                sx={{
                                  ml: 1,
                                  bgcolor: 'rgba(240, 193, 75, 0.1)',
                                  color: colors.vibrantYellow,
                                  fontWeight: 600,
                                }}
                              />
                            )}
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {formatCurrency(crypto.currentPrice)}
                        </Typography>
                      </TableCell>
                      {!isSmall && (
                        <TableCell align="right">
                          <PercentageChip
                            ispositive={crypto.priceChangePercentage24h >= 0 ? 'true' : 'false'}
                            label={`${crypto.priceChangePercentage24h >= 0 ? '+' : ''}${crypto.priceChangePercentage24h.toFixed(2)}%`}
                            size="small"
                            icon={crypto.priceChangePercentage24h >= 0 ? <ArrowDropUp /> : <ArrowDropDown />}
                          />
                        </TableCell>
                      )}
                      {!isMobile && (
                        <TableCell align="right">
                          {formatLargeNumber(crypto.marketCap)}
                        </TableCell>
                      )}
                      {!isMobile && (
                        <TableCell align="right">
                          {formatLargeNumber(crypto.volume24h)}
                        </TableCell>
                      )}
                      {!isSmall && (
                        <TableCell align="center">
                          <SparklineContainer>
                            {renderSparkline(
                              crypto.sparklineData,
                              crypto.priceChangePercentage24h >= 0
                            )}
                          </SparklineContainer>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={isMobile ? 3 : 7} align="center">
                      <Typography variant="body1" sx={{ py: 2 }}>
                        No cryptocurrencies found matching "{searchTerm}"
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </StyledTableContainer>
        )}
      </Container>
    </TrackerWrapper>
  );
};

export default CryptoTracker;
