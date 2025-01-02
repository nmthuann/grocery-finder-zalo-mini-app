import { useRecoilValue } from "recoil";
import { Box, Text } from "zmp-ui";
import { cartState } from "../../state";
import { Divider } from "../../components/ui/divider";
import Price from "../../components/display/price";
import { useState } from "react";
import CartItemSheet from "./cart-item-shee";
import { Cart } from "../../types/cart";

const CartItems = () => {
    const cart = useRecoilValue(cartState);
    const [sheetVisible, setSheetVisible] = useState(false);
    const [itemSelected, setItemSelected] = useState<Cart>();

    const handOnClickCartItem = (cartItem: Cart) => {
        setSheetVisible(true);
        if (cartItem) {
            setItemSelected({
                product: cartItem.product,
                quantity: cartItem.quantity,
            });
        }
    };

    const handleSheetClose = () => {
        setSheetVisible(false); // Đóng sheet
    };

    return (
        <Box className="max-h-56 overflow-y-auto p-2 ">
            {cart.length > 0 ? (
                cart.map((item) => (
                    <div key={item.product.id}>
                        <Box
                            flex
                            className="space-x-1 p-4 bg-white rounded-xl"
                            onClick={() => handOnClickCartItem(item)}
                        >
                            <Box>
                                <img
                                    alt={item.product.name}
                                    className="w-10 h-10 rounded-lg"
                                    src={item.product.image}
                                />
                            </Box>
                            <Box className="space-y-1 flex-1">
                                <Text size="normal" bold>
                                    {item.product.name}
                                </Text>
                                <Text className="text-gray" size="small" bold>
                                    <Price amount={item.product.price} />
                                </Text>
                            </Box>
                            <Text
                                className="text-primary font-medium"
                                size="small"
                            >
                                x{item.quantity}
                            </Text>
                        </Box>
                        <Divider size={2} />
                    </div>
                ))
            ) : (
                <Text
                    className="bg-background rounded-xl py-8 px-4 text-center text-gray"
                    size="xxSmall"
                >
                    Không có sản phẩm trong giỏ hàng
                </Text>
            )}

            <CartItemSheet
                visible={sheetVisible}
                setSheetVisible={handleSheetClose}
                itemSelected={itemSelected}
            />
        </Box>
    );
};

export default CartItems;
