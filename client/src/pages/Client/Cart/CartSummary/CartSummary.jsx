import { Button, Card, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import useCartSelection from "../../../../hooks/useCartSelected";

const { Text } = Typography;

const CartSummary = ({ totalItems = 0, items }) => {
  const { cartItems, existsVariantId } = useCartSelection();
  const navigate = useNavigate();

  const handleClickCheckOut = () => {
    if (cartItems.length) {
      navigate("/shipping");
    }
  };
  const totalPrice = cartItems.reduce((acc, cartItem) => {
    const product = items.find((item) => item.variantId === cartItem.variantId);
    if (!product) return acc;

    // const discountedPrice =
    //   product.price - (product.price * product.discount) / 100;
    // return acc + discountedPrice * cartItem.quantity;
    return acc + product.price * cartItem.quantity;
  }, 0);
  return (
    <Card bordered style={{ border: "1px solid red" }}>
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
    </Card>
  );
};

export default CartSummary;
