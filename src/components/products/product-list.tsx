import { useRecoilValue } from "recoil";
import { newsListState, productsState } from "../../state";
import Section from "../ui/section";
import { ProductItem } from "./product-item";
import { FC, Suspense, useEffect, useState } from "react";
import { ProductItemSkeleton } from "../ui/skeleton";
import { Box, Button, Icon, Text } from "zmp-ui";
import NewsItem from "./news-item";

export const ProductListContent: FC = () => {
    const products = useRecoilValue(productsState);
    const newsList = useRecoilValue(newsListState);
    const [visibleViewNews, setVisibleViewNews] = useState(
        newsList.slice(0, 4)
    );
    const [startIndex, setStartIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (startIndex + 4) % newsList.length;
            setStartIndex(nextIndex);
            setVisibleViewNews(newsList.slice(nextIndex, nextIndex + 4));
        }, 4000);
        return () => clearInterval(interval);
    }, [startIndex, newsList]);

    return (
        <div className=" bg-slate-100 p-4 mb-10">
            <Box className="flex flex-row justify-center items-center w-full m-4">
                <Text.Title className="text-[3A3C3D] font-semibold text-lg">
                    SẢN PHẨM HOT
                </Text.Title>
            </Box>

            <Box className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-2 ">
                {products.map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </Box>

            <Box className="flex flex-row justify-center items-center w-full mt-4 mb-4 ">
                <Text.Title className="text-[3A3C3D] font-semibold text-lg">
                    TIN TỨC
                </Text.Title>
            </Box>

            <Box className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2 ">
                {visibleViewNews.map((news) => (
                    <NewsItem key={news.id} news={news} />
                ))}
            </Box>

            <Button
                size="large"
                className=" fixed animate-bounce  
                flex justify-center items-center
        opacity-90 rounded-full left-3/4 bottom-14   
        bg-orange-500"
                icon={
                    <Icon
                        icon="zi-chat"
                        size={32}
                        className="text-white bottom-1 right-1"
                    />
                }
            ></Button>
        </div>
    );
};

export const ProductListFallback: FC = () => {
    const products = [...new Array(12)];

    return (
        <Section title="SẢN PHẨM HOT">
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
