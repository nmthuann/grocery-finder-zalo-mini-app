import { FC, useState } from "react";
import { Box, Button, Sheet, Text } from "zmp-ui";
import { Product } from "../../types/product";

export const ProductItem: FC<{ product: Product }> = ({ product }) => {
    const [sheetVisible, setSheetVisible] = useState(false);
    return (
        <div>
            <Box
                onClick={() => {
                    setSheetVisible(true);
                }}
            >
                <Box className="w-full aspect-square relative">
                    <img
                        loading="lazy"
                        src={product.image}
                        className="absolute left-0 right-0 top-0 bottom-0 w-full h-full object-cover object-center rounded-lg bg-skeleton"
                    />
                </Box>
                <Text>{product.name}</Text>
                <Text size="xxSmall" className="text-gray pb-2">
                    {product.price}
                </Text>
            </Box>
            <Sheet
                visible={sheetVisible}
                onClose={() => setSheetVisible(false)}
                autoHeight
                mask
                handler
                swipeToClose
            >
                <Box
                    p={4}
                    className="custom-bottom-sheet"
                    flex
                    flexDirection="column"
                >
                    <Box className="bottom-sheet-cover">
                        <img alt="Bottom Sheet" src={""} />
                    </Box>
                    <Box my={4}>
                        <Text.Title>
                            Cho phép Starbucks Coffee xác định vị trí của bạn
                        </Text.Title>
                    </Box>
                    <Box
                        className="bottom-sheet-body"
                        style={{ overflowY: "auto" }}
                    >
                        <Text>
                            Starbucks Coffee sẽ sử dụng vị trí của bạn để hỗ trợ
                            giao nhận hàng, tìm kiếm dịch vụ, bạn bè quanh bạn,
                            hoặc các dịch vụ liên quan đến địa điểm khác.
                        </Text>
                    </Box>
                    <Box flex flexDirection="row" mt={1}>
                        <Box style={{ flex: 1 }} pr={1}>
                            <Button
                                fullWidth
                                variant="secondary"
                                onClick={() => {
                                    setSheetVisible(false);
                                }}
                            >
                                Để sau
                            </Button>
                        </Box>
                        <Box style={{ flex: 1 }} pl={1}>
                            <Button
                                fullWidth
                                onClick={() => {
                                    setSheetVisible(false);
                                }}
                            >
                                Cho phép
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Sheet>
        </div>
    );
};
