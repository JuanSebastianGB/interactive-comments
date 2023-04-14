import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import { apiResponse } from '../components/mocks';
import { Comment, CurrentUser } from '../models';

interface ApiState {
  currentUser: CurrentUser;
  comments: Comment[];
}

interface UserContextType {
  apiState: ApiState;
  setApiState: Dispatch<SetStateAction<ApiState>>;
}

export const UserContext = createContext<UserContextType>({
  apiState: {
    comments: [],
    currentUser: { image: { png: '', webp: '' }, username: '' },
  },
  setApiState: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [apiState, setApiState] = useState<ApiState>(() => ({
    comments: apiResponse.comments,
    currentUser: apiResponse.currentUser,
  }));
  return (
    <UserContext.Provider value={{ apiState, setApiState }}>
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
