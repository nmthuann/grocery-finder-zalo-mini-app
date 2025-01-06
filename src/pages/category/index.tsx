import { useRecoilValue } from "recoil";
import { Box, Header, Page, Tabs, Text } from "zmp-ui";
import {
    categoriesState,
    // productsByCategoryState,
    selectedCategoryIdState,
} from "../../states/state";
import { FC, Suspense } from "react";
// import { ProductItem } from "../../components/products/product-item";
import { Category } from "../../types/category";

const CategoryProducts: FC<{ categoryId: string }> = () => {
    // const productsByCategory = useRecoilValue(
    //     productsByCategoryState(categoryId)
    // );

    const productsByCategory: Category[] = [];

    if (productsByCategory.length === 0) {
        return (
            <Box className="flex-1 bg-background p-4 flex justify-center items-center">
                <Text size="xSmall" className="text-gray">
                    Không có sản phẩm trong danh mục
                </Text>
            </Box>
        );
    }
    return (
        <Box className="grid grid-cols-2 gap-4 p-4 max-h-screen overflow-y-auto">
            {/* {productsByCategory.map((product) => (
                <ProductItem key={product.id} product={product} />
            ))} */}
        </Box>
    );
};

const CategoryPicker = () => {
    const categories = useRecoilValue(categoriesState);
    const selectedCategory = useRecoilValue(selectedCategoryIdState);
    return (
        <Tabs
            scrollable
            defaultActiveKey={selectedCategory}
            className=" mt-16 "
        >
            {categories.map((category) => (
                <Tabs.Tab key={category.id} label={category.name}>
                    <Suspense>
                        <CategoryProducts categoryId={category.id} />
                    </Suspense>
                </Tabs.Tab>
            ))}
        </Tabs>
    );
};

const CategoryPage = () => {
    return (
        <Page className="flex flex-col mb-16">
            <Header title="Danh mục" />
            <CategoryPicker />
        </Page>
    );
};

export default CategoryPage;
