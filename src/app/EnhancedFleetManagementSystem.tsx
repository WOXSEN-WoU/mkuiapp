'use client';

import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { ToastState } from './types';

// Utility function for className merging
const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

// Enhanced Shadcn UI components
const Button = ({ 
  children, 
  onClick, 
  className, 
  variant = 'default', 
  size = 'default', 
  type = 'button'
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'submit';
  size?: 'default' | 'sm' | 'lg';
  type?: 'button' | 'submit' | 'reset';
}) => (
  <button
    type={type}
    className={clsx(
      "px-4 py-2 rounded-md font-bold text-lg transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-offset-2",
      {
        "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500": variant === 'default' || variant === 'submit',
        "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500": variant === 'destructive',
        "bg-transparent border-2 border-green-600 text-green-600 hover:bg-green-100 focus:ring-green-500": variant === 'outline',
      },
      size === 'sm' && "text-sm px-3 py-1",
      size === 'lg' && "text-xl px-6 py-3",
      className
    )}
    onClick={onClick}
  >
    {children}
  </button>
);

const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={cn(
      "px-4 py-3 bg-white border-2 border-gray-300 rounded-md shadow-sm text-lg focus:outline-none focus:ring-4 focus:ring-green-500 focus:border-green-500",
      className || ""
    )}
    {...props}
  />
);

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("bg-white shadow-lg rounded-lg border-2 border-gray-200", className)}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("px-6 py-5 border-b-2 border-gray-200 bg-gray-50", className)}>
    {children}
  </div>
);

const CardContent = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("px-6 py-5", className)}>
    {children}
  </div>
);

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, fallback, className = ''}) => (
  <div className={cn("w-24 h-24 rounded-full bg-green-100 flex items-center justify-center overflow-hidden border-4 border-green-500", className)}>
    {src ? (
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    ) : (
      <span className="text-green-600 font-bold text-3xl">{fallback}</span>
    )}
  </div>
);

const Badge = ({ children, variant = 'default' }: { children: React.ReactNode; variant?: string }) => (
  <span className={cn(
    "px-3 py-1 rounded-full text-sm font-bold",
    "" + (variant === 'success' && "bg-green-100 text-green-800 border-2 border-green-500"),
    "" + (variant === 'destructive' && "bg-red-100 text-red-800 border-2 border-red-500"),
    "" + (variant === 'warning' && "bg-yellow-100 text-yellow-800 border-2 border-yellow-500"),
    "" + (variant === 'info' && "bg-green-100 text-green-800 border-2 border-green-500")
  )}>
    {children}
  </span>
);

const Progress = ({ value }: { value: number }) => (
  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden border-2 border-gray-300">
    <div 
      className="bg-green-600 h-full rounded-full transition-all duration-500 ease-in-out" 
      style={{ width: `${value}%` }}
    ></div>
  </div>
);

// Toast component for notifications
const Toast = ({ message, type = 'info', onClose }: { message: string; type?: 'info' | 'success' | 'error'; onClose: () => void }) => (
  <div className={cn(
    "fixed bottom-4 right-4 px-6 py-4 rounded-md shadow-lg text-white font-bold animate-fade-in-up",
    type === 'info' ? "bg-green-600" : "",
    type === 'success' ? "bg-green-600" : "",
    type === 'error' ? "bg-red-600" : ""
  )}>
    {message}
    <button onClick={onClose} className="ml-4 text-white">&times;</button>
  </div>
);

// Authentication Modal Component
const AuthModal = ({ isOpen, onClose, onConfirm, title, message }: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (password: string) => void;
  title: string;
  message: string;
}) => {
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="mb-4">{message}</p>
        <Input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4"
        />
        <div className="flex justify-end space-x-4">
          <Button onClick={onClose} variant="outline">Cancel</Button>
          <Button onClick={() => onConfirm(password)}>Confirm</Button>
        </div>
      </div>
    </div>
  );
};

