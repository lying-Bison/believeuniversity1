import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Slider,
  Chip,
  Avatar,
  Divider,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  CircularProgress,
  useTheme,
  useMediaQuery,
  SelectChangeEvent,
} from '@mui/material';
import {
  AddCircle,
  RemoveCircle,
  Timeline,
  ArrowDropUp,
  ArrowDropDown,
  Info,
  DeleteOutline,
  RestartAlt,
  BarChart,
} from '@mui/icons-material';
import { Pie } from 'react-chartjs-2';
import styled from 'styled-components';
import { useCrypto } from '../context/CryptoContext';
import { Cryptocurrency, PortfolioHolding } from '../types';
import { colors } from '../styles/theme';

const SimulatorWrapper = styled(Box)`
  padding: 3rem 0;
`;

const SimulatorTitle = styled(Typography)`
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

const StyledCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
`;

const BalanceCard = styled(StyledCard)`
  background: linear-gradient(135deg, ${colors.deepBlue} 0%, #1E4B8D 100%);
  color: ${colors.white};
`;

const ProfitLossCard = styled(StyledCard)<{ ispositive: boolean }>`
  background: ${props => props.ispositive 
    ? `linear-gradient(135deg, ${colors.green} 0%, #00C967 100%)`
    : `linear-gradient(135deg, ${colors.red} 0%, #FF5252 100%)`};
  color: ${colors.white};
`;

const StyledTableContainer = styled(TableContainer)`
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

