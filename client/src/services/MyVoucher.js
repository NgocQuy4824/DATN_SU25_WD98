import API from "../config/app";

// Nhận voucher
export const claimVoucher = async (voucherCode) => {
  const accessToken = localStorage.getItem("accessToken");

  const response = await API.post(
    "/my-vouchers/claim",
    { voucherCode },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return { ...response.data };
};

// Lấy danh sách voucher của người dùng
export const getUserVouchers = async () => {
  const accessToken = localStorage.getItem("accessToken");

  const response = await API.get("/my-vouchers/all", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return { ...response.data };
};

// Cập nhật số lượng voucher 
export const updateVoucherQuantity = async (voucherId) => {
  const accessToken = localStorage.getItem("accessToken");

  const response = await API.post(
    "/my-vouchers/update",
    { voucherId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return { ...response.data };
};
