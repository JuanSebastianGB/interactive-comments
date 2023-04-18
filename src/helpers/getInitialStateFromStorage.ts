import { apiResponse } from '../components';

export const getInitialStateFromStorage = () => {
  const localData = localStorage.getItem('localStorageData');
  try {
    JSON.parse(localData as string);
  } catch (e) {
    return {};
  }
  const recoveredData = JSON.parse(localData || '{}');
  if (typeof recoveredData !== 'object') return {};
  const isDataStored =
    Object.keys(recoveredData?.currentUser ?? {}).length !== 0;
  if (typeof recoveredData?.currentUser === 'string') return {};
  if (isDataStored) return JSON.parse(localData as string);
  return apiResponse ?? {};
};