const InvestmentSimulator: React.FC = () => {
  const { topCryptos, memeCryptos, loading } = useCrypto();
  const [initialInvestment, setInitialInvestment] = useState<number>(10000);
  const [availableBalance, setAvailableBalance] = useState<number>(10000);
  const [selectedCrypto, setSelectedCrypto] = useState<string>('');
  const [investmentAmount, setInvestmentAmount] = useState<number>(0);
  const [holdings, setHoldings] = useState<PortfolioHolding[]>([]);
  const [totalPortfolioValue, setTotalPortfolioValue] = useState<number>(0);
  const [profitLoss, setProfitLoss] = useState<number>(0);
  const [profitLossPercentage, setProfitLossPercentage] = useState<number>(0);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Combine top and meme cryptos for selection
  const allCryptos = [...topCryptos, ...memeCryptos.filter(meme => 
    !topCryptos.some(top => top.id === meme.id)
  )];
  
  // Update total portfolio value whenever holdings change
  useEffect(() => {
    const totalValue = holdings.reduce((sum, holding) => sum + holding.currentValue, 0);
    setTotalPortfolioValue(totalValue);
    
    const newProfitLoss = totalValue + availableBalance - initialInvestment;
    setProfitLoss(newProfitLoss);
    
    const newProfitLossPercentage = initialInvestment > 0 
      ? (newProfitLoss / initialInvestment) * 100 
      : 0;
    setProfitLossPercentage(newProfitLossPercentage);
  }, [holdings, availableBalance, initialInvestment]);
  
  const handleInitialInvestmentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value) && value >= 0) {
      const difference = value - initialInvestment;
      setInitialInvestment(value);
      setAvailableBalance(prevBalance => prevBalance + difference);
    }
  };
  
  const handleCryptoChange = (event: SelectChangeEvent) => {
    setSelectedCrypto(event.target.value);
    setInvestmentAmount(0);
  };
  
  const handleInvestmentAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value) && value >= 0 && value <= availableBalance) {
      setInvestmentAmount(value);
    }
  };
  
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    const value = newValue as number;
    setInvestmentAmount(value);
  };
  
  const handleBuy = () => {
    if (selectedCrypto && investmentAmount > 0 && investmentAmount <= availableBalance) {
      const crypto = allCryptos.find(c => c.id === selectedCrypto);
      
      if (crypto) {
        const amount = investmentAmount / crypto.currentPrice;
        const existingHoldingIndex = holdings.findIndex(h => h.cryptocurrency.id === crypto.id);
        
        if (existingHoldingIndex !== -1) {
          // Update existing holding
          const existingHolding = holdings[existingHoldingIndex];
          const newAmount = existingHolding.amount + amount;
          const newAverageBuyPrice = (existingHolding.amount * existingHolding.averageBuyPrice + investmentAmount) / newAmount;
          const newCurrentValue = newAmount * crypto.currentPrice;
          const newProfitLoss = newCurrentValue - (newAmount * newAverageBuyPrice);
          const newProfitLossPercentage = (newProfitLoss / (newAmount * newAverageBuyPrice)) * 100;
          
          const updatedHolding: PortfolioHolding = {
            ...existingHolding,
            amount: newAmount,
            averageBuyPrice: newAverageBuyPrice,
            currentValue: newCurrentValue,
            profitLoss: newProfitLoss,
            profitLossPercentage: newProfitLossPercentage,
          };
          
          const newHoldings = [...holdings];
          newHoldings[existingHoldingIndex] = updatedHolding;
          setHoldings(newHoldings);
        } else {
          // Create new holding
          const newHolding: PortfolioHolding = {
            id: `holding-${Date.now()}`,
            cryptocurrency: crypto,
            amount,
            averageBuyPrice: crypto.currentPrice,
            currentValue: investmentAmount,
            profitLoss: 0,
            profitLossPercentage: 0,
          };
          
          setHoldings([...holdings, newHolding]);
        }
        
        // Update available balance
        setAvailableBalance(prevBalance => prevBalance - investmentAmount);
        
        // Reset form
        setInvestmentAmount(0);
      }
    }
  };
  
  const handleSell = (holdingId: string, sellPercentage: number = 100) => {
    const holdingIndex = holdings.findIndex(h => h.id === holdingId);
    
    if (holdingIndex !== -1) {
      const holding = holdings[holdingIndex];
      const sellAmount = (holding.amount * sellPercentage) / 100;
      const sellValue = sellAmount * holding.cryptocurrency.currentPrice;
      
      // Update available balance
      setAvailableBalance(prevBalance => prevBalance + sellValue);
      
      if (sellPercentage === 100) {
        // Remove holding completely
        setHoldings(holdings.filter(h => h.id !== holdingId));
      } else {
        // Update holding with remaining amount
        const remainingAmount = holding.amount - sellAmount;
        const newCurrentValue = remainingAmount * holding.cryptocurrency.currentPrice;
        const newProfitLoss = newCurrentValue - (remainingAmount * holding.averageBuyPrice);
        const newProfitLossPercentage = (newProfitLoss / (remainingAmount * holding.averageBuyPrice)) * 100;
        
        const updatedHolding: PortfolioHolding = {
          ...holding,
          amount: remainingAmount,
          currentValue: newCurrentValue,
          profitLoss: newProfitLoss,
          profitLossPercentage: newProfitLossPercentage,
        };
        
        const newHoldings = [...holdings];
        newHoldings[holdingIndex] = updatedHolding;
        setHoldings(newHoldings);
      }
    }
  };
  
  const handleReset = () => {
    setHoldings([]);
    setAvailableBalance(initialInvestment);
    setSelectedCrypto('');
    setInvestmentAmount(0);
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };
  
  const formatCryptoAmount = (value: number) => {
    return value < 0.001
      ? value.toFixed(8)
      : value < 1
      ? value.toFixed(4)
      : value.toFixed(2);
  };
  
  // Prepare data for pie chart
  const pieChartData = {
    labels: holdings.map(h => h.cryptocurrency.symbol),
    datasets: [
      {
        data: holdings.map(h => h.currentValue),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#8AC249',
          '#EA80FC',
          '#607D8B',
          '#F44336',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          font: {
            size: 12,
          },
        },
      },
    },
  };
  
  return (
    <SimulatorWrapper>
      <Container maxWidth="lg">
        <SimulatorTitle variant="h4">Investment Simulator</SimulatorTitle>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
          Practice investing in cryptocurrencies with virtual money. Learn about risk and reward without real financial consequences.
        </Typography>
        
        <Grid container spacing={3}>
          {/* Portfolio Summary Cards */}
          <Grid item xs={12} sm={6} md={4}>
            <BalanceCard>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 1, opacity: 0.8 }}>
                  Initial Investment
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {formatCurrency(initialInvestment)}
                  </Typography>
                  <Tooltip title="Change your initial investment amount">
                    <IconButton size="small" sx={{ ml: 1, color: 'rgba(255, 255, 255, 0.7)' }}>
                      <Info fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
                <TextField
                  fullWidth
                  label="Change Initial Investment"
                  type="number"
                  value={initialInvestment}
                  onChange={handleInitialInvestmentChange}
                  variant="outlined"
                  InputProps={{
                    startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: colors.vibrantYellow,
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'rgba(255, 255, 255, 0.7)',
                    },
                    '& .MuiInputBase-input': {
                      color: colors.white,
                    },
                  }}
                />
              </CardContent>
            </BalanceCard>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <BalanceCard>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 1, opacity: 0.8 }}>
                  Available Balance
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                  {formatCurrency(availableBalance)}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  This is the amount you have available to invest in cryptocurrencies.
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                  <Chip
                    label={`${holdings.length} ${holdings.length === 1 ? 'Asset' : 'Assets'}`}
                    sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', color: colors.white }}
                  />
                  <Typography variant="body2" sx={{ ml: 1, opacity: 0.8 }}>
                    in your portfolio
                  </Typography>
                </Box>
              </CardContent>
            </BalanceCard>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <ProfitLossCard ispositive={profitLoss >= 0}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 1, opacity: 0.8 }}>
                  Total Profit/Loss
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {formatCurrency(profitLoss)}
                  </Typography>
                  {profitLoss !== 0 && (
                    <Box sx={{ ml: 2 }}>
                      {profitLoss > 0 ? <ArrowDropUp fontSize="large" /> : <ArrowDropDown fontSize="large" />}
                    </Box>
                  )}
                </Box>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {profitLossPercentage > 0 ? '+' : ''}{profitLossPercentage.toFixed(2)}%
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Portfolio Value: {formatCurrency(totalPortfolioValue + availableBalance)}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<RestartAlt />}
                    onClick={handleReset}
                    sx={{
                      color: colors.white,
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                      '&:hover': {
                        borderColor: colors.white,
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    Reset
                  </Button>
                </Box>
              </CardContent>
            </ProfitLossCard>
          </Grid>
          
          {/* Buy Crypto Form */}
          <Grid item xs={12} md={8}>
            <StyledCard>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 2, fontFamily: '"Bebas Neue", sans-serif' }}>
                  Buy Cryptocurrency
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel id="crypto-select-label">Select Cryptocurrency</InputLabel>
                      <Select
                        labelId="crypto-select-label"
                        value={selectedCrypto}
                        onChange={handleCryptoChange}
                        label="Select Cryptocurrency"
                      >
                        {loading ? (
                          <MenuItem disabled>Loading cryptocurrencies...</MenuItem>
                        ) : (
                          allCryptos.map(crypto => (
                            <MenuItem key={crypto.id} value={crypto.id}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar src={crypto.logo} alt={crypto.name} sx={{ width: 24, height: 24, mr: 1 }} />
                                <Typography variant="body1" component="span" sx={{ mr: 1 }}>
                                  {crypto.name}
                                </Typography>
                                <Typography variant="body2" component="span" color="textSecondary">
                                  ({crypto.symbol})
                                </Typography>
                                <Typography variant="body2" component="span" sx={{ ml: 'auto' }}>
                                  {formatCurrency(crypto.currentPrice)}
                                </Typography>
                              </Box>
                            </MenuItem>
                          ))
                        )}
                      </Select>
                    </FormControl>
                    
                    <TextField
                      fullWidth
                      label="Investment Amount"
                      type="number"
                      value={investmentAmount}
                      onChange={handleInvestmentAmountChange}
                      variant="outlined"
                      disabled={!selectedCrypto}
                      InputProps={{
                        startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                      }}
                      sx={{ mb: 2 }}
                    />
                    
                    <Slider
                      value={investmentAmount}
                      onChange={handleSliderChange}
                      min={0}
                      max={availableBalance}
                      step={availableBalance / 100}
                      disabled={!selectedCrypto}
                      sx={{ mb: 2 }}
                    />
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Button
                        variant="outlined"
                        onClick={() => setInvestmentAmount(availableBalance * 0.25)}
                        disabled={!selectedCrypto}
                      >
                        25%
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => setInvestmentAmount(availableBalance * 0.5)}
                        disabled={!selectedCrypto}
                      >
                        50%
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => setInvestmentAmount(availableBalance * 0.75)}
                        disabled={!selectedCrypto}
                      >
                        75%
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => setInvestmentAmount(availableBalance)}
                        disabled={!selectedCrypto}
                      >
                        100%
                      </Button>
                    </Box>
                    
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={handleBuy}
                      disabled={!selectedCrypto || investmentAmount <= 0 || investmentAmount > availableBalance}
                      sx={{ 
                        bgcolor: colors.deepBlue,
                        '&:hover': {
                          bgcolor: '#1E4B8D',
                        },
                      }}
                    >
                      Buy
                    </Button>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Box sx={{ height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {holdings.length > 0 ? (
                        <Pie data={pieChartData} options={pieChartOptions} />
                      ) : (
                        <Box sx={{ textAlign: 'center', color: 'text.secondary' }}>
                          <BarChart sx={{ fontSize: 60, opacity: 0.5, mb: 2 }} />
                          <Typography variant="body1">
                            Your portfolio allocation will appear here
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </StyledCard>
          </Grid>
          
          {/* Portfolio Stats */}
          <Grid item xs={12} md={4}>
            <StyledCard sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 2, fontFamily: '"Bebas Neue", sans-serif' }}>
                  Portfolio Stats
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="textSecondary">
                    Total Portfolio Value
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {formatCurrency(totalPortfolioValue + availableBalance)}
                  </Typography>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="textSecondary">
                    Invested Amount
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {formatCurrency(initialInvestment - availableBalance)}
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="textSecondary">
                    Available Cash
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {formatCurrency(availableBalance)}
                  </Typography>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="textSecondary">
                    Assets Owned
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {holdings.length}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Best Performing Asset
                  </Typography>
                  {holdings.length > 0 ? (
                    (() => {
                      const bestAsset = [...holdings].sort((a, b) => b.profitLossPercentage - a.profitLossPercentage)[0];
                      return (
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                          <Avatar src={bestAsset.cryptocurrency.logo} alt={bestAsset.cryptocurrency.name} sx={{ width: 24, height: 24, mr: 1 }} />
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {bestAsset.cryptocurrency.symbol}
                          </Typography>
                          <PercentageChip
                            ispositive={bestAsset.profitLossPercentage >= 0 ? 'true' : 'false'}
                            label={`${bestAsset.profitLossPercentage >= 0 ? '+' : ''}${bestAsset.profitLossPercentage.toFixed(2)}%`}
                            size="small"
                            sx={{ ml: 'auto' }}
                          />
                        </Box>
                      );
                    })()
                  ) : (
                    <Typography variant="body1" sx={{ fontStyle: 'italic', mt: 1 }}>
                      No assets yet
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>
          
          {/* Portfolio Holdings Table */}
          <Grid item xs={12}>
            <StyledTableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Asset</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Avg. Buy Price</TableCell>
                    <TableCell align="right">Current Price</TableCell>
                    <TableCell align="right">Current Value</TableCell>
                    <TableCell align="right">Profit/Loss</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {holdings.length > 0 ? (
                    holdings.map(holding => (
                      <TableRow key={holding.id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar src={holding.cryptocurrency.logo} alt={holding.cryptocurrency.name} sx={{ width: 24, height: 24, mr: 1 }} />
                            <Box>
                              <Typography variant="body1" component="span" sx={{ fontWeight: 600, mr: 1 }}>
                                {holding.cryptocurrency.name}
                              </Typography>
                              <Typography variant="body2" component="span" color="textSecondary">
                                {holding.cryptocurrency.symbol}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          {formatCryptoAmount(holding.amount)}
                        </TableCell>
                        <TableCell align="right">
                          {formatCurrency(holding.averageBuyPrice)}
                        </TableCell>
                        <TableCell align="right">
                          {formatCurrency(holding.cryptocurrency.currentPrice)}
                        </TableCell>
                        <TableCell align="right">
                          {formatCurrency(holding.currentValue)}
                        </TableCell>
                        <TableCell align="right">
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Typography variant="body2" sx={{ mr: 1 }}>
                              {formatCurrency(holding.profitLoss)}
                            </Typography>
                            <PercentageChip
                              ispositive={holding.profitLossPercentage >= 0 ? 'true' : 'false'}
                              label={`${holding.profitLossPercentage >= 0 ? '+' : ''}${holding.profitLossPercentage.toFixed(2)}%`}
                              size="small"
                            />
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Tooltip title="Sell 50%">
                              <IconButton
                                color="primary"
                                onClick={() => handleSell(holding.id, 50)}
                                size="small"
                              >
                                <RemoveCircle />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Sell 100%">
                              <IconButton
                                color="error"
                                onClick={() => handleSell(holding.id, 100)}
                                size="small"
                              >
                                <DeleteOutline />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                        <Typography variant="body1">
                          Your portfolio is empty. Start buying cryptocurrencies to build your portfolio.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </StyledTableContainer>
          </Grid>
        </Grid>
      </Container>
    </SimulatorWrapper>
  );
};

export default InvestmentSimulator;
