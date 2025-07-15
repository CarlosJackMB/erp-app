export interface User {
  id: string;
  name: string;
  email: string;
  role: 'personal' | 'admin';
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  description: string;
  type: 'income' | 'expense';
}

export interface HealthRecord {
  id: string;
  date: string;
  weight?: number;
  workout?: string;
  diet?: string;
  supplements?: string[];
  notes?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  assignedTo?: string;
  company: string;
  project?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  orderDate: string;
  company: string;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface ProjectProgress {
  id: string;
  projectName: string;
  date: string;
  progress: number;
  componentsInstalled: ComponentInstalled[];
  incidents: Incident[];
  economicValue: number;
  notes: string;
}

export interface ComponentInstalled {
  type: 'panels' | 'structure' | 'wiring' | 'inverter';
  quantity: number;
  specifications: string;
}

export interface Incident {
  id: string;
  date: string;
  type: 'technical' | 'safety' | 'weather' | 'other';
  description: string;
  severity: 'low' | 'medium' | 'high';
  resolved: boolean;
  images?: string[];
}