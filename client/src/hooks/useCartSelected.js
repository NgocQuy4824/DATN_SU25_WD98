import { useState, useMemo } from "react";

export default function useCartSelection(items) {
    const [selectedItems, setSelectedItems] = useState([]);

    const allItemIds = useMemo(() => items.map(item => item.variantId), [items]);
    //check xem số lượng item đang chọn có bằng đúng số lượng item có trong giỏ hàng k
    const isAllSelected = selectedItems.length === allItemIds.length && allItemIds.length > 0;
    //nếu checked = true thì setSelectedItems = tất cả Id còn không thì = []
    const toggleSelectAll = (checked) => {
        setSelectedItems(checked ? allItemIds : []);
    };

    const clearSelection = () => setSelectedItems([]);

    return {
        selectedItems,
        isAllSelected,
        toggleSelectAll,
        clearSelection,
    };
}
