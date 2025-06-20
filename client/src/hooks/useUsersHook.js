import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/UserServices";
import { toast } from "react-toastify";


export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
    staleTime: 5 * 60 * 1000,
    
    onError: (err) => {
      toast.error('Lấy danh sách người dùng thất bại');
      console.error(err);
    }
  });
};