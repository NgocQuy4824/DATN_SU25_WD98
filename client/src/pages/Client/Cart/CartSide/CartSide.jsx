import React from "react";
import { Drawer, Typography, Button, Divider, Spin, Empty } from "antd";
import { useMyCart } from "../../../../hooks/useCartHook";
import CartItem from "../CartItem/CartItem";
import { Link } from "react-router-dom";

const { Text } = Typography;

const CartSide = ({ open, onClose }) => {
    const { data, isLoading } = useMyCart();

    if (isLoading) return <Spin tip="Đang tải giỏ hàng..." />;

    const items = data?.data?.items || [];

    const totalPrice = items.reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0);

    return (
        <Drawer
            title="GIỎ HÀNG"
            placement="right"
            open={open}
            onClose={onClose}
            width={500}
            bodyStyle={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                padding: 0
            }}
        >
            {items.length === 0 ? (
                <Empty description="Giỏ hàng của bạn đang trống." style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
            ) : (
                <>
                    <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
                        {items.map(item => (
                            <div key={item.id} style={{ marginBottom: 16 }}>
                                <CartItem item={item} />
                                <Divider />
                            </div>
                        ))}

                        <div style={{ textAlign: "right", marginBottom: 16 }}>
                            <Text strong>TỔNG ĐƠN HÀNG:</Text>
                            <br />
                            <Text strong style={{ fontSize: 18, color: "red" }}>
                                ₫{totalPrice.toLocaleString()}
                            </Text>
                        </div>
                    </div>

                    <div style={{ padding: "0 16px 16px" }}>
                        <Button type="primary" block style={{ marginBottom: 8 }}>
                            <Link to="/cart">XEM GIỎ HÀNG</Link>
                        </Button>
                        <div style={{ textAlign: "center" }}>
                            Hoặc <Text type="danger"><Link to="/products">Tiếp tục mua hàng</Link></Text>
                        </div>
                    </div>
                </>
            )}
        </Drawer>
    );
};

export default CartSide;
