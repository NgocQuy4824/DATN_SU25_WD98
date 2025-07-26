import API from "../config/app";


export const getAllUsers = async () => {
    const response = await API.get("/user/all");
    const sortedData = {
        ...response.data,
        data: [...response.data.data].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ),
    };
    return sortedData;
}

export const getProfileApi = async () => {
  const response = await API.get("/user/profile");
  return { ...response.data };
};

export const updateProfileApi = async (data) => {
  const response = await API.patch("/user/update-profile", data);
  return { ...response.data };
}

export const changePasswordApi = async (data) => {
  const response = await API.patch("/user/change-password", data);
  return { ...response.data };
} 