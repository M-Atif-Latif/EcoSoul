import React from 'react';

interface WalletProviderProps {
  children: React.ReactNode;
}

// Simplified wallet provider for MVP
// In production, this would use RainbowKit or similar
export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  return <>{children}</>;
};