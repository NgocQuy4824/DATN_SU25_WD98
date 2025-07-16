import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toogleAllCart } from "../redux/slides/cartSlice";

export default function useCartSelection() {
  const cartItems = useSelector((state) => state);
  const dispatch = useDispatch();
  //   const allItemIds = useMemo(
  //     () => items.map((item) => item.variantId),
  //     [items]
  //   );

  const toogleSelectAll = (items) => {
    dispatch(toogleAllCart(items));
  };
  //check xem số lượng item đang chọn có bằng đúng số lượng item có trong giỏ hàng k
  //   const isAllSelected =
  //     selectedItems.length === allItemIds.length && allItemIds.length > 0;
  //nếu checked = true thì setSelectedItems = tất cả Id còn không thì = []
  //   const toggleSelectAll = (checked) => {
  //     setSelectedItems(checked ? allItemIds : []);
  //   };

  //   const clearSelection = () => setSelectedItems([]);

  return {
    cartItems,
    toogleSelectAll,
    // isAllSelected,
    // toggleSelectAll,
    // clearSelection,
  };
}
