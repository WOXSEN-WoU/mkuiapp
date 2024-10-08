export interface ToastState {
  message: string;
  type: 'info' | 'success' | 'error';
}

export interface Driver {
  id: number;
  name: string;
  company: string;
  licenseNumber: string;
  status: 'Active' | 'Inactive';
  email: string;
  phone: string;
  address: string;
  hireDate: string;
  performanceRating: number;
  profilePhoto: string;
}

export interface Company {
  id: number;
  name: string;
  cars: Car[];
}

export interface Car {
  id: number;
  model: string;
  driver: string;
  service: string;
  insureDueDate: string;
  isBrokenDown: boolean;
}

export interface Remark {
  text: string;
  date: string;
}