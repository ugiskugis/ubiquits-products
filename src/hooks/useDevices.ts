import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Device } from '../types';

const fetchDevices = async (): Promise<Device[]> => {
  const { data } = await axios.get('https://static.ui.com/fingerprint/ui/public.json');
  return data.devices;
};

export const useDevices = () => {
  return useQuery<Device[], Error>({
    queryKey: ['devices'],
    queryFn: fetchDevices,
  });
};