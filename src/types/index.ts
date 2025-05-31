// User types
export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  joinDate: Date;
  role: 'user' | 'moderator' | 'admin';
}

// Blog post types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: User;
  publishDate: Date;
  updatedDate?: Date;
  categories: string[];
  tags: string[];
  featuredImage?: string;
  readTime: number;
  likes: number;
  comments: Comment[];
}

// Comment types
export interface Comment {
  id: string;
  content: string;
  author: User;
  publishDate: Date;
  likes: number;
  replies?: Comment[];
}

// Forum types
export interface ForumCategory {
  id: string;
  name: string;
  description: string;
  topics: number;
  posts: number;
  lastPost?: ForumPost;
}

export interface ForumTopic {
  id: string;
  title: string;
  slug: string;
  author: User;
  category: ForumCategory;
  createdDate: Date;
  lastPostDate: Date;
  views: number;
  posts: number;
  isPinned: boolean;
  isLocked: boolean;
}

export interface ForumPost {
  id: string;
  content: string;
  author: User;
  topic: ForumTopic;
  publishDate: Date;
  updatedDate?: Date;
  likes: number;
}

// Cryptocurrency types
export interface Cryptocurrency {
  id: string;
  name: string;
  symbol: string;
  logo?: string;
  currentPrice: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  totalSupply: number;
  priceChange24h: number;
  priceChangePercentage24h: number;
  sparklineData?: number[];
  isMeme: boolean;
}

// Investment simulator types
export interface Portfolio {
  id: string;
  user: User;
  name: string;
  balance: number;
  initialInvestment: number;
  createdDate: Date;
  lastUpdated: Date;
  holdings: PortfolioHolding[];
  transactions: Transaction[];
}

export interface PortfolioHolding {
  id: string;
  cryptocurrency: Cryptocurrency;
  amount: number;
  averageBuyPrice: number;
  currentValue: number;
  profitLoss: number;
  profitLossPercentage: number;
}

export interface Transaction {
  id: string;
  portfolio: Portfolio;
  cryptocurrency: Cryptocurrency;
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  value: number;
  date: Date;
}

// Event types
export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  isVirtual: boolean;
  link?: string;
  organizer: User;
  attendees: User[];
}

// Glossary types
export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  relatedTerms?: string[];
  category: string;
}
