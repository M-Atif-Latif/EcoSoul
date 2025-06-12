import React, { useState } from 'react';
import { Share2, Download, Award, TrendingUp, Calendar, Leaf, Copy, Check } from 'lucide-react';
import { format } from 'date-fns';
import { ActivityLog, UserStats } from '../App';

interface ScorecardProps {
  userStats: UserStats;
  activityLogs: ActivityLog[];
}

export const Scorecard: React.FC<ScorecardProps> = ({ userStats, activityLogs }) => {
  const [copied, setCopied] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'all'>('month');

  const currentDate = new Date();
  const totalEmissions = activityLogs.reduce((sum, log) => sum + log.emissions, 0);
  const avgEmissions = activityLogs.length > 0 ? totalEmissions / activityLogs.length : 0;
  const carbonSaved = Math.max(0, (activityLogs.length * 5) - totalEmissions); // Assuming 5kg baseline
  const impactRating = avgEmissions < 2 ? 'Exceptional' : avgEmissions < 5 ? 'Great' : avgEmissions < 8 ? 'Good' : 'Improving';
  const impactColor = avgEmissions < 2 ? 'text-green-600' : avgEmissions < 5 ? 'text-eco-600' : avgEmissions < 8 ? 'text-yellow-600' : 'text-orange-600';
  
  const handleShare = async () => {
    const shareText = `🌱 My EcoSoul Climate Impact:\n\n📊 Average Daily Emissions: ${avgEmissions.toFixed(1)}kg CO₂\n💚 Carbon Saved: ${carbonSaved.toFixed(1)}kg CO₂\n🏆 Impact Rating: ${impactRating}\n🔥 Green Streak: ${userStats.streak} days\n💎 ECO Tokens: ${userStats.totalTokens}\n\nJoin me in tracking your carbon footprint with AI! #EcoSoul #ClimateAction`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My EcoSoul Climate Scorecard',
          text: shareText,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    // Create a downloadable image or PDF - for now, we'll simulate it
    alert('Scorecard download feature coming soon! For now, use the share button to copy your stats.');
  };

  const generateInsight = () => {
    if (avgEmissions < 2) {
      return "You're a climate champion! Your carbon footprint is exceptionally low. Keep inspiring others with your sustainable lifestyle choices.";
    } else if (avgEmissions < 5) {
      return "Excellent work! You're well below the global average and making a real difference. Your consistent low-carbon choices are having a positive impact.";
    } else if (avgEmissions < 8) {
      return "You're on a great path! Your emissions are reasonable, but there's room to do even better. Consider more sustainable transport and energy choices.";
    } else {
      return "Every journey starts with a single step! You're tracking your impact, which is the first step toward a more sustainable lifestyle. Keep it up!";
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-eco-600 to-ocean-600 bg-clip-text text-transparent mb-2">
          Your Climate Scorecard
        </h2>
        <p className="text-gray-600">Share your environmental impact and inspire others</p>
      </div>

      {/* Main Scorecard */}
      <div className="bg-gradient-to-br from-white to-eco-50 rounded-3xl shadow-2xl border border-eco-200 overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-eco-500 to-ocean-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-1">EcoSoul Climate Impact</h3>
              <p className="opacity-90">{format(currentDate, 'MMMM yyyy')}</p>
            </div>
            <div className="text-right">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-2">
                <Leaf className="w-8 h-8" />
              </div>
              <p className="text-sm opacity-90">Verified by AI</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-eco-100 to-eco-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-10 h-10 text-eco-600" />
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-1">{avgEmissions.toFixed(1)}kg</h4>
              <p className="text-gray-600">Avg Daily CO₂</p>
              <p className="text-sm text-gray-500 mt-1">Global avg: 16kg</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-ocean-100 to-ocean-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-ocean-600" />
              </div>
              <h4 className={`text-2xl font-bold mb-1 ${impactColor}`}>{impactRating}</h4>
              <p className="text-gray-600">Impact Rating</p>
              <p className="text-sm text-gray-500 mt-1">{userStats.totalTokens} ECO tokens</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-10 h-10 text-green-600" />
              </div>
              <h4 className="text-2xl font-bold text-green-600 mb-1">{carbonSaved.toFixed(1)}kg</h4>
              <p className="text-gray-600">Carbon Saved</p>
              <p className="text-sm text-gray-500 mt-1">This month</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-eco-50 to-ocean-50 p-6 rounded-2xl mb-6">
            <h5 className="font-semibold text-gray-800 mb-2">AI-Generated Insight</h5>
            <p className="text-gray-700 leading-relaxed">{generateInsight()}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
              <Calendar className="w-6 h-6 text-eco-600 mx-auto mb-2" />
              <p className="text-lg font-bold text-gray-800">{activityLogs.length}</p>
              <p className="text-sm text-gray-600">Days Tracked</p>
            </div>
            <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
              <span className="text-2xl mb-2 block">🔥</span>
              <p className="text-lg font-bold text-orange-600">{userStats.streak}</p>
              <p className="text-sm text-gray-600">Green Streak</p>
            </div>
            <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
              <span className="text-2xl mb-2 block">🏆</span>
              <p className="text-lg font-bold text-purple-600">{userStats.achievements.length}</p>
              <p className="text-sm text-gray-600">Achievements</p>
            </div>
            <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
              <span className="text-2xl mb-2 block">🌍</span>
              <p className="text-lg font-bold text-blue-600">Top 25%</p>
              <p className="text-sm text-gray-600">Global Rank</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleShare}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-eco-500 to-ocean-500 text-white rounded-xl font-medium hover:shadow-lg transition-all"
            >
              {copied ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
              <span>{copied ? 'Copied!' : 'Share Impact'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-all"
            >
              <Download className="w-5 h-5" />
              <span>Download Card</span>
            </button>
          </div>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-eco-200">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">This Month's Highlights</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-eco-50 rounded-lg">
              <span className="text-gray-700">Lowest Daily Emissions</span>
              <span className="font-semibold text-eco-600">
                {activityLogs.length > 0 ? Math.min(...activityLogs.map(log => log.emissions)).toFixed(1) : '0.0'}kg
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-ocean-50 rounded-lg">
              <span className="text-gray-700">Total Tokens Earned</span>
              <span className="font-semibold text-ocean-600">{userStats.totalTokens} ECO</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="text-gray-700">Eco-Friendly Days</span>
              <span className="font-semibold text-green-600">
                {activityLogs.filter(log => log.emissions < 5).length}/{activityLogs.length}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-eco-200">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Impact Comparison</h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Your Average</span>
                <span>{avgEmissions.toFixed(1)}kg CO₂</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-eco-500 to-eco-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((avgEmissions / 16) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Global Average</span>
                <span>16kg CO₂</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gray-400 h-2 rounded-full w-full"></div>
              </div>
            </div>
            <div className="pt-2">
              <p className="text-sm text-gray-600">
                You're emitting <span className="font-semibold text-eco-600">
                  {((1 - avgEmissions / 16) * 100).toFixed(0)}% less
                </span> than the global average! 🌱
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};