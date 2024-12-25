import { FC } from "react";
import { Box, Input, useNavigate } from "zmp-ui";

export const SearchInput: FC = () => {
    const navigate = useNavigate();
    return (
        <Box p={4} className="bg-white">
            <Input.Search
                onFocus={() => navigate("/search")}
                placeholder="Tìm nhanh đồ uống, món mới ..."
            />
        </Box>
    );
};
