import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ActivityInput } from './components/ActivityInput';
import { Dashboard } from './components/Dashboard';
import { Scorecard } from './components/Scorecard';
import { Footer } from './components/Footer';
import { WalletProvider } from './providers/WalletProvider';
import { useLocalStorage } from './hooks/useLocalStorage';

export interface ActivityLog {
  id: string;
  date: string;
  activity: string;
  emissions: number;
  tokensEarned: number;
}

export interface UserStats {
  totalEmissions: number;
  totalTokens: number;
  streak: number;
  achievements: string[];
  weeklyData: Array<{ day: string; emissions: number; savings: number }>;
}

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'dashboard' | 'scorecard'>('home');
  const [activityLogs, setActivityLogs] = useLocalStorage<ActivityLog[]>('ecosoul-activities', []);
  const [userStats, setUserStats] = useLocalStorage<UserStats>('ecosoul-stats', {
    totalEmissions: 0,
    totalTokens: 0,
    streak: 0,
    achievements: [],
    weeklyData: []
  });
  const [isConnected, setIsConnected] = useState(false);

  const handleActivitySubmit = (activity: string, emissions: number) => {
    const tokensEarned = calculateTokens(emissions);
    const newLog: ActivityLog = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      activity,
      emissions,
      tokensEarned
    };

    setActivityLogs(prev => [newLog, ...prev]);
    setUserStats(prev => ({
      ...prev,
      totalEmissions: prev.totalEmissions + emissions,
      totalTokens: prev.totalTokens + tokensEarned,
      streak: emissions < 5 ? prev.streak + 1 : 0
    }));
  };

  const calculateTokens = (emissions: number): number => {
    if (emissions < 2) return 20;
    if (emissions < 5) return 10;
    if (emissions < 8) return 5;
    return 1;
  };

  return (
    <WalletProvider>
      <div className="min-h-screen bg-gradient-to-br from-eco-50 via-ocean-50 to-eco-100">
        <Header 
          currentView={currentView} 
          setCurrentView={setCurrentView}
          isConnected={isConnected}
          setIsConnected={setIsConnected}
          totalTokens={userStats.totalTokens}
        />
        
        <main className="container mx-auto px-4 py-8">
          {currentView === 'home' && (
            <>
              <Hero />
              <ActivityInput onActivitySubmit={handleActivitySubmit} />
            </>
          )}
          
          {currentView === 'dashboard' && (
            <Dashboard 
              activityLogs={activityLogs} 
              userStats={userStats}
            />
          )}
          
          {currentView === 'scorecard' && (
            <Scorecard 
              userStats={userStats}
              activityLogs={activityLogs}
            />
          )}
        </main>
        
        <Footer />
      </div>
    </WalletProvider>
  );
}

export default App;