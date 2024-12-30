import { useRecoilValue } from "recoil";
import { newsListState, productsState } from "../../state";
import Section from "../ui/section";
import { ProductItem } from "./product-item";
import { FC, Suspense } from "react";
import { ProductItemSkeleton } from "../ui/skeleton";
import { Box, Text } from "zmp-ui";

export const ProductListContent: FC = () => {
    const products = useRecoilValue(productsState);
    const newsList = useRecoilValue(newsListState);

    return (
        <div className="bg-slate-100 p-4 mb-10">
            <Box className="flex flex-row justify-center items-center w-full m-4">
                <Text.Title className="text-[3A3C3D] font-semibold text-lg">
                    SẢN PHẨM HOT
                </Text.Title>
            </Box>

            <Box className="grid grid-cols-2 gap-4">
                {products.map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </Box>

            <Box className="flex flex-row justify-center items-center w-full m-4">
                <Text.Title className="text-[3A3C3D] font-semibold text-lg">
                    TIN TỨC
                </Text.Title>
            </Box>

            <Box className="grid grid-cols-2 gap-4">
                {products.map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </Box>
        </div>
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
