// context/CartPersistenceProvider.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toogleAllCart } from "../redux/slides/cartSlice";

export default function CartPersistenceProvider({ children }) {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const allowedPaths = ["/cart", "/checkout"];
    const isAllowed = allowedPaths.includes(location.pathname);

    if (!isAllowed) {
      dispatch(toogleAllCart([]));
      try {
        const persistedRoot = localStorage.getItem("persist:root");
        if (persistedRoot) {
          const parsed = JSON.parse(persistedRoot);
          if (parsed.cart) {
            delete parsed.cart;
            localStorage.setItem("persist:root", JSON.stringify(parsed));
          }
        }
      } catch (err) {
        console.error("Lỗi khi xoá persisted cart:", err);
      }
    }
  }, [location.pathname]);

  return children;
}
