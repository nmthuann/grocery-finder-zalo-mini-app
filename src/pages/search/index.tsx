import { Page } from "zmp-ui";
import { SearchInput } from "../home/search-input";

const SearchPage: React.FC = () => {
    return (
        <Page className="bg-slate-100 ">
            <SearchInput />
        </Page>
    );
};

export default SearchPage;
