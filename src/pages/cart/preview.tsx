import { FC } from "react";
import { useRecoilValue } from "recoil";
import { Box, Button, Text } from "zmp-ui";
import { cartState } from "../../states/state";
import Price from "../../components/display/price";

const init = 0;
export const CartPreview: FC = () => {
    const cart = useRecoilValue(cartState);
    const totalPrice = cart.reduce(
        (accumlator, currentItemValue) =>
            accumlator +
            currentItemValue.product.price * currentItemValue.quantity,
        init
    );
    return (
        <Box flex className="fixed w-full bottom-12 bg-white p-4 space-x-4">
            <Box
                flex
                flexDirection="column"
                justifyContent="space-between"
                className="min-w-[120px] flex-none"
            >
                <Text className="text-gray" size="xSmall">
                    {cart.length} sản phẩm
                </Text>
                <Text.Title size="large">
                    <Price amount={totalPrice} />
                </Text.Title>
            </Box>
            <Button
                type="highlight"
                fullWidth
                className="bg-orange-500"
                disabled={cart.length === 0}
                onClick={() => alert("đặt hàng")}
            >
                Đặt hàng
            </Button>
        </Box>
    );
};
