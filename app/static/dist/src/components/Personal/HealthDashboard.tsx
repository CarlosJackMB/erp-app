import React, { useState } from 'react';
import { Activity, TrendingUp, Calendar, Plus, Weight } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const HealthDashboard: React.FC = () => {
  const { healthRecords } = useData();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRecord, setNewRecord] = useState('');

  // Calculate average weight
  const weights = healthRecords.filter(r => r.weight).map(r => r.weight!);
  const averageWeight = weights.length > 0 ? weights.reduce((sum, w) => sum + w, 0) / weights.length : 0;
  const weightTrend = weights.length > 1 ? weights[weights.length - 1] - weights[weights.length - 2] : 0;

  // Weight chart data
  const weightData = {
    labels: healthRecords.filter(r => r.weight).map(r => r.date),
    datasets: [{
      label: 'Weight (kg)',
      data: weights,
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderWidth: 2,
      fill: true,
      tension: 0.4
    }]
  };

  const handleNaturalLanguageInput = () => {
    // Simulate processing natural language health input
    alert(`Processed health record: "${newRecord}"`);
    setNewRecord('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Health & Fitness Dashboard</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Log Activity
        </button>
      </div>

      {showAddForm && (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Natural Language Health Input</h3>
          <div className="flex space-x-4">
            <input
              type="text"
              value={newRecord}
              onChange={(e) => setNewRecord(e.target.value)}
              placeholder="e.g., 'Did 45 mins cardio, weight 74.5kg, took protein shake'"
              className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              onClick={handleNaturalLanguageInput}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Process
            </button>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Average Weight</p>
              <p className="text-2xl font-bold text-blue-400">{averageWeight.toFixed(1)} kg</p>
            </div>
            <Weight className="h-8 w-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Weight Trend</p>
              <p className={`text-2xl font-bold ${weightTrend >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {weightTrend >= 0 ? '+' : ''}{weightTrend.toFixed(1)} kg
              </p>
            </div>
            <TrendingUp className={`h-8 w-8 ${weightTrend >= 0 ? 'text-emerald-400' : 'text-red-400'}`} />
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Weekly Sessions</p>
              <p className="text-2xl font-bold text-emerald-400">{healthRecords.length}</p>
            </div>
            <Activity className="h-8 w-8 text-emerald-400" />
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Weight Evolution</h3>
        <div className="h-64">
          <Line data={weightData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Health Records</h3>
        <div className="space-y-4">
          {healthRecords.slice(0, 3).map((record) => (
            <div key={record.id} className="p-4 bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">{record.date}</span>
                {record.weight && (
                  <span className="text-blue-400 font-bold">{record.weight} kg</span>
                )}
              </div>
              
              {record.workout && (
                <div className="mb-2">
                  <p className="text-emerald-400 font-medium">Workout:</p>
                  <p className="text-gray-300">{record.workout}</p>
                </div>
              )}
              
              {record.diet && (
                <div className="mb-2">
                  <p className="text-yellow-400 font-medium">Diet:</p>
                  <p className="text-gray-300">{record.diet}</p>
                </div>
              )}
              
              {record.supplements && record.supplements.length > 0 && (
                <div className="mb-2">
                  <p className="text-purple-400 font-medium">Supplements:</p>
                  <div className="flex flex-wrap gap-2">
                    {record.supplements.map((supplement, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-600 text-gray-300 rounded text-sm">
                        {supplement}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {record.notes && (
                <div>
                  <p className="text-gray-400 font-medium">Notes:</p>
                  <p className="text-gray-300">{record.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthDashboard;