import { createContext, useContext, useState } from 'react';
import { apiResponse } from '../components/mocks';
import { CurrentUser } from '../models';

interface ContextInterface {
  currentUser: CurrentUser;
}
export const UserContext = createContext<ContextInterface>(
  {} as ContextInterface
);

interface Props {
  children: React.ReactNode;
}

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(apiResponse.currentUser);
  return (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
