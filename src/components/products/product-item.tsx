import { FC, useState } from "react";
import { Box, Button, Sheet, Text } from "zmp-ui";
import { Product } from "../../types/product";
import { CartPlusIcon } from "../../icons/cart-plus-icon";
import Price from "../display/price";
import { cartState } from "../../state";
import { useRecoilState } from "recoil";
import { Cart } from "../../types/cart";

export const ProductItem: FC<{ product: Product }> = ({ product }) => {
    const [sheetVisible, setSheetVisible] = useState(false);
    const [cart, setCart] = useRecoilState(cartState);

    const addCartItem = () => {
        if (product) {
            console.log("Thêm vào giỏ hàng", cart.length);
            setCart((oldCart: Cart[]) => {
                let newCart = [...oldCart];

                const exsited = oldCart.find(
                    (item) => item.product.id === product.id
                );

                if (exsited) {
                    newCart.splice(oldCart.indexOf(exsited), 1, {
                        ...exsited,
                        quantity: exsited.quantity + 1,
                    });
                } else {
                    newCart = newCart.concat({
                        product,
                        quantity: 1,
                    });
                }

                return newCart;
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
                className="bg-white p-4 rounded-lg shadow-md
                 w-[164px] h-[256px] cursor-pointer"
            >
                <Box className="w-full aspect-square relative">
                    <img
                        alt={product.name}
                        loading="lazy"
                        src={product.image}
                        className="absolute left-0 right-0 top-0 bottom-0 
                        w-full h-full object-cover object-center rounded-lg bg-skeleton"
                    />
                </Box>
                <Text bold size="large" className="pt-2">
                    {product.name}
                </Text>
                <Box
                    flex
                    flexDirection="row"
                    className="justify-between items-center "
                >
                    <Text
                        size="large"
                        className="text-[#FF3D12] pb-2 font-bold"
                    >
                        <Price amount={product.price} />
                    </Text>
                    <Box>
                        <Button
                            className="bg-[#e76302] "
                            size="medium"
                            icon={<CartPlusIcon />}
                        />
                    </Box>
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
                        <Text.Title>{product.name}</Text.Title>
                    </Box>
                    <Box
                        className="bottom-sheet-body mb-4"
                        style={{ overflowY: "auto" }}
                    >
                        <Text>{product.description}</Text>
                    </Box>
                    <Box>
                        <Text
                            size="large"
                            className="text-[#FF3D12] pb-2 font-bold"
                        >
                            <Price amount={product.price} />
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
                                Đóng
                            </Button>
                        </Box>
                        <Box style={{ flex: 1 }} pl={1}>
                            <Button fullWidth onClick={addCartItem}>
                                {`Thêm vào giỏ hàng`}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Sheet>
        </div>
    );
};
