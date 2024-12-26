import { FC } from "react";
import { Box, Button, Text } from "zmp-ui";

export const CartPreview: FC = () => {
    return (
        <Box flex className="sticky bottom-0 bg-background p-4 space-x-4">
            <Box
                flex
                flexDirection="column"
                justifyContent="space-between"
                className="min-w-[120px] flex-none"
            >
                <Text className="text-gray" size="xSmall">
                    0 sản phẩm
                </Text>
                <Text.Title size="large">0 đ</Text.Title>
            </Box>
            <Button
                type="highlight"
                fullWidth
                onClick={() => alert("đặt hàng")}
            >
                Đặt hàng
            </Button>
        </Box>
    );
};
