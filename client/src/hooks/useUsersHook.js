import { useQuery } from "@tanstack/react-query";
import { getAllUsers, getProfileApi } from "../services/UserServices";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";


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

export const useGetProfile = () => {
  const { isAuthLoading, setUser } = useAuth();

  return useQuery({
    queryKey: ["user-profile"],
    queryFn: getProfileApi,
    enabled: !isAuthLoading,
    onSuccess: (data) => {
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
    },
    onError: () => {
      toast.error("Không thể lấy thông tin người dùng");
    },
  });
};