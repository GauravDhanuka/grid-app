import apiClient from './apiClient';

export const getGridConfig = async (example: string) => {
  const response = await apiClient.get('/config', {
    params: { example },
  });
  return response.data;
};

export const getGridData = async (example: string) => {
  const response = await apiClient.get('/data', {
    params: { example },
  });
  return response.data;
};
