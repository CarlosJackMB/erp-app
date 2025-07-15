import React, { useState } from 'react';
import { BarChart3, Zap, AlertTriangle, Camera, FileText, Plus, TrendingUp } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const InditecDashboard: React.FC = () => {
  const { projectProgress } = useData();
  const [activeProject, setActiveProject] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProgress, setNewProgress] = useState('');

  const currentProject = projectProgress[activeProject];

  const progressData = {
    labels: ['Panels', 'Structure', 'Wiring', 'Inverters'],
    datasets: [{
      label: 'Components Installed',
      data: [850, 200, 5000, 25],
      backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
      borderColor: '#374151',
      borderWidth: 1
    }]
  };

  const handleNaturalLanguageProgress = () => {
    alert(`Processed progress update: "${newProgress}"`);
    setNewProgress('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">INDITEC Photovoltaic Projects</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Log Progress
        </button>
      </div>

      {showAddForm && (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Construction Diary Input</h3>
          <div className="flex space-x-4">
            <input
              type="text"
              value={newProgress}
              onChange={(e) => setNewProgress(e.target.value)}
              placeholder="e.g., 'Installed 50 panels in sector A, weather conditions good, minor wiring issue resolved'"
              className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              onClick={handleNaturalLanguageProgress}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Process
            </button>
          </div>
        </div>
      )}

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Project Overview</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Overall Progress</p>
                <p className="text-2xl font-bold text-blue-400">{currentProject.progress}%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Economic Value</p>
                <p className="text-2xl font-bold text-emerald-400">€{currentProject.economicValue.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-emerald-400" />
            </div>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Panels Installed</p>
                <p className="text-2xl font-bold text-yellow-400">{currentProject.componentsInstalled.find(c => c.type === 'panels')?.quantity || 0}</p>
              </div>
              <Zap className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Open Incidents</p>
                <p className="text-2xl font-bold text-red-400">{currentProject.incidents.filter(i => !i.resolved).length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Components Progress</h3>
          <div className="h-64">
            <Bar data={progressData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Project Details</h3>
          <div className="space-y-4">
            <div>
              <p className="text-gray-400 text-sm">Project Name</p>
              <p className="text-white font-medium">{currentProject.projectName}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Last Update</p>
              <p className="text-white font-medium">{currentProject.date}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Progress Bar</p>
              <div className="w-full bg-gray-600 rounded-full h-3 mt-2">
                <div 
                  className="bg-emerald-400 h-3 rounded-full transition-all duration-300" 
                  style={{ width: `${currentProject.progress}%` }}
                ></div>
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Notes</p>
              <p className="text-white">{currentProject.notes}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Installed Components</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {currentProject.componentsInstalled.map((component, index) => (
            <div key={index} className="p-4 bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium capitalize">{component.type}</span>
                <span className="text-blue-400 font-bold">{component.quantity}</span>
              </div>
              <p className="text-gray-400 text-sm">{component.specifications}</p>
              <div className="mt-2 w-full bg-gray-600 rounded-full h-2">
                <div 
                  className="bg-blue-400 h-2 rounded-full" 
                  style={{ width: `${Math.min(100, (component.quantity / 1000) * 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Incident Log</h3>
        <div className="space-y-3">
          {currentProject.incidents.map((incident) => (
            <div key={incident.id} className="p-4 bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className={`h-5 w-5 ${
                    incident.severity === 'high' ? 'text-red-400' :
                    incident.severity === 'medium' ? 'text-yellow-400' :
                    'text-green-400'
                  }`} />
                  <div>
                    <p className="text-white font-medium capitalize">{incident.type}</p>
                    <p className="text-gray-400 text-sm">{incident.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-sm font-medium ${
                    incident.severity === 'high' ? 'bg-red-600 text-white' :
                    incident.severity === 'medium' ? 'bg-yellow-600 text-white' :
                    'bg-green-600 text-white'
                  }`}>
                    {incident.severity}
                  </span>
                  <span className={`px-2 py-1 rounded text-sm font-medium ${
                    incident.resolved ? 'bg-emerald-600 text-white' : 'bg-gray-600 text-white'
                  }`}>
                    {incident.resolved ? 'Resolved' : 'Open'}
                  </span>
                </div>
              </div>
              <p className="text-gray-300">{incident.description}</p>
              {incident.images && incident.images.length > 0 && (
                <div className="mt-3 flex space-x-2">
                  <Camera className="h-4 w-4 text-gray-400 mt-0.5" />
                  <span className="text-gray-400 text-sm">{incident.images.length} image(s) attached</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Reports & Documentation</h3>
          <button className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <FileText className="h-5 w-5 mr-2" />
            Generate Report
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-700 rounded-lg">
            <p className="text-white font-medium">Weekly Progress Report</p>
            <p className="text-gray-400 text-sm">Last generated: {currentProject.date}</p>
          </div>
          <div className="p-4 bg-gray-700 rounded-lg">
            <p className="text-white font-medium">Safety Documentation</p>
            <p className="text-gray-400 text-sm">Updated daily</p>
          </div>
          <div className="p-4 bg-gray-700 rounded-lg">
            <p className="text-white font-medium">Economic Analysis</p>
            <p className="text-gray-400 text-sm">Monthly summary</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InditecDashboard;