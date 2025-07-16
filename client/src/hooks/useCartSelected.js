import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  selectItem,
  toogleAllCart,
  updateQuantityItemCart,
} from "../redux/slides/cartSlice";

export default function useCartSelection() {
  // REDUX STATE
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  // FUNCTION
  const toogleSelectAll = (items) => {
    const newItems = items.map((item) => {
      return {
        variantId: item.variantId,
        quantity: item.quantity,
      };
    });

    dispatch(toogleAllCart(newItems));
  };

  const handleSelectItem = (item) => {
    dispatch(
      selectItem({
        variantId: item.variantId,
        quantity: item.quantity,
      })
    );
  };

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
  };

  const handleUpdateQuantity = (productId, quantity) => {
    dispatch(
      updateQuantityItemCart({
        variantId: productId,
        quantity: quantity,
      })
    );
  };
  // Constant

  const existsVariantId = cartItems.map((item) => item.variantId);

  return {
    cartItems,
    handleUpdateQuantity,
    toogleSelectAll,
    existsVariantId,
    handleSelectItem,
    handleRemoveItem,
  };
}
