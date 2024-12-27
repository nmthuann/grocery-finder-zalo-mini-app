import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Input } from "zmp-ui";

export const SearchInput: FC = () => {
    const navigate = useNavigate();
    return (
        <Box p={4} className="bg-white mt-16">
            <Input.Search
                onFocus={() => navigate("/search")}
                placeholder="Tìm nhanh đồ uống, món mới ..."
            />
        </Box>
    );
};
