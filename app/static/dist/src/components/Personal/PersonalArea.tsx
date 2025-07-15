import React, { useState } from 'react';
import { User, Building2, LogOut, DollarSign, Activity } from 'lucide-react';
import FinanceDashboard from './FinanceDashboard';
import HealthDashboard from './HealthDashboard';

interface PersonalAreaProps {
  user: User;
  onLogout: () => void;
  onNavigate: (area: 'personal' | 'work') => void;
}

const PersonalArea: React.FC<PersonalAreaProps> = ({ user, onLogout, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'finances' | 'health'>('finances');

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <h1 className="text-xl font-bold text-white">Personal Area</h1>
              <div className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('finances')}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'finances'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <DollarSign className="h-5 w-5 mr-2" />
                  Finances
                </button>
                <button
                  onClick={() => setActiveTab('health')}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'health'
                      ? 'bg-emerald-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <Activity className="h-5 w-5 mr-2" />
                  Health
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Welcome, {user.name}</span>
              <button
                onClick={() => onNavigate('work')}
                className="flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                <Building2 className="h-5 w-5 mr-2" />
                Work Area
              </button>
              <button
                onClick={onLogout}
                className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {activeTab === 'finances' && <FinanceDashboard />}
        {activeTab === 'health' && <HealthDashboard />}
      </div>
    </div>
  );
};

export default PersonalArea;