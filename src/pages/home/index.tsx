import { Box, Page } from "zmp-ui";

import Banner from "./banner";
import { Divider } from "../../components/ui/divider";
import { Welcome } from "./welcome";
import { ProductList } from "../../components/products/product-list";
import { NewsListContent } from "../../components/products/news-list";
import ChatButton from "../../components/products/chat-button";

const HomePage = () => {
    return (
        <Page className=" relative flex-1 flex flex-col bg-white">
            <Welcome />
            <Box className="flex-1 overflow-y-visible mt-16">
                <Banner />
                <ProductList />
                <NewsListContent />
                <ChatButton />
                <Divider />
            </Box>
        </Page>
    );
};

export default HomePage;