interface Driver {
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


interface Company {
  id: number;
  name: string;
  cars: Car[];
}

interface Car {
  id: number;
  model: string;
  driver: string;
  service: string;
  insureDueDate: string;
  isBrokenDown: boolean;
}

// Main App Component
const App = () => {
  const [currentView, setCurrentView] = useState<string>('login');
  const [userType, setUserType] = useState<'driver' | 'admin' | null>(null);
  const [selectedDriverId, setSelectedDriverId] = useState<number | null>(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(null);
  const [carBreakdowns, setCarBreakdowns] = useState<Record<number, boolean>>({});
  const [toast, setToast] = useState<ToastState | null>(null);
  const [remarks, setRemarks] = useState<Record<number, { text: string; date: string }[]>>({});
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [driverToRemove, setDriverToRemove] = useState<string | null>(null);

  useEffect(() => {
    // Initialize drivers with some data
    const initialDrivers = Array(50).fill(null).map((_, index) => ({
      id: index + 1,
      name: `Driver ${index + 1}`,
      company: ['Alpha Logistics', 'Beta Transport', 'Gamma Shipping', 'Delta Freight'][Math.floor(Math.random() * 4)],
      licenseNumber: `DL${100000 + index}`,
      status: ['Active', 'Inactive'][Math.floor(Math.random() * 2)] as "Active" | "Inactive",
      email: `driver${index + 1}@example.com`,
      phone: `+1 (555) ${100 + index}-${1000 + index}`,
      address: '123 Main St, Anytown, USA',
      hireDate: '2022-01-01',
      performanceRating: (Math.random() * 2 + 3).toFixed(1),
      profilePhoto: `/placeholder-avatar-${index % 5 + 1}.jpg`,
    }));
    setDrivers(initialDrivers.map(driver => ({
      ...driver,
      performanceRating: Number(driver.performanceRating)
    })));
  }, []);

  const showToast = (message: string, type: ToastState['type'] = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogin = (type: 'driver' | 'admin') => {
    setUserType(type);
    setCurrentView(type === 'driver' ? 'driverDashboard' : 'adminDashboard');
    showToast(`Welcome, ${type}!`, 'success');
  };

  const handleLogout = () => {
    setCurrentView(userType === 'driver' ? 'fleetUpload' : 'login');
    setUserType(null);
    showToast('Logged out successfully', 'info');
  };

  const handleFleetUploadSave = () => {
    setCurrentView('login');
    setUserType(null);
    showToast('Fleet upload successful', 'success');
  };

  const handleAdminNavigation = (view: string) => {
    setCurrentView(view);
  };

  const handleViewProfile = (driverId: number) => {
    setSelectedDriverId(driverId);
    setCurrentView('driverProfile');
  };

  const handleViewCompanyDetails = (companyId: number) => {
    setSelectedCompanyId(companyId);
    setCurrentView('companyDetails');
  };

  const handleCarBreakdown = (carId: number, isBrokenDown: boolean) => {
    setCarBreakdowns(prev => ({...prev, [carId]: isBrokenDown}));
    showToast(`Car ${carId} marked as ${isBrokenDown ? 'broken down' : 'operational'}`, 'info');
  };

  const handleAddRemark = (driverId: number, remark: string) => {
    setRemarks(prev => ({
      ...prev,
      [driverId]: [...(prev[driverId] || []), { text: remark, date: new Date().toISOString() }]
    }));
    showToast('Remark added successfully', 'success');
  };

  // Enhanced Login Page Component
  const LoginPage: React.FC<{ onLogin: (type: 'driver' | 'admin') => void }> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState<'driver' | 'admin'>('driver');

    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md transform transition-all duration-300 hover:scale-105">
          <CardHeader>
            <h2 className="text-3xl font-bold text-center text-black">Fleet Management System</h2>
          </CardHeader>
          <CardContent>
            <div className="flex mb-6">
              <button
                className={cn(
                  "flex-1 py-3 text-center text-lg font-bold transition-all duration-200",
                  activeTab === 'driver' ? "border-b-4 border-green-600 text-black" : "text-gray-500 hover:text-green-600"
                )}
                onClick={() => setActiveTab('driver')}
              >
                Driver
              </button>
              <button
                className={cn(
                  "flex-1 py-3 text-center text-lg font-bold transition-all duration-200",
                  activeTab === 'admin' ? "border-b-4 border-green-600 text-black" : "text-gray-500 hover:text-green-600"
                )}
                onClick={() => setActiveTab('admin')}
              >
                Administrator
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); onLogin(activeTab); }} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-lg font-bold text-gray-700 mb-2">Username</label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full"
                  placeholder="Enter your username"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-lg font-bold text-gray-700 mb-2">Password</label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full"
                  placeholder="Enter your password"
                />
              </div>
              <Button type="submit" className="w-full text-xl py-4" variant="submit">
                Log In as {activeTab === 'driver' ? 'Driver' : 'Administrator'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Enhanced Driver Dashboard Component
  const DriverDashboard: React.FC<{ onLogout: () => void; carBreakdowns: Record<number, boolean> }> = ({ onLogout, carBreakdowns }) => {
    const [timeLeft, setTimeLeft] = useState(480); // 8 hours in minutes

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timer);
            return 0;
          }
          return prevTime - 1;
        });
      }, 60000); // update every minute

      return () => clearInterval(timer);
    }, []);

    const formatTime = (minutes: number) => {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
    };

    const progress = ((480 - timeLeft) / 480) * 100;

    const driverInfo = {
      id: 1, // Assuming the logged-in driver has ID 1
      name: "John Doe",
      company: "Alpha Logistics",
      carId: 1,
      carModel: "Sedan",
      carNumber: "TS 30 SU 8999"
    };

    const isBrokenDown = carBreakdowns && carBreakdowns[driverInfo.carId];
    const driverRemarks = remarks[driverInfo.id] || [];

    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl transform transition-all duration-300 hover:scale-105">
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-black">Driver Dashboard</h2>
            <Avatar
              src="/placeholder-avatar-1.jpg"
              alt={driverInfo.name}
              fallback={driverInfo.name.split(' ').map(n => n[0]).join('')}
            />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-black">{driverInfo.name}</h3>
              <p className="text-lg text-gray-600">{driverInfo.company}</p>
            </div>
            <div className="bg-green-100 p-6 rounded-lg shadow-inner transform transition-all duration-300 hover:scale-105">
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-black">Time Remaining to Logout</span>
                <span className="text-4xl font-bold text-green-600 animate-pulse">{formatTime(timeLeft)}</span>
              </div>
              <Progress value={progress} />
              <p className="mt-2 text-lg text-green-700 text-center">
                {progress < 50 ? "You're doing great! Keep up the good work!" : "Almost there! Finish strong!"}
              </p>
            </div>
            <Card>
              <CardContent className="flex flex-col items-center py-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                </svg>
                <span className="text-xl font-bold text-black">{driverInfo.carModel}</span>
                <span className="text-lg text-gray-600">Car ID: {driverInfo.carId}</span>
                <span className="text-xl font-bold mt-2 text-green-600">{driverInfo.carNumber}</span>
              </CardContent>
            </Card>
            {isBrokenDown && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 flex items-center rounded-md animate-bounce" role="alert">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="text-lg font-bold">Your vehicle is marked as broken down. Please contact your supervisor immediately.</span>
              </div>
            )}
            {driverRemarks.length > 0 && (
              <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md">
                <h4 className="text-lg font-bold mb-2">Recent Remarks:</h4>
                {driverRemarks.slice(-3).map((remark, index) => (
                  <p key={index} className="mb-1">
                    <span className="font-semibold">{new Date(remark.date).toLocaleDateString()}:</span> {remark.text}
                  </p>
                ))}
              </div>
            )}
            <Button className="w-full text-xl py-4" onClick={onLogout}>Log Out</Button>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Enhanced Fleet Upload Component
  const FleetUpload: React.FC<{ onSave: () => void }> = ({ onSave }) => {
    const [image, setImage] = useState<File | null>(null);
    const [fleetCount, setFleetCount] = useState('');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setImage(e.target.files[0]);
      }
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Here you would typically upload the image and send the fleet count
      console.log('Image:', image);
      console.log('Fleet count:', fleetCount);
      onSave();
    };

    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl transform transition-all duration-300 hover:scale-105">
          <CardHeader>
            <h2 className="text-3xl font-bold text-center text-black">Fleet Upload</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="image-upload" className="block text-xl font-bold text-gray-700 mb-2">Upload Image</label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-lg p-2 border-2 border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="fleet-count" className="block text-xl font-bold text-gray-700 mb-2">Number of Fleets Done</label>
                <Input
                  id="fleet-count"
                  type="number"
                  value={fleetCount}
                  onChange={(e) => setFleetCount(e.target.value)}
                  className="w-full"
                  required
                />
              </div>
              <button type="submit" className="w-full text-xl py-4">
                <Button className="w-full">Save and Upload</Button>
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Enhanced Admin Dashboard Component
  const AdminDashboard: React.FC<{ onNavigate: (view: string) => void; onLogout: () => void }> = ({ onNavigate, onLogout }) => {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-center p-4">
        <Card className="w-full max-w-2xl mx-auto transform transition-all duration-300 hover:scale-105">
          <CardHeader>
            <h2 className="text-3xl font-bold text-center text-black">Admin Dashboard</h2>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button 
              onClick={() => onNavigate('companyList')} 
              className="w-full text-2xl py-8 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Manage Companies
            </Button>
            <Button 
              onClick={() => onNavigate('driverManagement')} 
              className="w-full text-2xl py-8 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Manage Drivers
            </Button>
            <Button 
              onClick={onLogout} 
              variant="outline" 
              className="w-full text-xl py-4 mt-8 border-2 border-red-500 text-red-500 hover:bg-red-50"
            >
              Log Out
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Enhanced Company List Component
  const CompanyList: React.FC<{ onBack: () => void; onSelectCompany: (id: number) => void }> = ({ onBack, onSelectCompany }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const companies = [
      { id: 1, name: 'Alpha Logistics', location: 'New York, NY' },
      { id: 2, name: 'Beta Transport', location: 'Los Angeles, CA' },
      { id: 3, name: 'Gamma Shipping', location: 'Chicago, IL' },
      { id: 4, name: 'Delta Freight', location: 'Houston, TX' },
      { id: 5, name: 'Epsilon Carriers', location: 'Phoenix, AZ' },
      { id: 6, name: 'Zeta Movers', location: 'Philadelphia, PA' },
      { id: 7, name: 'Eta Express', location: 'San Antonio, TX' },
      { id: 8, name: 'Theta Transit', location: 'San Diego, CA' },
      { id: 9, name: 'Iota Transport', location: 'Dallas, TX' },
    ];


    const filteredCompanies = companies.filter(company =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="container mx-auto py-10 px-4">
        <Card className="w-full transform transition-all duration-300 hover:scale-105">
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-black">Company List</h2>
            <Button variant="outline" onClick={onBack} size="lg">
              Back to Dashboard
            </Button>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <Input
                type="text"
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xl"
              />
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-lg font-bold text-gray-700 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-lg font-bold text-gray-700 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-lg font-bold text-gray-700 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-lg font-bold text-gray-700 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCompanies.map((company) => (
                    <tr key={company.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-900">{company.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-700">{company.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-700">{company.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-lg font-medium">
                        <Button variant="default" onClick={() => onSelectCompany(company.id)} size="lg">
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Enhanced Company Details Component
  const CompanyDetails: React.FC<{ companyId: number; onBack: () => void; onCarBreakdown: (carId: number, isBrokenDown: boolean) => void }> = ({ companyId, onBack, onCarBreakdown }) => {
    const [company, setCompany] = useState<Company | null>(null);

    useEffect(() => {
      // Simulating API call to fetch company details
      setCompany({
        id: companyId,
        name: `Company ${companyId}`,
        cars: Array(5).fill(null).map((_, index) => ({
          id: index + 1,
          model: ['Sedan', 'SUV', 'Van', 'Truck'][Math.floor(Math.random() * 4)],
          driver: `Driver ${index + 1}`,
          service: ['Delivery', 'Passenger', 'Freight'][Math.floor(Math.random() * 3)],
          insureDueDate: new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          isBrokenDown: false
        }))
      });
    }, [companyId]);

    if (!company) {
      return <div className="text-center text-2xl font-bold text-green-600">Loading...</div>;
    }

    const handleBreakdownToggle = (carId: number) => {
      setCompany(prevCompany => {
        if (!prevCompany) return null;
        return {
          ...prevCompany,
          cars: prevCompany.cars.map(car => 
            car.id === carId ? {...car, isBrokenDown: !car.isBrokenDown} : car
          )
        };
      });
      const updatedCar = company.cars.find(car => car.id === carId);
      if (updatedCar) {
        onCarBreakdown(carId, !updatedCar.isBrokenDown);
      }
    };

    return (
      <div className="container mx-auto py-10 px-4">
        <Card className="w-full transform transition-all duration-300 hover:scale-105">
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-black">{company.name} Details</h2>
            <Button variant="outline" onClick={onBack} size="lg">
              Back to Company List
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-lg font-bold text-gray-700 uppercase tracking-wider">Car ID</th>
                    <th className="px-6 py-3 text-left text-lg font-bold text-gray-700 uppercase tracking-wider">Model</th>
                    <th className="px-6 py-3 text-left text-lg font-bold text-gray-700 uppercase tracking-wider">Driver</th>
                    <th className="px-6 py-3 text-left text-lg font-bold text-gray-700 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-3 text-left text-lg font-bold text-gray-700 uppercase tracking-wider">Insurance Due Date</th>
                    <th className="px-6 py-3 text-left text-lg font-bold text-gray-700 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-lg font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {company.cars.map((car) => (
                    <tr key={car.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-900">{car.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-700">{car.model}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-700">{car.driver}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-700">{car.service}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-700">{car.insureDueDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-700">
                        <Badge variant={car.isBrokenDown ? 'destructive' : 'success'}>
                          {car.isBrokenDown ? 'Broken Down' : 'Operational'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg font-medium">
                        <Button 
                          variant={car.isBrokenDown ? 'outline' : 'destructive'} 
                          size="lg"
                          onClick={() => handleBreakdownToggle(car.id)}
                        >
                          {car.isBrokenDown ? 'Mark as Operational' : 'Mark as Broken Down'}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Enhanced Driver Management Component
  const DriverManagement: React.FC<{ onBack: () => void; onViewProfile: (id: number) => void }> = ({ onBack, onViewProfile }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortColumn, setSortColumn] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');
    const [statusFilter, setStatusFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const itemsPerPage = 10;

    const filteredDrivers = drivers.filter(driver =>
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === 'All' || driver.status === statusFilter)
    );

    const sortedDrivers = [...filteredDrivers].sort((a, b) => {
      if (a[sortColumn as keyof Driver] < b[sortColumn as keyof Driver]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortColumn as keyof Driver] > b[sortColumn as keyof Driver]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    const paginatedDrivers = sortedDrivers.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(sortedDrivers.length / itemsPerPage);

    const handleSort = (column: string) => {
      if (column === sortColumn) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        setSortColumn(column);
        setSortDirection('asc');
      }
    };

    const handleRemoveDriver = (driverId: string) => {
      setDriverToRemove(driverId);
      setIsAuthModalOpen(true);
    };

    const confirmRemoveDriver = (password: string) => {
      // In a real application, you would verify the password here
      if (password === 'admin') { // Example password
        if (driverToRemove !== null) {
          setDrivers(drivers.filter(driver => driver.id !== Number(driverToRemove)));
          showToast(`Driver ${driverToRemove} removed successfully`, 'success');
        }
        setIsAuthModalOpen(false);
        setDriverToRemove(null);
      } else {
        showToast('Invalid password', 'error');
      }
    };

    const handleToggleDriverStatus = (driverId: number) => {
      setDrivers(drivers.map(driver => 
        driver.id === driverId 
          ? {...driver, status: driver.status === 'Active' ? 'Inactive' : 'Active'}
          : driver
      ));
      const updatedDriver = drivers.find(driver => driver.id === driverId);
      if (updatedDriver) {
        showToast(`Driver ${driverId} status changed to ${updatedDriver.status === 'Active' ? 'Inactive' : 'Active'}`, 'info');
      }
    };

    return (
      <div className="container mx-auto py-10 px-4">
        <Card className="w-full transform transition-all duration-300 hover:scale-105">
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-black">Driver Management</h2>
            <Button variant="outline" onClick={onBack} size="lg">
              Back to Dashboard
            </Button>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex flex-wrap gap-4">
              <Input
                type="text"
                placeholder="Search drivers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow text-xl"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 bg-white border-2 border-gray-300 rounded-md shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-lg font-bold text-gray-700 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-lg font-bold text-gray-700 uppercase tracking-wider">
                      <button onClick={() => handleSort('name')} className="flex items-center">
                        Name
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-lg font-bold text-gray-700 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-3 text-left text-lg font-bold text-gray-700 uppercase tracking-wider">License</th>
                    <th className="px-6 py-3 text-left text-lg font-bold text-gray-700 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-lg font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedDrivers.map((driver) => (
                    <tr key={driver.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-900">{driver.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-700">{driver.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-700">{driver.company}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-700">{driver.licenseNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-700">
                        <Badge variant={driver.status === 'Active' ? 'success' : 'destructive'}>
                          {driver.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg font-medium">
                        <div className="flex space-x-2">
                          <Button variant="outline" onClick={() => onViewProfile(driver.id)} size="sm">
                            View Profile
                          </Button>
                          <Button 
                            variant={driver.status === 'Active' ? 'destructive' : 'outline'} 
                            size="sm"
                            onClick={() => handleToggleDriverStatus(driver.id)}
                          >
                            {driver.status === 'Active' ? 'Deactivate' : 'Activate'}
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleRemoveDriver(driver.id.toString())}
                          >
                            Remove
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 flex justify-between items-center">
              <div>
                <span className="text-lg text-gray-700">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, sortedDrivers.length)} of {sortedDrivers.length} results
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className={currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}
                  size="lg"
                >
                  Previous
                </Button>
                <Button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className={currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}
                  size="lg"
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onConfirm={(password: string) => confirmRemoveDriver(password)}
          title="Confirm Driver Removal"
          message="Please enter your admin password to remove this driver."
        />
      </div>
    );
  };

  // Enhanced Driver Profile Component
  const DriverProfile: React.FC<{ driverId: number; onBack: () => void }> = ({ driverId, onBack }) => {
    const [driver, setDriver] = useState<Driver | null>(null);
    const [newRemark, setNewRemark] = useState('');

    useEffect(() => {
      const foundDriver = drivers.find(d => d.id === driverId);
      if (foundDriver) {
        setDriver(foundDriver);
      }
    }, [driverId, drivers]);

    if (!driver) {
      return <div className="text-center text-2xl font-bold text-green-600">Loading...</div>;
    }

    const handleAddNewRemark = () => {
      if (newRemark.trim()) {
        handleAddRemark(driver.id, newRemark);
        setNewRemark('');
      }
    };

    return (
      <div className="container mx-auto py-10 px-4">
        <Card className="w-full max-w-4xl mx-auto transform transition-all duration-300 hover:scale-105">
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-black">Driver Profile</h2>
            <Button variant="outline" onClick={onBack} size="lg">
              Back to Driver List
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center mb-6">
              <Avatar
                src={driver.profilePhoto}
                alt={driver.name}
                fallback={driver.name.split(' ').map(n => n[0]).join('')}
                className="w-32 h-32 mb-4"
              />
              <h3 className="text-2xl font-semibold text-black">{driver.name}</h3>
              <Badge variant={driver.status === 'Active' ? 'success' : 'destructive'}>
                {driver.status}
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-black">Personal Information</h3>
                <div className="space-y-3">
                  <p className="text-lg"><strong className="font-bold">Email:</strong> {driver.email}</p>
                  <p className="text-lg"><strong className="font-bold">Phone:</strong> {driver.phone}</p>
                  <p className="text-lg"><strong className="font-bold">Address:</strong> {driver.address}</p>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-black">Employment Information</h3>
                <div className="space-y-3">
                  <p className="text-lg"><strong className="font-bold">Company:</strong> {driver.company}</p>
                  <p className="text-lg"><strong className="font-bold">License Number:</strong> {driver.licenseNumber}</p>
                  <p className="text-lg"><strong className="font-bold">Hire Date:</strong> {driver.hireDate}</p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-2xl font-semibold mb-4 text-black">Performance</h3>
              <p className="text-lg mb-2"><strong className="font-bold">Rating:</strong> {driver.performanceRating} / 5</p>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-green-600 h-4 rounded-full transition-all duration-500 ease-in-out" 
                  style={{ width: `${(driver.performanceRating / 5) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-2xl font-semibold mb-4 text-black">Remarks</h3>
              <div className="space-y-4">
                {remarks[driver.id]?.map((remark, index) => (
                  <div key={index} className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-lg">{remark.text}</p>
                    <p className="text-sm text-gray-500 mt-2">{new Date(remark.date).toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex space-x-4">
                <Input
                  type="text"
                  value={newRemark}
                  onChange={(e) =>
                  setNewRemark(e.target.value)}
                  placeholder="Add a new remark..."
                  className="flex-grow"
                />
                <Button onClick={handleAddNewRemark}>Add Remark</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderView = () => {
    switch (currentView) {
      case 'login':
        return <LoginPage onLogin={handleLogin} />;
      case 'driverDashboard':
        return <DriverDashboard onLogout={handleLogout} carBreakdowns={carBreakdowns} />;
      case 'fleetUpload':
        return <FleetUpload onSave={handleFleetUploadSave} />;
      case 'adminDashboard':
        return <AdminDashboard onNavigate={handleAdminNavigation} onLogout={handleLogout} />;
      case 'companyList':
        return <CompanyList onBack={() => setCurrentView('adminDashboard')} onSelectCompany={handleViewCompanyDetails} />;
      case 'companyDetails':
        return selectedCompanyId ? (
          <CompanyDetails 
            companyId={selectedCompanyId} 
            onBack={() => setCurrentView('companyList')} 
            onCarBreakdown={handleCarBreakdown} 
          />
        ) : null;
      case 'driverManagement':
        return <DriverManagement onBack={() => setCurrentView('adminDashboard')} onViewProfile={handleViewProfile} />;
      case 'driverProfile':
        return selectedDriverId ? (
          <DriverProfile 
            driverId={selectedDriverId} 
            onBack={() => setCurrentView('driverManagement')} 
          />
        ) : null;
      default:
        return <LoginPage onLogin={handleLogin} />;
    }
  };

  return (
    <div className="app-container min-h-screen bg-white">
      {renderView()}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  );
};

export default App;