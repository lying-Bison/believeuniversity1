import axios from 'axios';
import { Cryptocurrency } from '../types';

// Create an axios instance with default config
const api = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Cryptocurrency API services
export const cryptoApi = {
  // Get trending cryptocurrencies
  getTrending: async (): Promise<Cryptocurrency[]> => {
    try {
      const response = await api.get('/search/trending');
      return response.data.coins.map((coin: any) => ({
        id: coin.item.id,
        name: coin.item.name,
        symbol: coin.item.symbol,
        logo: coin.item.large,
        currentPrice: 0, // Will be populated in another call
        marketCap: 0,
        volume24h: 0,
        circulatingSupply: 0,
        totalSupply: 0,
        priceChange24h: 0,
        priceChangePercentage24h: 0,
        sparklineData: [],
        isMeme: coin.item.name.toLowerCase().includes('meme') || 
                coin.item.name.toLowerCase().includes('dog') || 
                coin.item.name.toLowerCase().includes('shib') || 
                coin.item.name.toLowerCase().includes('pepe'),
      }));
    } catch (error) {
      console.error('Error fetching trending cryptocurrencies:', error);
      return [];
    }
  },

  // Get top cryptocurrencies by market cap
  getTopCryptos: async (limit: number = 50): Promise<Cryptocurrency[]> => {
    try {
      const response = await api.get('/coins/markets', {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: limit,
          page: 1,
          sparkline: true,
          price_change_percentage: '24h',
        },
      });
      
      return response.data.map((coin: any) => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol.toUpperCase(),
        logo: coin.image,
        currentPrice: coin.current_price,
        marketCap: coin.market_cap,
        volume24h: coin.total_volume,
        circulatingSupply: coin.circulating_supply,
        totalSupply: coin.total_supply,
        priceChange24h: coin.price_change_24h,
        priceChangePercentage24h: coin.price_change_percentage_24h,
        sparklineData: coin.sparkline_in_7d?.price || [],
        isMeme: coin.name.toLowerCase().includes('meme') || 
                coin.name.toLowerCase().includes('dog') || 
                coin.name.toLowerCase().includes('shib') || 
                coin.name.toLowerCase().includes('pepe'),
      }));
    } catch (error) {
      console.error('Error fetching top cryptocurrencies:', error);
      return [];
    }
  },

  // Get meme coins
  getMemeCryptos: async (limit: number = 20): Promise<Cryptocurrency[]> => {
    try {
      // First get a larger list of coins
      const allCoins = await cryptoApi.getTopCryptos(100);
      
      // Filter for potential meme coins based on name or other attributes
      const memeCoins = allCoins.filter(coin => 
        coin.isMeme || 
        coin.name.toLowerCase().includes('doge') ||
        coin.name.toLowerCase().includes('shiba') ||
        coin.name.toLowerCase().includes('floki') ||
        coin.name.toLowerCase().includes('pepe') ||
        coin.name.toLowerCase().includes('cat') ||
        coin.symbol.toLowerCase().includes('meme')
      );
      
      return memeCoins.slice(0, limit);
    } catch (error) {
      console.error('Error fetching meme cryptocurrencies:', error);
      return [];
    }
  },

  // Get cryptocurrency details
  getCryptoDetails: async (id: string): Promise<Cryptocurrency | null> => {
    try {
      const response = await api.get(`/coins/${id}`, {
        params: {
          localization: false,
          tickers: false,
          market_data: true,
          community_data: false,
          developer_data: false,
          sparkline: true,
        },
      });
      
      const coin = response.data;
      
      return {
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol.toUpperCase(),
        logo: coin.image.large,
        currentPrice: coin.market_data.current_price.usd,
        marketCap: coin.market_data.market_cap.usd,
        volume24h: coin.market_data.total_volume.usd,
        circulatingSupply: coin.market_data.circulating_supply,
        totalSupply: coin.market_data.total_supply,
        priceChange24h: coin.market_data.price_change_24h,
        priceChangePercentage24h: coin.market_data.price_change_percentage_24h,
        sparklineData: coin.market_data.sparkline_7d?.price || [],
        isMeme: coin.name.toLowerCase().includes('meme') || 
                coin.name.toLowerCase().includes('dog') || 
                coin.name.toLowerCase().includes('shib') || 
                coin.name.toLowerCase().includes('pepe'),
      };
    } catch (error) {
      console.error(`Error fetching details for cryptocurrency ${id}:`, error);
      return null;
    }
  },

  // Get cryptocurrency historical data
  getCryptoHistory: async (id: string, days: number = 30): Promise<any> => {
    try {
      const response = await api.get(`/coins/${id}/market_chart`, {
        params: {
          vs_currency: 'usd',
          days: days,
        },
      });
      
      return {
        prices: response.data.prices,
        marketCaps: response.data.market_caps,
        totalVolumes: response.data.total_volumes,
      };
    } catch (error) {
      console.error(`Error fetching historical data for cryptocurrency ${id}:`, error);
      return null;
    }
  },
};

export default api;
