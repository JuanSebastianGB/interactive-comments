import { apiResponse } from '../components';

export const getInitialStateFromStorage = () => {
  const localData = localStorage.getItem('localStorageData');
  const recoveredData = JSON.parse(localData || '{}');
  const isDataStored =
    Object.keys(recoveredData?.currentUser ?? {}).length !== 0;
  if (isDataStored) return JSON.parse(localData as string);
  return apiResponse ?? {};
};
