import React, { useState } from 'react';
import { Shield, TrendingUp, Building2, Users, ChevronRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { User } from '../../types';

interface LandingProps {
  onLogin: (user: User) => void;
}

const Landing: React.FC<LandingProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const user = await login(email, pin);
      onLogin(user);
    } catch (err) {
      setError('Invalid PIN. Try 1234 for demo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Shield className="h-12 w-12 text-blue-400 mr-3" />
            <h1 className="text-4xl font-bold text-white">Personal ERP System</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Comprehensive management system for personal life and business operations
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Users className="h-8 w-8 text-emerald-400 mr-3" />
              Personal Area
            </h2>
            <div className="space-y-4">
              <div className="flex items-center text-gray-300">
                <ChevronRight className="h-5 w-5 text-blue-400 mr-2" />
                <span>Financial tracking with natural language input</span>
              </div>
              <div className="flex items-center text-gray-300">
                <ChevronRight className="h-5 w-5 text-blue-400 mr-2" />
                <span>Health & fitness monitoring</span>
              </div>
              <div className="flex items-center text-gray-300">
                <ChevronRight className="h-5 w-5 text-blue-400 mr-2" />
                <span>Interactive charts and analytics</span>
              </div>
              <div className="flex items-center text-gray-300">
                <ChevronRight className="h-5 w-5 text-blue-400 mr-2" />
                <span>Secure PIN protection</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Building2 className="h-8 w-8 text-blue-400 mr-3" />
              Work Area
            </h2>
            <div className="space-y-4">
              <div className="flex items-center text-gray-300">
                <ChevronRight className="h-5 w-5 text-emerald-400 mr-2" />
                <span>Multi-company project management</span>
              </div>
              <div className="flex items-center text-gray-300">
                <ChevronRight className="h-5 w-5 text-emerald-400 mr-2" />
                <span>Order tracking and fulfillment</span>
              </div>
              <div className="flex items-center text-gray-300">
                <ChevronRight className="h-5 w-5 text-emerald-400 mr-2" />
                <span>Task management with voice input</span>
              </div>
              <div className="flex items-center text-gray-300">
                <ChevronRight className="h-5 w-5 text-emerald-400 mr-2" />
                <span>Construction progress tracking</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-6 text-center">Access System</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">PIN</label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your PIN"
                maxLength={6}
                required
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center">{error}</div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors duration-200"
            >
              {isLoading ? 'Authenticating...' : 'Access System'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            <p>Demo PIN: 1234</p>
            <p className="mt-2">
              <TrendingUp className="h-4 w-4 inline mr-1" />
              Secure access to your personal ERP
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;