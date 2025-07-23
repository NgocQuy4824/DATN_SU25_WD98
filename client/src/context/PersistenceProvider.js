import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toogleAllCart } from "../redux/slides/cartSlice";
import { resetCheckout } from "../redux/slides/checkout";

const cartAllowedPaths = ["/cart", "/shipping", "/checkout"];
const checkoutAllowedPaths = ["/shipping", "/checkout"];

export default function PersistenceProvider({ children }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const checkout = useSelector((state) => state.checkout);
  console.log(checkout);

  useEffect(() => {
    const path = location.pathname;
    // const isCartAllowed = cartAllowedPaths.includes(path);
    const isCheckoutAllowed = checkoutAllowedPaths.includes(path);
    // if (!isCartAllowed && cart?.length > 0) {
    //   dispatch(toogleAllCart([]));
    // }
    if (!isCheckoutAllowed && Object.keys(checkout || {}).length > 0) {
      dispatch(resetCheckout());
    }
  }, [location.pathname]);

  return children;
}
