import { apiResponse } from '../components';

const checkLocalStorageData = (localData: string | null) =>
  !!JSON.parse(localData || '{}')?.currentUser;

export const getInitialStateFromStorage = () => {
  const localData = localStorage.getItem('localStorageData');
  if (checkLocalStorageData(localData)) return JSON.parse(localData as string);
  return apiResponse ?? {};
};
