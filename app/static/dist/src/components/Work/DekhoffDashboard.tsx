import React, { useState } from 'react';
import { Package, CheckCircle, Clock, AlertCircle, Plus, TrendingUp } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

const DekhoffDashboard: React.FC = () => {
  const { orders, tasks, updateTaskStatus } = useData();
  const [activeTab, setActiveTab] = useState<'orders' | 'tasks' | 'finance'>('orders');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTask, setNewTask] = useState('');

  const dekhoffOrders = orders.filter(o => o.company === 'DEKHOFF');
  const dekhoffTasks = tasks.filter(t => t.company === 'DEKHOFF');

  const handleNaturalLanguageTask = () => {
    alert(`Processed task: "${newTask}"`);
    setNewTask('');
    setShowAddForm(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-emerald-400" />;
      case 'in-progress': return <Clock className="h-5 w-5 text-blue-400" />;
      default: return <AlertCircle className="h-5 w-5 text-yellow-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      default: return 'text-green-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">DEKHOFF Sportswear</h2>
        <div className="flex items-center space-x-4">
          <div className="flex bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === 'orders' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === 'tasks' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              Tasks
            </button>
            <button
              onClick={() => setActiveTab('finance')}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === 'finance' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              Finance
            </button>
          </div>
          {activeTab === 'tasks' && (
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Task
            </button>
          )}
        </div>
      </div>

      {showAddForm && (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Natural Language Task Input</h3>
          <div className="flex space-x-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="e.g., 'remind me to call supplier tomorrow' or 'schedule meeting with design team'"
              className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleNaturalLanguageTask}
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
            >
              Process
            </button>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">KHAL Division</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Active Orders</span>
                  <span className="text-blue-400 font-bold">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Revenue (MTD)</span>
                  <span className="text-emerald-400 font-bold">€12,500</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Status</span>
                  <span className="text-green-400 font-bold">On Track</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">DEKHOFF Main</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Active Orders</span>
                  <span className="text-blue-400 font-bold">5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Revenue (MTD)</span>
                  <span className="text-emerald-400 font-bold">€18,750</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Status</span>
                  <span className="text-green-400 font-bold">Excellent</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Orders</h3>
            <div className="space-y-4">
              {dekhoffOrders.map((order) => (
                <div key={order.id} className="p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Package className="h-5 w-5 text-blue-400" />
                      <div>
                        <p className="text-white font-medium">{order.orderNumber}</p>
                        <p className="text-gray-400 text-sm">{order.customer}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-emerald-400 font-bold">€{order.total.toLocaleString()}</p>
                      <p className="text-gray-400 text-sm">{order.orderDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      {order.items.map((item, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-600 text-gray-300 rounded text-sm">
                          {item.name} x{item.quantity}
                        </span>
                      ))}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === 'delivered' ? 'bg-emerald-600 text-white' :
                      order.status === 'shipped' ? 'bg-blue-600 text-white' :
                      order.status === 'processing' ? 'bg-yellow-600 text-white' :
                      'bg-gray-600 text-white'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tasks' && (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Task Management</h3>
          <div className="space-y-4">
            {dekhoffTasks.map((task) => (
              <div key={task.id} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(task.status)}
                    <div>
                      <p className="text-white font-medium">{task.title}</p>
                      <p className="text-gray-400 text-sm">{task.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-2 py-1 rounded text-sm font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    <span className="text-gray-400 text-sm">{task.dueDate}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    {task.project && (
                      <span className="px-2 py-1 bg-blue-600 text-white rounded text-sm">
                        {task.project}
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => updateTaskStatus(task.id, 'in-progress')}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors"
                    >
                      In Progress
                    </button>
                    <button
                      onClick={() => updateTaskStatus(task.id, 'completed')}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-sm transition-colors"
                    >
                      Complete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'finance' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Financial Overview</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Monthly Revenue</span>
                <span className="text-emerald-400 font-bold">€31,250</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Monthly Expenses</span>
                <span className="text-red-400 font-bold">€18,500</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Net Profit</span>
                <span className="text-blue-400 font-bold">€12,750</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Growth Rate</span>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">+15.2%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Division Performance</h3>
            <div className="space-y-4">
              <div className="p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">KHAL</span>
                  <span className="text-emerald-400 font-bold">€12,500</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div className="bg-emerald-400 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
              <div className="p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">DEKHOFF Main</span>
                  <span className="text-blue-400 font-bold">€18,750</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div className="bg-blue-400 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DekhoffDashboard;