import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import tw, { styled } from "twin.macro";
import { useMyCart } from "../../../../hooks/useCartHook";
const DividerProductItems = styled.div`
  ${tw`border border-gray-300 shadow-lg p-8 rounded-2xl bg-white flex flex-col gap-6`}
  max-height: 70vh;
`;

const ProductListWrapper = styled.div`
  ${tw`overflow-y-auto pr-3`}
  max-height: 30vh;
`;

const ProductItem = styled.div`
  ${tw`flex justify-between items-start py-3 border-b border-gray-200`}
`;

const ProductInfo = styled.div`
  ${tw`flex items-center gap-3`}
`;

const ProductDetails = styled.div`
  ${tw`flex flex-col gap-1`}
`;

const ProductLink = styled(Link)`
  ${tw`text-lg font-semibold text-black no-underline capitalize`}
  &:hover {
    color: #1890ff;
  }
`;

const ActionButton = styled.button`
  ${tw`w-full py-3 text-white border-none text-lg font-semibold rounded-lg transition-all duration-300`}
  background: linear-gradient(to right, #4f46e5, #6366f1);
  &:hover {
    opacity: 0.9;
  }
`;

export default function ProductsCheckOutItems({ isShippingPage, form }) {
  const { items: cartItems } = useSelector((state) => state.cart);
  const { data } = useMyCart();
  const handleContinueShipping = async () => {
    form
      .validateFields()
      .then(() => {
        form.submit();
      })
      .catch((err) => {
        console.log("Form has errors", err);
      });
  };

  const mergedCartItems = cartItems.map((cartItem) => {
    const fullItem = data?.data?.items.find(
      (p) => p.variantId === cartItem.variantId
    );
    return {
      ...fullItem,
      quantity: cartItem.quantity,
    };
  });
  const totalPrice = mergedCartItems.reduce((total, item) => {
    const price = item?.price || 0;
    const quantity = item?.quantity || 0;
    return total + price * quantity;
  }, 0);
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  return (
    <DividerProductItems>
      <h3 tw="text-xl font-bold">Sản phẩm thanh toán</h3>

      <ProductListWrapper>
        {mergedCartItems?.map((item) => (
          <ProductItem key={item._id}>
            <ProductInfo>
              <img
                src={item.variant?.image}
                alt=""
                tw="w-[50px] h-[50px] rounded-md object-cover"
              />
              <ProductDetails>
                <ProductLink to={`/products/${item._id}`}>
                  {item.name}
                </ProductLink>
                <span tw="text-base text-gray-700">
                  Số lượng: {item.quantity}
                </span>
                <div tw="flex gap-4 text-sm text-gray-500">
                  <p>
                    Màu: <span>{item.variant?.color}</span>
                  </p>
                  <p>
                    Size: <span>{item.variant?.size?.name}</span>
                  </p>
                </div>
              </ProductDetails>
            </ProductInfo>
            <p tw="text-lg font-medium whitespace-nowrap">
              {item.price?.toLocaleString()}₫
            </p>
          </ProductItem>
        ))}
      </ProductListWrapper>
      <div tw="w-full h-[1px] my-5 bg-[#7f7f7f]"></div>
      <div>
        <div tw="flex justify-between items-center">
          <h3 tw="text-lg">Số lượng</h3>
          <p tw="text-lg m-0">{totalQuantity} sản phẩm</p>
        </div>
        <div tw="flex justify-between mt-4 items-center">
          <h3 tw="text-2xl font-semibold">Tổng tiền</h3>
          <p tw="text-2xl text-red-500 m-0">{totalPrice.toLocaleString()} đ</p>
        </div>
      </div>

      {isShippingPage ? (
        <ActionButton onClick={handleContinueShipping}>Tiếp tục</ActionButton>
      ) : (
        <ActionButton>Đặt hàng</ActionButton>
      )}
    </DividerProductItems>
  );
}
