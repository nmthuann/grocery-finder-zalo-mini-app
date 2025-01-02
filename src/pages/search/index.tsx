import { Page } from "zmp-ui";
import { SearchInput } from "../home/search-input";
import Categories from "../home/categories";

const SearchPage: React.FC = () => {
    return (
        <Page className="bg-slate-100 ">
            <SearchInput />
            <Categories />
        </Page>
    );
};

export default SearchPage;
