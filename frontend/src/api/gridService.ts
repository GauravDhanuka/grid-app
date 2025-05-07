import apiClient from './apiClient';

export const getGridConfig = async () => {
  const response = await apiClient.get('/config');
  return response.data;
};

export const getGridData = async () => {
  const response = await apiClient.get('/data');
  return response.data;
};
