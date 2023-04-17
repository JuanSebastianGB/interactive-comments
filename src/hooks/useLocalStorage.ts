import { useEffect } from 'react';
import { useUserContext } from '../context';

export const useLocalStorage = () => {
  const { apiState, dispatch } = useUserContext();
  useEffect(() => {
    localStorage.setItem('localStorageData', JSON.stringify(apiState));
  }, [apiState]);
  return { apiState, dispatch };
};
