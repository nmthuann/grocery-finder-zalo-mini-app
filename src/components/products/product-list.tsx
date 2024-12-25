import { useRecoilValue } from "recoil";
import { productsState } from "../../state";
import Section from "../common/section";
import { Box } from "zmp-ui";
import { ProductItem } from "./product-item";

const ProductListContent = () => {
    const products = useRecoilValue(productsState);

    return (
        <Section title="Danh sách sản phẩm">
            <Box className="grid grid-cols-2 gap-4">
                {products.map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </Box>
        </Section>
    );
};

export default ProductListContent;
