import { useRecoilValue } from "recoil";
import { Avatar, Box, Header, Icon, List, Page, Tabs, Text } from "zmp-ui";
import {
    categoriesState,
    productsByCategoryState,
    selectedCategoryIdState,
} from "../state";
import { FC, Suspense } from "react";
import { ProductItem } from "../components/products/product-item";

const CategoryProducts: FC<{ categoryId: string }> = ({ categoryId }) => {
    const productsByCategory = useRecoilValue(
        productsByCategoryState(categoryId)
    );

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
        <Box className="bg-background grid grid-cols-2 gap-4 p-4 ">
            {productsByCategory.map((product) => (
                <ProductItem key={product.id} product={product} />
            ))}
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
            className="category-tabs mt-10"
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

const alphabet = "abcdefghijklmnopqrstuvwxyz";
const users = Array.from(Array(10).keys()).map((i) => ({
    name: `Người dùng ${i}`,
    avatar: alphabet[Math.floor(Math.random() * alphabet.length)].toUpperCase(),
    online: Math.floor(Math.random() * 10) % 2 === 0,
    key: i,
}));
const CategoryPage = () => {
    return (
        <Page className="flex flex-col">
            <Header title="Danh mục" />
            <CategoryPicker />
            {/* <Tabs id="contact-list" className="mt-">
                <Tabs.Tab key="tab1" label="Tab 1">
                    <List>
                        {users.map((user) => (
                            <List.Item
                                key={user.key}
                                prefix={
                                    <Avatar online={user.online}>
                                        {user.avatar}
                                    </Avatar>
                                }
                                title={user.name}
                                subTitle="subtitle"
                                suffix={<Icon icon="zi-call" />}
                            />
                        ))}
                    </List>
                </Tabs.Tab>
                <Tabs.Tab key="tab2" label="Tab 2">
                    Tab 2 content
                </Tabs.Tab>
                <Tabs.Tab key="tab3" label="Tab 3">
                    Tab 3 content
                </Tabs.Tab>
            </Tabs> */}
        </Page>
    );
};

export default CategoryPage;
