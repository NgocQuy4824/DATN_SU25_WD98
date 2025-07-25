import { useQuery } from '@tanstack/react-query';
import statsService from '../services/StatServices';

export const UseRangePicker = (startDate, endDate) => {
    return useQuery({
        queryKey: ["DATE_RANGE", startDate, endDate],
        queryFn: () => statsService.getOrderAndRevenueByRange(startDate, endDate),
        enabled: !!startDate && !!endDate,
    });
};
