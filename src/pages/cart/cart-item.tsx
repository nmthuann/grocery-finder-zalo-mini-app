import { useRecoilValue } from "recoil";
import { Box, Text } from "zmp-ui";
import { cartState } from "../../states/state";
import { Divider } from "../../components/ui/divider";
import Price from "../../components/display/price";
import { useState } from "react";
import CartItemSheet from "./cart-item-shee";
import { Cart } from "../../types/cart";
import {
    getProductNameVietNamese,
    handleProductImageLink,
    truncateText,
} from "../../utils/product";

const CartItems = () => {
    const cart = useRecoilValue(cartState);
    const [sheetVisible, setSheetVisible] = useState(false);
    const [itemSelected, setItemSelected] = useState<Cart | null>(null);

    const handOnClickCartItem = (cartItem: Cart) => {
        setSheetVisible(true);
        if (cartItem) {
            setItemSelected(cartItem);
        }
    };

    const handleSheetClose = () => {
        setSheetVisible(false);
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
                                    alt={truncateText(
                                        getProductNameVietNamese(
                                            item.product.descriptions
                                        )?.toString() ?? "",
                                        20
                                    )}
                                    className="w-10 h-10 rounded-lg"
                                    src={handleProductImageLink(
                                        item.product.image
                                    )}
                                />
                            </Box>
                            <Box className="space-y-1 flex-1">
                                <Text size="normal" bold>
                                    {truncateText(
                                        getProductNameVietNamese(
                                            item.product.descriptions
                                        )?.toString() ?? "",
                                        20
                                    )}
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
                        {itemSelected && (
                            <CartItemSheet
                                visible={sheetVisible}
                                setSheetVisible={handleSheetClose}
                                itemSelected={itemSelected}
                            />
                        )}
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
        </Box>
    );
};

export default CartItems;
