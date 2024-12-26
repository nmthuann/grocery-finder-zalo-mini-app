import { useRecoilValue } from "recoil";
import { Box, Text } from "zmp-ui";
import { cartState } from "../../state";
import { Divider } from "../../components/common/divider";

const CartItems = () => {
    const cart = useRecoilValue(cartState);

    return (
        <Box className="bg-slate-50">
            {cart.length > 0 ? (
                cart.map((item, index) => (
                    <Box flex key={index} className="space-x-1 mb-4">
                        <Box className="space-y-1 flex-1">
                            <Text size="small">{item.product.name}</Text>
                            <Text className="text-gray" size="xSmall">
                                {item.product.description}
                            </Text>
                        </Box>
                        <Text className="text-primary font-medium" size="small">
                            x{item.quantity}
                        </Text>
                    </Box>
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
