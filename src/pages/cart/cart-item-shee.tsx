import { FC, useEffect, useRef, useState } from "react";
import { Box, Button, Icon, Sheet, Text, useSnackbar } from "zmp-ui";
import { Cart } from "../../types/cart";
import { useRecoilState } from "recoil";
import { cartState } from "../../state";
import Price from "../../components/display/price";

interface CartItemSheetProps {
    visible: boolean;
    setSheetVisible(): void;
    itemSelected?: Cart;
}

const CartItemSheet: FC<CartItemSheetProps> = ({
    visible,
    setSheetVisible,
    itemSelected,
}) => {
    const [cart, setCart] = useRecoilState(cartState);
    const [quantity, setQuantity] = useState(itemSelected?.quantity);
    const { openSnackbar, closeSnackbar } = useSnackbar();
    const timmerId = useRef();

    useEffect(
        () => () => {
            closeSnackbar();
            clearInterval(timmerId.current);
        },
        []
    );
    useEffect(() => {
        setQuantity(itemSelected?.quantity);
    }, [itemSelected]);

    const increaseQuantity = (productId: number) => {
        const updateCart = cart.map((item) =>
            item.product.id === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
        setQuantity((prev) => prev! + 1);
        setCart(updateCart);
    };

    const decreaseQuantity = (productId: number) => {
        const updateCart = cart.map((item) =>
            item.product.id === productId && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
        );
        setQuantity((prev) => prev! - 1);
        setCart(updateCart);
    };

    const removeItem = (productId: number) => {
        const updateCart = cart.filter((item) => item.product.id !== productId);
        setCart(updateCart);
        handleSheetClose();
        openSnackbar({
            text: "Bạn đã xóa sản phẩm khỏi giỏ hàng",
            type: "success",
        });
    };

    const handleSheetClose = () => {
        setSheetVisible();
    };

    return (
        <Sheet
            visible={visible}
            onClose={handleSheetClose}
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
                        src={itemSelected?.product?.image}
                        style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                        }}
                    />
                </Box>
                <Box my={4}>
                    <Text.Title>{`Thêm sản phẩm ${itemSelected?.product?.name}`}</Text.Title>
                </Box>

                <Box flex className="justify-between items-center">
                    <Box flex className="space-x-2 mb-2">
                        <Text size="large">
                            <Price amount={itemSelected?.product.price ?? 0} />
                        </Text>
                        <Button
                            size="small"
                            icon={<Icon icon="zi-plus-circle" />}
                            onClick={() => {
                                increaseQuantity(itemSelected?.product?.id!);
                            }}
                        />
                        <Text size="large">{quantity}</Text>
                        <Button
                            size="small"
                            icon={<Icon icon="zi-minus-circle" />}
                            disabled={quantity === 1}
                            onClick={() => {
                                decreaseQuantity(itemSelected?.product?.id!);
                            }}
                        />
                    </Box>

                    <Box>
                        <Button
                            size="small"
                            variant="tertiary"
                            onClick={() => {
                                removeItem(itemSelected?.product.id!);
                            }}
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
                            onClick={handleSheetClose}
                        >
                            Xác nhận mua
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Sheet>
    );
};

export default CartItemSheet;
