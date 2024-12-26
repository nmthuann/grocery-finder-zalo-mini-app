import { useRecoilValue } from "recoil";
import { productsState } from "../../state";
import Section from "../common/section";
import { Box } from "zmp-ui";
import { ProductItem } from "./product-item";
import { FC, Suspense } from "react";
import { ProductItemSkeleton } from "../common/skeleton";

export const ProductListContent: FC = () => {
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

export const ProductListFallback: FC = () => {
    const products = [...new Array(12)];

    return (
        <Section title="Danh sách sản phẩm">
            <Box className="grid grid-cols-2 gap-4">
                {products.map((_, i) => (
                    <ProductItemSkeleton key={i} />
                ))}
            </Box>
        </Section>
    );
};

export const ProductList: FC = () => {
    return (
        <Suspense fallback={<ProductListFallback />}>
            <ProductListContent />
        </Suspense>
    );
};
