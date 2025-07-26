import { useEffect, useState } from 'react';
import { useGetAllCategory } from './useCategoryHook';

export const useCategoryOptions = () => {
  const [options, setOptions] = useState([]);
  const { data: response = [], isLoading } = useGetAllCategory();

  useEffect(() => {
    if (response?.data) {
      setOptions(response.data.map(cat => ({
        label: cat.name,
        value: cat._id,
      })));
    }
  }, [response]);

  return { options, isLoading };
};
