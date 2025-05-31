import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { cryptoApi } from '../services/api';
import { Cryptocurrency } from '../types';

interface CryptoContextType {
  trendingCryptos: Cryptocurrency[];
  topCryptos: Cryptocurrency[];
  memeCryptos: Cryptocurrency[];
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  getCryptoDetails: (id: string) => Promise<Cryptocurrency | null>;
  getCryptoHistory: (id: string, days: number) => Promise<any>;
}

const CryptoContext = createContext<CryptoContextType | undefined>(undefined);

export const useCrypto = () => {
  const context = useContext(CryptoContext);
  if (context === undefined) {
    throw new Error('useCrypto must be used within a CryptoProvider');
  }
  return context;
};

interface CryptoProviderProps {
  children: ReactNode;
}

export const CryptoProvider: React.FC<CryptoProviderProps> = ({ children }) => {
  const [trendingCryptos, setTrendingCryptos] = useState<Cryptocurrency[]>([]);
  const [topCryptos, setTopCryptos] = useState<Cryptocurrency[]>([]);
  const [memeCryptos, setMemeCryptos] = useState<Cryptocurrency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [trending, top, meme] = await Promise.all([
        cryptoApi.getTrending(),
        cryptoApi.getTopCryptos(50),
        cryptoApi.getMemeCryptos(20)
      ]);
      
      setTrendingCryptos(trending);
      setTopCryptos(top);
      setMemeCryptos(meme);
    } catch (err) {
      setError('Failed to fetch cryptocurrency data. Please try again later.');
      console.error('Error fetching crypto data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Refresh data every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const refreshData = async () => {
    await fetchData();
  };

  const getCryptoDetails = async (id: string) => {
    return await cryptoApi.getCryptoDetails(id);
  };

  const getCryptoHistory = async (id: string, days: number = 30) => {
    return await cryptoApi.getCryptoHistory(id, days);
  };

  const value = {
    trendingCryptos,
    topCryptos,
    memeCryptos,
    loading,
    error,
    refreshData,
    getCryptoDetails,
    getCryptoHistory
  };

  return (
    <CryptoContext.Provider value={value}>
      {children}
    </CryptoContext.Provider>
  );
};

export default CryptoContext;
