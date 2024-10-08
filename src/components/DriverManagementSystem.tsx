'use client';  // Add this line at the top of the file

import React, { useState } from 'react';
import Image from 'next/image';

// Define the Driver type or import it from a shared types file
type Driver = {
  id: number;
  name: string;
  // Add other properties as needed
};

const DriverManagementSystem: React.FC = () => {
  const [drivers] = useState<Driver[]>([]); // Remove setDrivers if not used

  return (
    <div>
      <Image src="/path-to-image.jpg" alt="Description" width={500} height={300} />
      
      {drivers.map(driver => (
        <div key={driver.id}>{driver.name}</div>
      ))}
    </div>
  );
};

export default DriverManagementSystem;