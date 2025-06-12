import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingDown, Award, Flame, Target, Calendar, Zap } from 'lucide-react';
import { format, subDays, startOfWeek, endOfWeek } from 'date-fns';
import { ActivityLog, UserStats } from '../App';

interface DashboardProps {
  activityLogs: ActivityLog[];
  userStats: UserStats;
}

export const Dashboard: React.FC<DashboardProps> = ({ activityLogs, userStats }) => {
  // Generate weekly data
  const weeklyData = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i);
    const dayLogs = activityLogs.filter(log => 
      format(new Date(log.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
    const emissions = dayLogs.reduce((sum, log) => sum + log.emissions, 0);
    const target = 5; // 5kg target per day
    const savings = Math.max(0, target - emissions);
    
    return {
      day: format(date, 'EEE'),
      emissions: parseFloat(emissions.toFixed(1)),
      savings: parseFloat(savings.toFixed(1)),
      target
    };
  });

  // Token distribution data
  const tokenData = [
    { name: 'Daily Rewards', value: Math.floor(userStats.totalTokens * 0.6), color: '#22c55e' },
    { name: 'Streak Bonus', value: Math.floor(userStats.totalTokens * 0.25), color: '#0ea5e9' },
    { name: 'Achievements', value: Math.floor(userStats.totalTokens * 0.15), color: '#f59e0b' },
  ];

  const achievements = [
    { id: 'first-track', name: 'First Steps', description: 'Track your first activity', unlocked: activityLogs.length > 0, icon: '🌱' },
    { id: 'low-carbon', name: 'Eco Warrior', description: 'Have a day with <2kg emissions', unlocked: activityLogs.some(log => log.emissions < 2), icon: '🌿' },
    { id: 'streak-3', name: 'Green Streak', description: 'Maintain 3-day streak', unlocked: userStats.streak >= 3, icon: '🔥' },
    { id: 'token-100', name: 'Token Collector', description: 'Earn 100+ tokens', unlocked: userStats.totalTokens >= 100, icon: '💎' },
    { id: 'activities-10', name: 'Consistent Tracker', description: 'Log 10+ activities', unlocked: activityLogs.length >= 10, icon: '⭐' },
    { id: 'zero-carbon', name: 'Carbon Neutral', description: 'Have a zero-emission day', unlocked: activityLogs.some(log => log.emissions === 0), icon: '🌍' },
  ];

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const avgEmissions = activityLogs.length > 0 ? activityLogs.reduce((sum, log) => sum + log.emissions, 0) / activityLogs.length : 0;

  return (
    <div className="max-w-7xl mx-auto py-8 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-eco-600 to-ocean-600 bg-clip-text text-transparent mb-2">
          Your EcoSoul Dashboard
        </h2>
        <p className="text-gray-600">Track your progress and celebrate your environmental impact</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-eco-200 hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-eco-500 to-eco-600 rounded-xl">
              <TrendingDown className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-eco-600">{avgEmissions.toFixed(1)}kg</span>
          </div>
          <h3 className="font-semibold text-gray-800">Avg Daily Emissions</h3>
          <p className="text-sm text-gray-600 mt-1">Target: &lt;5kg per day</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-ocean-200 hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-ocean-500 to-ocean-600 rounded-xl">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-ocean-600">{userStats.totalTokens}</span>
          </div>
          <h3 className="font-semibold text-gray-800">ECO Tokens</h3>
          <p className="text-sm text-gray-600 mt-1">Earned from activities</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-orange-200 hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-orange-600">{userStats.streak}</span>
          </div>
          <h3 className="font-semibold text-gray-800">Current Streak</h3>
          <p className="text-sm text-gray-600 mt-1">Days under 5kg CO₂</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-purple-200 hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
              <Award className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-purple-600">{unlockedAchievements.length}</span>
          </div>
          <h3 className="font-semibold text-gray-800">Achievements</h3>
          <p className="text-sm text-gray-600 mt-1">Unlocked badges</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Weekly Emissions Chart */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-eco-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-eco-600" />
            Weekly Emissions
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Bar dataKey="emissions" fill="#22c55e" radius={4} />
              <Bar dataKey="target" fill="#e5e7eb" radius={4} opacity={0.3} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Token Distribution */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-ocean-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-ocean-600" />
            Token Sources
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={tokenData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {tokenData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-4 mt-4">
            {tokenData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-eco-200 mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <Award className="w-5 h-5 mr-2 text-eco-600" />
          Achievements ({unlockedAchievements.length}/{achievements.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-xl border-2 transition-all ${
                achievement.unlocked
                  ? 'border-eco-300 bg-eco-50 hover:shadow-md'
                  : 'border-gray-200 bg-gray-50 opacity-60'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-2xl">{achievement.icon}</span>
                <h4 className={`font-semibold ${achievement.unlocked ? 'text-eco-700' : 'text-gray-500'}`}>
                  {achievement.name}
                </h4>
              </div>
              <p className={`text-sm ${achievement.unlocked ? 'text-eco-600' : 'text-gray-400'}`}>
                {achievement.description}
              </p>
              {achievement.unlocked && (
                <div className="mt-2 inline-flex items-center px-2 py-1 bg-eco-100 text-eco-700 text-xs rounded-full">
                  ✓ Unlocked
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-eco-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Recent Activities</h3>
        {activityLogs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No activities logged yet. Start tracking to see your progress!</p>
          </div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {activityLogs.slice(0, 10).map((log) => (
              <div key={log.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{log.activity}</p>
                  <p className="text-sm text-gray-600">{format(new Date(log.date), 'MMM d, yyyy • h:mm a')}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-eco-600">{log.emissions.toFixed(1)}kg CO₂</p>
                  <p className="text-sm text-ocean-600">+{log.tokensEarned} ECO</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};