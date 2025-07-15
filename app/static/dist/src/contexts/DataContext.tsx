import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Transaction, HealthRecord, Task, Order, ProjectProgress } from '../types';

interface DataContextType {
  transactions: Transaction[];
  healthRecords: HealthRecord[];
  tasks: Task[];
  orders: Order[];
  projectProgress: ProjectProgress[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  addHealthRecord: (record: Omit<HealthRecord, 'id'>) => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTaskStatus: (id: string, status: Task['status']) => void;
  addOrder: (order: Omit<Order, 'id'>) => void;
  addProjectProgress: (progress: Omit<ProjectProgress, 'id'>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      date: '2024-01-15',
      amount: -20,
      category: 'Transport',
      description: 'Gas station',
      type: 'expense'
    },
    {
      id: '2',
      date: '2024-01-14',
      amount: -45,
      category: 'Food',
      description: 'Grocery shopping',
      type: 'expense'
    },
    {
      id: '3',
      date: '2024-01-13',
      amount: 2500,
      category: 'Salary',
      description: 'Monthly salary',
      type: 'income'
    }
  ]);

  const [healthRecords] = useState<HealthRecord[]>([
    {
      id: '1',
      date: '2024-01-15',
      weight: 75.2,
      workout: 'Push day - Chest, Shoulders, Triceps',
      diet: 'High protein, moderate carbs',
      supplements: ['Protein powder', 'Creatine', 'Multivitamin'],
      notes: 'Good energy levels, increased weights'
    },
    {
      id: '2',
      date: '2024-01-14',
      weight: 75.5,
      workout: 'Pull day - Back, Biceps',
      diet: 'Balanced macros',
      supplements: ['Protein powder', 'Omega-3'],
      notes: 'Rest day tomorrow'
    }
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Call supplier about fabric delivery',
      description: 'Check on the status of organic cotton shipment',
      status: 'pending',
      priority: 'high',
      dueDate: '2024-01-20',
      company: 'DEKHOFF',
      project: 'KHAL'
    },
    {
      id: '2',
      title: 'Review Q1 financial reports',
      description: 'Analyze performance metrics and budget allocation',
      status: 'in-progress',
      priority: 'medium',
      dueDate: '2024-01-25',
      company: 'DEKHOFF'
    }
  ]);

  const [orders] = useState<Order[]>([
    {
      id: '1',
      orderNumber: 'DK-2024-001',
      customer: 'Athletic Store Barcelona',
      items: [
        { id: '1', name: 'KHAL Performance Shorts', quantity: 50, price: 35 },
        { id: '2', name: 'DEKHOFF Training Shirt', quantity: 30, price: 45 }
      ],
      total: 3100,
      status: 'processing',
      orderDate: '2024-01-10',
      company: 'DEKHOFF'
    }
  ]);

  const [projectProgress] = useState<ProjectProgress[]>([
    {
      id: '1',
      projectName: 'Solar Farm Valencia - Phase 1',
      date: '2024-01-15',
      progress: 65,
      componentsInstalled: [
        { type: 'panels', quantity: 850, specifications: '450W Monocrystalline' },
        { type: 'structure', quantity: 200, specifications: 'Aluminum mounting rails' },
        { type: 'wiring', quantity: 5000, specifications: 'DC cables 4mm²' }
      ],
      incidents: [
        {
          id: '1',
          date: '2024-01-14',
          type: 'weather',
          description: 'Heavy rain delayed installation',
          severity: 'medium',
          resolved: true
        }
      ],
      economicValue: 382500,
      notes: 'On track for completion by end of month'
    }
  ]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    // Implementation would add to state
    console.log('Adding transaction:', transaction);
  };

  const addHealthRecord = (record: Omit<HealthRecord, 'id'>) => {
    // Implementation would add to state
    console.log('Adding health record:', record);
  };

  const addTask = (task: Omit<Task, 'id'>) => {
    // Implementation would add to state
    console.log('Adding task:', task);
  };

  const updateTaskStatus = (id: string, status: Task['status']) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, status } : task
    ));
  };

  const addOrder = (order: Omit<Order, 'id'>) => {
    // Implementation would add to state
    console.log('Adding order:', order);
  };

  const addProjectProgress = (progress: Omit<ProjectProgress, 'id'>) => {
    // Implementation would add to state
    console.log('Adding project progress:', progress);
  };

  return (
    <DataContext.Provider value={{
      transactions,
      healthRecords,
      tasks,
      orders,
      projectProgress,
      addTransaction,
      addHealthRecord,
      addTask,
      updateTaskStatus,
      addOrder,
      addProjectProgress
    }}>
      {children}
    </DataContext.Provider>
  );
};