import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { changePasswordApi, getAllUsers, getProfileApi, updateProfileApi } from "../services/UserServices";
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

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: updateProfileApi,
    onSuccess: (data) => {
      toast.success("Cập nhật thông tin thành công");
      setUser(data?.data);
      localStorage.setItem("user", JSON.stringify(data?.data));
      queryClient.invalidateQueries(["user-profile"]);
    },
    onError: (err) => {
      toast.error("Cập nhật thông tin thất bại");
    }
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePasswordApi,
    onSuccess: (data) => {
      toast.success("Đổi mật khẩu thành công");
    },
    onError: (err) => {
      toast.error("Đổi mật khẩu thất bại");
    },
  });
};