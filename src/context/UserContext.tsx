import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  customer: string;
  area: string;
  setUserData: (customer: string, area: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [customer, setCustomer] = useState('');
  const [area, setArea] = useState('');

  const setUserData = (newCustomer: string, newArea: string) => {
    setCustomer(newCustomer);
    setArea(newArea);
  };

  return (
    <UserContext.Provider value={{ customer, area, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};
