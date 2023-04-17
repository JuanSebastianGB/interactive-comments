import { createContext, useContext, useReducer } from 'react';
import { apiResponse } from '../components';
import { UserContextType } from '../models/context.model';
import { initialState, reducer } from '../reducers/reducer';

export const UserContext = createContext<UserContextType>({
  apiState: initialState,
  dispatch: () => {},
});

interface Props {
  children: React.ReactNode;
}

const getInitialState = () => {
  const localData = localStorage.getItem('localStorageData');
  return localData ? JSON.parse(localData) : apiResponse;
};

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [apiState, dispatch] = useReducer(reducer, getInitialState());
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
