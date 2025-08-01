import { useQuery } from '@tanstack/react-query';
import statsService from '../services/StatServices';

export const useGetPendingTask = () => {
    return useQuery({
        queryKey: ["PENDING_TASK"],
        queryFn: () => statsService.getPendingTask(),
    });
};
