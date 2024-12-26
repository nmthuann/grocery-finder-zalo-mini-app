import { Box, Header, Page } from "zmp-ui";
import CartItems from "./cart-item";
import Delivery from "./delivery";
import { Divider } from "../../components/common/divider";
import { TermsAndPolicies } from "./term-and-policy";
import { CartPreview } from "./preview";

const CartPage = () => {
    return (
        <Page className="flex flex-col mt-10 bg-slate-100">
            <Header title="Giỏ hàng" showBackIcon={false} />
            <Divider />
            <Box className="bg-white w-full ">
                <CartItems />
                <Divider size={4} />
                <Delivery />
                <Divider size={12} />
                <TermsAndPolicies />
                <Divider size={32} className="flex-1" />
                <CartPreview />
            </Box>
        </Page>
    );
};

export default CartPage;
