import { FC, useState } from "react";
import { Box, Button, Sheet, Text } from "zmp-ui";
import { Product } from "../../types/product";
import { useSetRecoilState } from "recoil";
import { cartState } from "../../state";

export const ProductItem: FC<{ product: Product }> = ({ product }) => {
    const [sheetVisible, setSheetVisible] = useState(false);

    const [quantity, setQuantity] = useState(1);
    const setCart = useSetRecoilState(cartState);

    const addToCart = () => {
        alert("Đã thêm vào giỏ hàng.");
        if (product) {
            setCart((cart: any) => {
                let res = [...cart];

                const existed = cart.find(
                    (item: { product: { id: number } }) =>
                        item.product.id === product.id
                );
                if (existed) {
                    res.splice(cart.indexOf(existed), 1, {
                        ...existed,
                        quantity: existed.quantity + quantity,
                    });
                } else {
                    res = res.concat({
                        product,
                        quantity,
                    });
                }

                return res;
            });
        }
        setSheetVisible(false);
    };

    return (
        <div>
            <Box
                onClick={() => {
                    setSheetVisible(true);
                }}
            >
                <Box className="w-full aspect-square relative">
                    <img
                        alt={product.name}
                        loading="lazy"
                        src={product.image}
                        className="absolute left-0 right-0 top-0 bottom-0 w-full h-full object-cover object-center rounded-lg bg-skeleton"
                    />
                </Box>
                <Text bold>{product.name}</Text>
                <Box flex flexDirection="row" className="justify-between">
                    <Text size="xxSmall" className="text-gray pb-2">
                        {`${product.price} đ`}
                    </Text>
                    <Text size="xxSmall" className="text-gray pb-2">
                        đã bán 3k
                    </Text>
                </Box>
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
                    <Box className="flex flex-col items-center">
                        <img
                            alt="sản phẩm đã chọn"
                            src={product.image}
                            style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                objectFit: "contain",
                            }}
                        />
                    </Box>
                    <Box my={4}>
                        <Text.Title>{`Thêm sản phẩm ${product.name}`}</Text.Title>
                    </Box>
                    <Box
                        className="bottom-sheet-body mb-4"
                        style={{ overflowY: "auto" }}
                    >
                        <Text>{product.description}</Text>
                    </Box>
                    <Box>
                        <Text>{`${product.price} đ`}</Text>
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
                                Đóng
                            </Button>
                        </Box>
                        <Box style={{ flex: 1 }} pl={1}>
                            <Button fullWidth onClick={addToCart}>
                                {`Thêm vào giỏ hàng`}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Sheet>
        </div>
    );
};
