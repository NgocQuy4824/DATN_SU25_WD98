import API from "../config/app";

// Lấy tất cả voucher 
export const getAllVoucher = async () => {
  const response = await API.get("/vouchers/get-all");
  const sortedData = {
    ...response.data,
    data: [...response.data.data].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    ),
  };
  return sortedData;
};

// Lấy chi tiết 1 voucher 
export const getDetailVoucher = async (id) => {
  const response = await API.get(`/vouchers/get-detail/${id}`);
  return { ...response.data };
};

//  Tạo 1 voucher mới 
export const createVoucher = async (voucherData) => {
  const accessToken = localStorage.getItem('accessToken');

  const response = await API.post("/vouchers/create", voucherData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return { ...response.data };
};

//  Cập nhật voucher theo id 
export const updateVoucher = async (id, updateData) => {
  const accessToken = localStorage.getItem('accessToken');

  const response = await API.put(`/vouchers/update/${id}`, updateData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return { ...response.data };
};

// Xóa voucher theo id
export const deleteVoucher = async (id) => {
  const accessToken = localStorage.getItem('accessToken');

  const response = await API.delete(`/vouchers/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return { ...response.data };
};

// Tạo hàng loạt voucher 
export const generateVouchers = async (configData) => {
  const accessToken = localStorage.getItem('accessToken');

  const response = await API.post("/vouchers/generate", configData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return { ...response.data };
};
