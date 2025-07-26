import API from "../config/app";


export const getAllSizes = async () => {
    const response = await API.get("/size/getAll");
    const sortedData = {
        ...response.data,
        data: [...response.data.data].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ),
    };
    return sortedData;
}

export const createSize = async (sizeData) => {
    const response = await API.post('/size/create', sizeData);
    return response.data;
};

export const updateSizeById = async (id, updatedData) => {
    const response = await API.put(`/size/update/${id}`, updatedData);
    return response.data;
};