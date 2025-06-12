import React, { useState } from 'react';
import { Send, Sparkles, Loader, Camera, MapPin } from 'lucide-react';

interface ActivityInputProps {
  onActivitySubmit: (activity: string, emissions: number) => void;
}

export const ActivityInput: React.FC<ActivityInputProps> = ({ onActivitySubmit }) => {
  const [activity, setActivity] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastResult, setLastResult] = useState<{ activity: string; emissions: number; analysis: string } | null>(null);

  const quickActivities = [
    { text: "Biked to work (5km)", emissions: 0 },
    { text: "Drove car to office (20km)", emissions: 4.2 },
    { text: "Ate vegetarian lunch", emissions: 0.5 },
    { text: "Took a 2-hour flight", emissions: 250 },
    { text: "Used public transport", emissions: 0.8 },
    { text: "Worked from home today", emissions: 1.2 },
  ];

  const handleSubmit = async (activityText: string) => {
    if (!activityText.trim()) return;
    
    setIsProcessing(true);
    
    try {
      // Simulate AI processing with realistic delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock AI carbon estimation
      const emissions = estimateCarbonFootprint(activityText);
      const analysis = generateAnalysis(activityText, emissions);
      
      setLastResult({ activity: activityText, emissions, analysis });
      onActivitySubmit(activityText, emissions);
      setActivity('');
    } catch (error) {
      console.error('Error processing activity:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const estimateCarbonFootprint = (text: string): number => {
    const lowerText = text.toLowerCase();
    
    // Transport emissions
    if (lowerText.includes('flight') || lowerText.includes('plane')) {
      return Math.random() * 200 + 100; // 100-300kg
    }
    if (lowerText.includes('car') || lowerText.includes('drive')) {
      const kmMatch = text.match(/(\d+)\s*km/);
      const km = kmMatch ? parseInt(kmMatch[1]) : 20;
      return km * 0.21; // 0.21kg CO2 per km
    }
    if (lowerText.includes('bike') || lowerText.includes('walk')) {
      return Math.random() * 0.5; // Very low emissions
    }
    if (lowerText.includes('bus') || lowerText.includes('train') || lowerText.includes('public')) {
      return Math.random() * 2 + 0.5; // 0.5-2.5kg
    }
    
    // Food emissions
    if (lowerText.includes('meat') || lowerText.includes('beef')) {
      return Math.random() * 3 + 2; // 2-5kg
    }
    if (lowerText.includes('vegetarian') || lowerText.includes('vegan')) {
      return Math.random() * 1 + 0.2; // 0.2-1.2kg
    }
    
    // Energy/home
    if (lowerText.includes('home') || lowerText.includes('electricity')) {
      return Math.random() * 3 + 1; // 1-4kg
    }
    
    // Default estimation
    return Math.random() * 5 + 1; // 1-6kg
  };

  const generateAnalysis = (activity: string, emissions: number): string => {
    if (emissions < 1) {
      return "Excellent! This is a very low-carbon activity. Keep up the sustainable choices! 🌱";
    } else if (emissions < 3) {
      return "Good choice! This activity has a moderate carbon footprint. Consider alternatives for even better impact. 🌿";
    } else if (emissions < 10) {
      return "This activity has a higher carbon footprint. Consider offsetting or finding greener alternatives when possible. 🌎";
    } else {
      return "This activity has a significant carbon impact. Look for ways to reduce or offset these emissions in the future. ♻️";
    }
  };

  return (
    <section className="max-w-4xl mx-auto py-12">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-eco-200 overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">What did you do today?</h3>
            <p className="text-gray-600">Describe your activities and let AI estimate your carbon footprint</p>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <textarea
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                placeholder="e.g., I drove 15km to work, had a vegetarian lunch, and worked in an air-conditioned office..."
                className="w-full p-4 pr-12 border-2 border-eco-200 rounded-2xl focus:border-eco-500 focus:ring-4 focus:ring-eco-100 outline-none resize-none transition-all"
                rows={4}
                disabled={isProcessing}
              />
              <button
                onClick={() => handleSubmit(activity)}
                disabled={!activity.trim() || isProcessing}
                className="absolute bottom-3 right-3 p-3 bg-gradient-to-r from-eco-500 to-ocean-500 text-white rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
              >
                {isProcessing ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              <button className="flex items-center space-x-2 px-4 py-2 bg-eco-100 text-eco-700 rounded-lg hover:bg-eco-200 transition-colors">
                <Camera className="w-4 h-4" />
                <span>Upload Receipt</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-ocean-100 text-ocean-700 rounded-lg hover:bg-ocean-200 transition-colors">
                <MapPin className="w-4 h-4" />
                <span>Track Location</span>
              </button>
            </div>

            {isProcessing && (
              <div className="text-center py-8 animate-slide-up">
                <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-eco-100 to-ocean-100 px-6 py-3 rounded-full">
                  <Sparkles className="w-5 h-5 text-eco-600 animate-pulse" />
                  <span className="text-eco-700 font-medium">AI is analyzing your activities...</span>
                </div>
              </div>
            )}

            {lastResult && !isProcessing && (
              <div className="bg-gradient-to-r from-eco-50 to-ocean-50 p-6 rounded-2xl border border-eco-200 animate-slide-up">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-eco-500 to-ocean-500 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-2">AI Analysis Complete</h4>
                    <p className="text-sm text-gray-600 mb-3">{lastResult.activity}</p>
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="bg-white px-3 py-1 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">
                          Carbon Footprint: <span className="text-eco-600">{lastResult.emissions.toFixed(1)}kg CO₂</span>
                        </span>
                      </div>
                      <div className="bg-white px-3 py-1 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">
                          Tokens Earned: <span className="text-ocean-600">+{lastResult.emissions < 2 ? 20 : lastResult.emissions < 5 ? 10 : 5}</span>
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{lastResult.analysis}</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Quick Activities:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {quickActivities.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleSubmit(item.text)}
                    disabled={isProcessing}
                    className="p-3 text-left bg-white border border-gray-200 rounded-lg hover:border-eco-300 hover:shadow-md transition-all disabled:opacity-50"
                  >
                    <span className="text-sm font-medium text-gray-800">{item.text}</span>
                    <span className="block text-xs text-gray-500 mt-1">~{item.emissions}kg CO₂</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};