import React from 'react';
import { Leaf, Github, Twitter, Globe, Mail, Linkedin, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-eco-200 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-eco-500 to-ocean-500 rounded-xl">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-eco-600 to-ocean-600 bg-clip-text text-transparent">
                  EcoSoul
                </h3>
                <p className="text-sm text-gray-600">AI Carbon Tracker</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              Track and reduce your carbon footprint with AI-powered insights. 
              Earn blockchain rewards for sustainable living and join the movement toward a greener future.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-gray-100 rounded-lg hover:bg-eco-100 transition-colors">
                <Github className="w-5 h-5 text-gray-600 hover:text-eco-600" />
              </a>
              <a href="#" className="p-2 bg-gray-100 rounded-lg hover:bg-eco-100 transition-colors">
                <Twitter className="w-5 h-5 text-gray-600 hover:text-eco-600" />
              </a>
              <a href="#" className="p-2 bg-gray-100 rounded-lg hover:bg-eco-100 transition-colors">
                <Globe className="w-5 h-5 text-gray-600 hover:text-eco-600" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Features</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-eco-600 transition-colors">AI Carbon Estimation</a></li>
              <li><a href="#" className="text-gray-600 hover:text-eco-600 transition-colors">Blockchain Rewards</a></li>
              <li><a href="#" className="text-gray-600 hover:text-eco-600 transition-colors">Impact Dashboard</a></li>
              <li><a href="#" className="text-gray-600 hover:text-eco-600 transition-colors">Social Sharing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-eco-600 transition-colors">How it Works</a></li>
              <li><a href="#" className="text-gray-600 hover:text-eco-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-eco-600 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-600 hover:text-eco-600 transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>

        {/* Author Section */}
        <div className="border-t border-eco-200 mt-8 pt-8">
          <div className="text-center mb-6">
            <h4 className="text-2xl font-bold text-eco-600 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              👨‍💻 Author: Muhammad Atif Latif
            </h4>
            <p className="text-gray-600 mb-6">
              Passionate about AI, sustainability, and Web3 technologies. Building solutions for a greener future.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://github.com/m-Atif-Latif" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all hover:scale-105"
              >
                <Github className="w-4 h-4" />
                <span className="font-medium">GitHub</span>
              </a>
              
              <a 
                href="https://www.kaggle.com/matiflatif" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all hover:scale-105"
              >
                <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center">
                  <span className="text-blue-600 text-xs font-bold">K</span>
                </div>
                <span className="font-medium">Kaggle</span>
              </a>
              
              <a 
                href="https://www.linkedin.com/in/muhammad-atif-latif-13a171318" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-all hover:scale-105"
              >
                <Linkedin className="w-4 h-4" />
                <span className="font-medium">LinkedIn</span>
              </a>
              
              <a 
                href="https://x.com/mianatif5867" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all hover:scale-105"
              >
                <Twitter className="w-4 h-4" />
                <span className="font-medium">Twitter/X</span>
              </a>
              
              <a 
                href="https://www.instagram.com/its_atif_ai/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all hover:scale-105"
              >
                <Instagram className="w-4 h-4" />
                <span className="font-medium">Instagram</span>
              </a>
              
              <a 
                href="mailto:muhammadatiflatif67@gmail.com" 
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all hover:scale-105"
              >
                <Mail className="w-4 h-4" />
                <span className="font-medium">Email</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-eco-200 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm mb-4 md:mb-0">
            © 2025 EcoSoul. Made with 💚 for a sustainable future.
          </p>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>🌱 Carbon Neutral Platform</span>
            <span>•</span>
            <span>🔗 Powered by Web3</span>
            <span>•</span>
            <span>🤖 AI Verified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};