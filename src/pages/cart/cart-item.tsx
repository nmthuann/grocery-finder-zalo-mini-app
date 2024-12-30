import { useRecoilValue, useSetRecoilState } from "recoil";
import { Box, Button, Icon, Sheet, Text } from "zmp-ui";
import { cartState } from "../../state";
import { Divider } from "../../components/ui/divider";
import { useEffect, useState } from "react";
import { Product } from "../../types/product";

export interface SelectionProduct {
    product: Product;
    quantity: number;
}

const CartItems = () => {
    const cart = useRecoilValue(cartState);
    const setCart = useSetRecoilState(cartState);
    const [sheetVisible, setSheetVisible] = useState(false);
    const [productSelected, setProductSelected] = useState<SelectionProduct>();
    const [selectedQuantity, setSelectedQuantity] = useState(
        productSelected?.quantity
    );

    const increaseQuantity = (productId: number) => {
        const updatedCart = cart.map((item) =>
            item.product.id === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
        const product = cart.find((item) => item.product.id === productId);

        if (product) {
            setSelectedQuantity(product.quantity + 1);
            setCart(updatedCart);
        }
    };

    const decreaseQuantity = (productId: number) => {
        const updatedCart = cart.map((item) =>
            item.product.id === productId && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
        );
        const product = cart.find((item) => item.product.id === productId);

        if (product) {
            setSelectedQuantity(product.quantity - 1);
            setCart(updatedCart);
        }
    };

    const removeItem = (productId: number) => {
        const updatedCart = cart.filter(
            (item) => item.product.id !== productId
        );
        const productItem = cart.find((item) => item.product.id === productId);

        if (productItem) {
            alert(`Bạn vừa xóa sản phẩm ${productItem.product.name}`);
        }
        setSheetVisible(false);
        setCart(updatedCart);
    };

    useEffect(() => {
        if (productSelected) {
            setSelectedQuantity(productSelected.quantity);
        }
    }, [productSelected]);

    function handleOnClickItem(option: SelectionProduct) {
        setProductSelected(option);
        setSheetVisible(true);
    }

    return (
        <Box className="bg-slate-50 ">
            {cart.length > 0 ? (
                cart.map((item) => (
                    <div key={item.product.id} className="rounded-xl">
                        <Box
                            flex
                            className="space-x-1 p-4 bg-white"
                            onClick={() =>
                                handleOnClickItem({
                                    product: item.product,
                                    quantity: item.quantity,
                                })
                            }
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
                                <Text className="text-gray" size="xSmall">
                                    {`${item.product.price} đ`}
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
                            src={productSelected?.product?.image}
                            style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                objectFit: "contain",
                            }}
                        />
                    </Box>
                    <Box my={4}>
                        <Text.Title>{`Thêm sản phẩm ${productSelected?.product?.name}`}</Text.Title>
                    </Box>

                    <Box flex className="justify-between items-center">
                        <Box flex className="space-x-2 mb-2">
                            <Text size="large">{`${productSelected?.product?.price} đ`}</Text>
                            <Button
                                size="small"
                                icon={<Icon icon="zi-plus-circle" />}
                                onClick={() =>
                                    productSelected?.product?.id &&
                                    increaseQuantity(productSelected.product.id)
                                }
                            />
                            <Text size="large">{selectedQuantity}</Text>
                            <Button
                                size="small"
                                icon={<Icon icon="zi-minus-circle" />}
                                disabled={selectedQuantity === 1}
                                onClick={() =>
                                    productSelected?.product?.id &&
                                    decreaseQuantity(productSelected.product.id)
                                }
                            />
                        </Box>

                        <Box>
                            <Button
                                size="small"
                                variant="tertiary"
                                onClick={() =>
                                    productSelected?.product?.id &&
                                    removeItem(productSelected.product.id)
                                }
                            >
                                Xóa
                            </Button>
                        </Box>
                    </Box>
                    <Box flex flexDirection="row" mt={1}>
                        <Box style={{ flex: 1 }} pr={1}>
                            <Button
                                fullWidth
                                variant="primary"
                                onClick={() => {
                                    setSheetVisible(false);
                                }}
                            >
                                Xác nhận mua
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Sheet>
        </Box>
    );
};

export default CartItems;
