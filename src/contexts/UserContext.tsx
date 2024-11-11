import { createContext, useContext, useState, useEffect } from 'react';

type User = 'YtoS' | 'StoY';

interface UserContextType {
  currentUser: User | null;
  setCurrentUser: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('currentUser');
    return (saved as User) || null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', currentUser);
    }
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
