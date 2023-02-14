import { useState } from 'react';
import config from '@/config/index';

export const useDefineSample = () => {
  const [loading, setLoading] = useState<boolean>(false);

  return {
    loading,
  };
};
