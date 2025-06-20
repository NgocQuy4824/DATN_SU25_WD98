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