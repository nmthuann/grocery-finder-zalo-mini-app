import { Box, Page } from "zmp-ui";

import { SearchInput } from "./search-input";
import Banner from "./banner";
import { Suspense } from "react";
import Categories from "./categories";
import { Divider } from "../../components/divider";
import { Welcome } from "./welcome";
import ProductList from "../../components/products/product-list";

const HomePage = () => {
    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Welcome />
            <Box>
                <SearchInput />
                <Banner />
                <Suspense>
                    <Categories />
                </Suspense>
                <Divider />
                <div>Recommend</div>
                <ProductList />
                {/* <Divider />
                <div>ProductList</div> */}
            </Box>
        </Page>
    );
};

export default HomePage;
