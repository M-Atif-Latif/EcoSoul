import React from 'react';
import { Sparkles, TrendingDown, Award, Zap } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="text-center py-16 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-eco-200">
          <Sparkles className="w-4 h-4 text-eco-600" />
          <span className="text-sm font-medium text-eco-700">AI-Powered Carbon Tracking</span>
          <Sparkles className="w-4 h-4 text-eco-600" />
        </div>
        
        <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-eco-600 via-ocean-600 to-eco-700 bg-clip-text text-transparent leading-tight">
          Track. Reduce. Earn.
        </h2>
        
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
          Use AI to estimate your daily carbon footprint and earn blockchain rewards for sustainable choices. 
          Join the movement toward a greener future.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-eco-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-gradient-to-br from-eco-500 to-eco-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <TrendingDown className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">AI Carbon Estimation</h3>
            <p className="text-gray-600 text-sm">
              Simply describe your activities and let AI calculate your carbon footprint with 90% accuracy
            </p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-ocean-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-gradient-to-br from-ocean-500 to-ocean-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Instant Rewards</h3>
            <p className="text-gray-600 text-sm">
              Earn ECO tokens automatically for low-carbon activities and maintain your green streak
            </p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-eco-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-gradient-to-br from-eco-600 to-ocean-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Achievement System</h3>
            <p className="text-gray-600 text-sm">
              Unlock badges, climb leaderboards, and share your climate impact with the world
            </p>
          </div>
        </div>
        
        <div className="mt-12 p-6 bg-gradient-to-r from-eco-500/10 to-ocean-500/10 rounded-2xl border border-eco-200">
          <p className="text-lg font-medium text-gray-800 mb-2">🌍 Global Impact</p>
          <p className="text-gray-600">
            Join <span className="font-bold text-eco-600">10,000+</span> users who have prevented{' '}
            <span className="font-bold text-ocean-600">50,000kg</span> of CO₂ emissions this month
          </p>
        </div>
      </div>
    </section>
  );
};