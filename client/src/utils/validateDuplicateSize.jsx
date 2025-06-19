export const validateVariants = (_, variants) =>
    variants && variants.length > 0
        ? Promise.resolve()
        : Promise.reject(new Error('Vui lòng thêm ít nhất một biến thể'));



export const validateDuplicateVariant = (getFieldValue, index) => {
    return (_, value) => {
        const variants = getFieldValue('variants') || [];
        const current = variants[index];
        if (!current?.color || !current?.size) return Promise.resolve();

        const isDuplicate = variants.some(
            (v, i) => i !== index && v.color === current.color && v.size === current.size
        );

        return isDuplicate
            ? Promise.reject(new Error('Đã tồn tại biến thể với màu và kích thước này'))
            : Promise.resolve();
    };
};

