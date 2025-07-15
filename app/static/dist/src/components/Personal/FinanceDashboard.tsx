import React, { useState } from 'react';
import { PlusCircle, TrendingUp, TrendingDown, Calendar, DollarSign } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const FinanceDashboard: React.FC = () => {
  const { transactions } = useData();
  const [newTransaction, setNewTransaction] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Calculate totals
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const netBalance = totalIncome - totalExpenses;

  // Group expenses by category
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
      return acc;
    }, {} as Record<string, number>);

  const pieData = {
    labels: Object.keys(expensesByCategory),
    datasets: [{
      data: Object.values(expensesByCategory),
      backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#F97316'],
      borderColor: '#374151',
      borderWidth: 2
    }]
  };

  const barData = {
    labels: ['Income', 'Expenses', 'Net Balance'],
    datasets: [{
      label: 'Amount (€)',
      data: [totalIncome, totalExpenses, netBalance],
      backgroundColor: ['#10B981', '#EF4444', netBalance >= 0 ? '#3B82F6' : '#F59E0B'],
      borderColor: '#374151',
      borderWidth: 1
    }]
  };

  const handleNaturalLanguageInput = () => {
    // Simulate natural language processing
    const amount = parseFloat(newTransaction.match(/€?(\d+(?:\.\d{2})?)/)?.[1] || '0');
    const isExpense = newTransaction.toLowerCase().includes('spent') || newTransaction.toLowerCase().includes('paid');
    
    if (amount > 0) {
      alert(`Processed: ${isExpense ? 'Expense' : 'Income'} of €${amount}`);
      setNewTransaction('');
      setShowAddForm(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Financial Dashboard</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Add Transaction
        </button>
      </div>

      {showAddForm && (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Natural Language Input</h3>
          <div className="flex space-x-4">
            <input
              type="text"
              value={newTransaction}
              onChange={(e) => setNewTransaction(e.target.value)}
              placeholder="e.g., 'I spent €20 on gas' or 'Received €2500 salary'"
              className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleNaturalLanguageInput}
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
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
              <p className="text-gray-400 text-sm">Total Income</p>
              <p className="text-2xl font-bold text-emerald-400">€{totalIncome.toLocaleString()}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-emerald-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Expenses</p>
              <p className="text-2xl font-bold text-red-400">€{totalExpenses.toLocaleString()}</p>
            </div>
            <TrendingDown className="h-8 w-8 text-red-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Net Balance</p>
              <p className={`text-2xl font-bold ${netBalance >= 0 ? 'text-blue-400' : 'text-yellow-400'}`}>
                €{netBalance.toLocaleString()}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-blue-400" />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Expenses by Category</h3>
          <div className="h-64 flex items-center justify-center">
            <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Financial Overview</h3>
          <div className="h-64">
            <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Transactions</h3>
        <div className="space-y-3">
          {transactions.slice(0, 5).map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${transaction.type === 'income' ? 'bg-emerald-400' : 'bg-red-400'}`} />
                <div>
                  <p className="text-white font-medium">{transaction.description}</p>
                  <p className="text-gray-400 text-sm">{transaction.category}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-400 text-sm">{transaction.date}</span>
                <span className={`font-bold ${transaction.type === 'income' ? 'text-emerald-400' : 'text-red-400'}`}>
                  {transaction.type === 'income' ? '+' : ''}€{Math.abs(transaction.amount)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinanceDashboard;