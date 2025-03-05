import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

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
    displayName: string;
  };
  level?: {
    name: string;
  };
  position?: {
    name: string;
  };
  type?: {
    name: string;
  };
}

interface UserContextType {
  userData: User | null;
  setUserData: (data: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<User | null>(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (userData) {
      sessionStorage.setItem("user", JSON.stringify(userData));
    } else {
      sessionStorage.removeItem("user");
    }
  }, [userData]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const UseUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("UseUser must be used within a UserProvider");
  }
  return context;
};
