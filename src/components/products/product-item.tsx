import { FC, useEffect, useRef, useState } from "react";
import { Box, Button, Sheet, Text, useSnackbar } from "zmp-ui";
import Price from "../display/price";
import { Product } from "../../types/product";
import { CartPlusIcon } from "../../icons/cart-plus-icon";
import {
    getProductNameVietNamese,
    handleProductImageLink,
    truncateText,
} from "../../utils/product";
import { Cart } from "../../types/cart";
import { useRecoilState } from "recoil";
import { cartState } from "../../states/state";

export const ProductItem: FC<{ product: Product }> = ({ product }) => {
    const [sheetVisible, setSheetVisible] = useState(false);
    const [, setCart] = useRecoilState(cartState);
    const { openSnackbar, closeSnackbar } = useSnackbar();
    const timmerId = useRef();

    useEffect(
        () => () => {
            closeSnackbar();
            clearInterval(timmerId.current);
        },
        []
    );

    const descriptionContent = product.descriptions[0]
        ? product.descriptions[0].content
        : "";
    const parser = new DOMParser();
    const doc = parser.parseFromString(descriptionContent, "text/html");
    const decodedContent = doc.body.innerHTML;

    const addCartItem = () => {
        setSheetVisible(false);
        if (product) {
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
        openSnackbar({
            text: "Thêm giỏ hàng thành công",
            type: "success",
            position: "top",
        });
    };

    return (
        <div>
            <Box
                onClick={() => {
                    setSheetVisible(true);
                }}
                className="bg-white p-4 rounded-lg shadow-md
                 w-[170px] h-[256px] cursor-pointer"
            >
                <Box className="w-full aspect-square relative">
                    <img
                        alt={product.alias}
                        loading="lazy"
                        src={handleProductImageLink(product.image)}
                        className="absolute left-0 right-0 top-0 bottom-0
                        w-full h-full object-cover object-center rounded-lg bg-skeleton"
                    />
                </Box>
                <Text bold size="large" className="pt-2">
                    {truncateText(
                        getProductNameVietNamese(
                            product.descriptions
                        )?.toString() ?? "",
                        20
                    )}
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
                            src={handleProductImageLink(product.image)}
                            style={{
                                objectFit: "contain",
                            }}
                            className="max-w-full max-h-full"
                        />
                    </Box>
                    <Box my={4}>
                        <Text.Title>
                            {getProductNameVietNamese(product.descriptions)}
                        </Text.Title>
                    </Box>
                    <Box className="bottom-sheet-body mb-4 overflow-y-auto">
                        <Text
                            dangerouslySetInnerHTML={{ __html: decodedContent }}
                        />
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
