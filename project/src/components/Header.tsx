import React from 'react';
import { Leaf, Wallet, BarChart3, Award } from 'lucide-react';

interface HeaderProps {
  currentView: 'home' | 'dashboard' | 'scorecard';
  setCurrentView: (view: 'home' | 'dashboard' | 'scorecard') => void;
  isConnected: boolean;
  setIsConnected: (connected: boolean) => void;
  totalTokens: number;
}

export const Header: React.FC<HeaderProps> = ({ 
  currentView, 
  setCurrentView, 
  isConnected, 
  setIsConnected,
  totalTokens 
}) => {
  const handleWalletConnect = () => {
    // Simulate wallet connection
    setIsConnected(!isConnected);
  };

  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-eco-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setCurrentView('home')}
          >
            <div className="p-2 bg-gradient-to-br from-eco-500 to-ocean-500 rounded-xl group-hover:scale-110 transition-transform">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-eco-600 to-ocean-600 bg-clip-text text-transparent">
                EcoSoul
              </h1>
              <p className="text-sm text-gray-600">AI Carbon Tracker</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => setCurrentView('home')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                currentView === 'home' 
                  ? 'bg-eco-100 text-eco-700' 
                  : 'text-gray-600 hover:text-eco-600 hover:bg-eco-50'
              }`}
            >
              <Leaf className="w-4 h-4" />
              <span>Track</span>
            </button>
            
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                currentView === 'dashboard' 
                  ? 'bg-eco-100 text-eco-700' 
                  : 'text-gray-600 hover:text-eco-600 hover:bg-eco-50'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
            
            <button
              onClick={() => setCurrentView('scorecard')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                currentView === 'scorecard' 
                  ? 'bg-eco-100 text-eco-700' 
                  : 'text-gray-600 hover:text-eco-600 hover:bg-eco-50'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Scorecard</span>
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            {isConnected && (
              <div className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-eco-100 to-ocean-100 px-4 py-2 rounded-lg">
                <div className="w-2 h-2 bg-eco-500 rounded-full animate-pulse"></div>
                <span className="font-semibold text-eco-700">{totalTokens} ECO</span>
              </div>
            )}
            
            <button
              onClick={handleWalletConnect}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                isConnected
                  ? 'bg-gradient-to-r from-eco-500 to-ocean-500 text-white hover:shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Wallet className="w-4 h-4" />
              <span className="hidden sm:inline">
                {isConnected ? 'Connected' : 'Connect Wallet'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};