import { createContext, useContext, useReducer } from 'react';
import { getInitialStateFromStorage } from '../helpers';
import { UserContextType } from '../models/context.model';
import { initialState, reducer } from '../reducers/reducer';

export const UserContext = createContext<UserContextType>({
  apiState: initialState,
  dispatch: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [apiState, dispatch] = useReducer(
    reducer,
    getInitialStateFromStorage()
  );
  return (
    <UserContext.Provider value={{ apiState, dispatch }}>
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
