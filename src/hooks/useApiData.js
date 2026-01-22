// src/hooks/useApiData.js
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const apiClient = axios.create({
  timeout: 10000,
});

export const useApiData = (queryKey, url, options = {}) => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      try {
        const response = await apiClient.get(url);
        return response.data;
      } catch (error) {
        throw new Error(`Failed to fetch ${queryKey} data: ${error.message}`);
      }
    },
    retry: 2,
    staleTime: 300000, // 5 minutes
    ...options,
  });
};