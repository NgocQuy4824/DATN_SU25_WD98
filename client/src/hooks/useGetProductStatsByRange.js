import { useQuery } from '@tanstack/react-query';
import statsService from '../services/StatServices';

const useGetProductStatsByRange = (startDate, endDate) => {
    return useQuery({
        queryKey: ["PRODUCT_STATS", startDate, endDate],
        queryFn: () => statsService.getProductByRange(startDate, endDate),
    });
};

export default useGetProductStatsByRange;
