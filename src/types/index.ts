export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user' | 'auditor';
  department: string;
  position: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  managerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Position {
  id: string;
  name: string;
  code: string;
  description: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface Organization {
  id: string;
  name: string;
  code: string;
  type: 'federal' | 'state' | 'municipal';
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  phone: string;
  email: string;
  departments: Department[];
  createdAt: string;
  updatedAt: string;
}

export interface DemandItem {
  description: string;
  unit: string;
  quantity: number;
}

export interface DemandLog {
  id: string;
  demandId: string;
  userId: string;
  action: 'created' | 'updated' | 'approved' | 'rejected';
  description: string;
  createdAt: string;
}

export interface DemandApproval {
  id: string;
  demandId: string;
  approverId: string;
  status: 'pending' | 'approved' | 'rejected';
  comments?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Demand {
  id: string;
  departmentId: string;
  requesterId: string;
  type: 'acquisition' | 'service';
  object: string;
  description: string;
  items: DemandItem[];
  estimatedValue: number;
  justification: string;
  quantityJustification: string;
  priority: 'low' | 'medium' | 'high';
  deliveryLocation: string;
  deliveryDeadline: string;
  supervisorId: string;
  status: 'draft' | 'pending_approval' | 'approved' | 'rejected';
  currentApprover?: string;
  approvalHistory?: DemandApproval[];
  logs?: DemandLog[];
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  link?: string;
  createdAt: string;
}