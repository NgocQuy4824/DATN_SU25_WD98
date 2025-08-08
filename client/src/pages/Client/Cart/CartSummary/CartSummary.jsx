import { Button, Card, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import useCartSelection from "../../../../hooks/useCartSelected";
import { useState } from "react";
import PopupVoucher from "../../MyVoucher/PopupVoucher";
import { useDispatch, useSelector } from "react-redux";
import { applyVoucher, removeVoucher } from "../../../../redux/slides/voucherSlice";

const { Text } = Typography;

const CartSummary = ({ items }) => {
  const { cartItems } = useCartSelection();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPopup, setShowPopup] = useState(false);
  const selectedVoucher = useSelector((state) => state.voucher.selectedVoucher);

  // Tính tổng tiền gốc
  const totalPrice = cartItems.reduce((acc, cartItem) => {
    const product = items.find((item) => item.variantId === cartItem.variantId);
    if (!product) return acc;
    return acc + product.price * cartItem.quantity;
  }, 0);

  // Tính số tiền giảm
  const discountAmount = selectedVoucher
    ? selectedVoucher.voucherId?.discountType === "fixed"
      ? selectedVoucher.voucherId.discountValue
      : Math.floor((selectedVoucher.voucherId.discountValue / 100) * totalPrice)
    : 0;

  const totalAfterDiscount = Math.max(totalPrice - discountAmount, 0);

  const handleClickCheckOut = () => {
    if (cartItems.length) {
      navigate("/shipping");
    }
  };

  return (
    <Card bordered>
      <div style={{ marginBottom: 12 }}>
        <Text>Sản phẩm được chọn: </Text>
        <Text strong>{cartItems.length}</Text>
      </div>

      <div style={{ marginBottom: 12 }}>
        <Text>Tổng tiền: </Text>
        <Text strong style={{ color: "green", fontSize: 18 }}>
          {totalPrice.toLocaleString()} ₫
        </Text>
      </div>

      <div style={{ marginBottom: 12 }}>
        <Text>
          Mã giảm giá:{" "}
          {selectedVoucher ? (
            <span
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => dispatch(removeVoucher())}
            >
              Xóa giảm giá
            </span>
          ) : (
            <Link style={{ color: "red" }} onClick={() => setShowPopup(true)}>
              Xem thêm &gt;
            </Link>
          )}
        </Text>
      </div>

      {discountAmount > 0 && (
        <div style={{ marginBottom: 12 }}>
          <Text>
            Giảm:{" "}
            <Text strong style={{ color: "red", fontSize: 16 }}>
              {discountAmount.toLocaleString()} ₫ (
              {selectedVoucher.voucherId?.discountType === "percentage"
                ? `${selectedVoucher.voucherId?.discountValue}%`
                : "Giảm trực tiếp"}
              )
            </Text>
          </Text>
        </div>
      )}

      {discountAmount > 0 && (
        <div style={{ marginBottom: 12 }}>
          <Text>Tổng tiền đã giảm: </Text>
          <Text strong style={{ color: "red", fontSize: 18 }}>
            {totalAfterDiscount.toLocaleString()} ₫
          </Text>
        </div>
      )}

      <Text type="secondary">Phí vận chuyển sẽ được tính khi thanh toán.</Text>

      <div style={{ marginTop: 12 }}>
        <Button
          block
          onClick={handleClickCheckOut}
          disabled={!cartItems.length}
          type="primary"
        >
          Thanh Toán
        </Button>
      </div>

      <PopupVoucher
        open={showPopup}
        onClose={() => setShowPopup(false)}
        onApplyVoucher={(voucher) => {
          dispatch(applyVoucher(voucher));
          setShowPopup(false);
        }}
      />
    </Card>
  );
};

export default CartSummary;
