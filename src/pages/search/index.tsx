import { Box, Header, Page } from "zmp-ui";
import { SearchInput } from "./search-input";
import Categories from "./categories";

const SearchPage: React.FC = () => {
    return (
        <Page className="bg-slate-100 ">
            <Header title="Tìm kiếm" />
            <Box className="pt-16">
                <SearchInput />
                <Categories />
            </Box>
        </Page>
    );
};

export default SearchPage;
