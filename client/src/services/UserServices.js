import API from "../config/app";

// Lấy tất cả user
export const getAllUsers = async () => {
  const response = await API.get("/user/all");
  const sortedData = {
    ...response.data,
    data: [...response.data.data].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    ),
  };
  return sortedData;
};

// Lấy thông tin user hiện tại
export const getProfileApi = async () => {
  const response = await API.get("/user/profile");
  return { ...response.data };
};

// Cập nhật thông tin user + avatar
export const updateProfileApi = async (formData) => {
  try {
    const response = await API.patch("/user/update-profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    return {
      status: "ERROR",
      message: error.response?.data?.message || "Cập nhật thất bại",
    };
  }
};
