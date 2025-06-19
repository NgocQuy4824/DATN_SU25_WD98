import { useEffect, useState } from "react";
import { useGetAllSizes } from "./useSizeHook";
import { useMemo } from "react";

export const useSizeOptions = () => {
  const [options, setOptions] = useState([]);
  const { data: response = [], isLoading } = useGetAllSizes();

  useEffect(() => {
    if (response?.data) {
      setOptions(response.data.map(size => ({
        label: size.name,
        value: size._id,
      })));
    }
  }, [response]);

  const sizeMap = useMemo(() => {
    return options.reduce((map, opt) => {
      map[opt.value] = opt.label;
      return map;
    }, {});
  }, [options]);


  return { options,sizeMap, isLoading };
};
