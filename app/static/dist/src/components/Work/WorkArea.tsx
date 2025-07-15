import React, { useState } from 'react';
import { User, Building2, LogOut, Package, Briefcase, BarChart3 } from 'lucide-react';
import DekhoffDashboard from './DekhoffDashboard';
import InditecDashboard from './InditecDashboard';

interface WorkAreaProps {
  user: User;
  onLogout: () => void;
  onNavigate: (area: 'personal' | 'work') => void;
}

const WorkArea: React.FC<WorkAreaProps> = ({ user, onLogout, onNavigate }) => {
  const [activeCompany, setActiveCompany] = useState<'dekhoff' | 'inditec'>('dekhoff');

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <h1 className="text-xl font-bold text-white">Work Area</h1>
              <div className="flex space-x-4">
                <button
                  onClick={() => setActiveCompany('dekhoff')}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    activeCompany === 'dekhoff'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <Package className="h-5 w-5 mr-2" />
                  DEKHOFF
                </button>
                <button
                  onClick={() => setActiveCompany('inditec')}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    activeCompany === 'inditec'
                      ? 'bg-emerald-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <BarChart3 className="h-5 w-5 mr-2" />
                  INDITEC
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Welcome, {user.name}</span>
              <button
                onClick={() => onNavigate('personal')}
                className="flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                <User className="h-5 w-5 mr-2" />
                Personal Area
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
        {activeCompany === 'dekhoff' && <DekhoffDashboard />}
        {activeCompany === 'inditec' && <InditecDashboard />}
      </div>
    </div>
  );
};

export default WorkArea;