import { FC } from "react";
import { useRecoilValue } from "recoil";
import { Box, Button, Text } from "zmp-ui";
import { cartState } from "../../state";

export const CartPreview: FC = () => {
    const cart = useRecoilValue(cartState);
    const total = cart.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
    );
    return (
        <Box flex className="sticky bottom-0 bg-background p-4 space-x-4">
            <Box
                flex
                flexDirection="column"
                justifyContent="space-between"
                className="min-w-[120px] flex-none"
            >
                <Text className="text-gray" size="xSmall">
                    {cart.length} sản phẩm
                </Text>
                <Text.Title size="large">{total} đ</Text.Title>
            </Box>
            <Button
                type="highlight"
                fullWidth
                disabled={cart.length === 0}
                onClick={() => alert("đặt hàng")}
            >
                Đặt hàng
            </Button>
        </Box>
    );
};
