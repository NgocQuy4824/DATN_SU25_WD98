// Kiểm tra biến thể không bị trùng
export const validateDuplicateVariant = (getFieldValue, index) => {
  return (_, value) => {
    const variants = getFieldValue('variants') || [];
    const current = variants[index];

    // Nếu chưa nhập xong thì bỏ qua
    if (!current || !current.color || !current.size) return Promise.resolve();

    const isDuplicate = variants.some((v, i) => {
      if (i === index || !v || !v.color || !v.size) return false;
      return v.color === current.color && v.size === current.size;
    });

    return isDuplicate
      ? Promise.reject(new Error('Đã tồn tại biến thể với màu và kích thước này'))
      : Promise.resolve();
  };
};

// Kiểm tra ít nhất có 1 biến thể
export const validateVariants = (_, variants) =>
  Array.isArray(variants) && variants.length > 0
    ? Promise.resolve()
    : Promise.reject(new Error('Vui lòng thêm ít nhất một biến thể'));
