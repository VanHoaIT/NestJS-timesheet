import React, { createContext, ReactNode, useContext, useState } from "react";

interface User {
  createdAt: Date;
  createdBy?: string;
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  updatedAt?: Date;
  updatedBy?: string;
  branch?: {
    name: string;
  };
  level?: string;
  postition?: string;
  type?: string;
}
interface UserContextType {
  userData: User | null;
  setUserData: (data: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const UseUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
