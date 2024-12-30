import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Input } from "zmp-ui";

export const SearchInput: FC = () => {
    const navigate = useNavigate();
    return (
        <Box
            flexDirection="row"
            p={4}
            className="bg-white mt-16 items-center space-x-2"
        >
            <Input.Search
                onFocus={() => navigate("/search")}
                className="rounded-full bg-slate-100/85"
            />
            <Box className="flex-grow-1 ">
                <Button size="medium" className="bg-[#ff734c]">
                    Tìm Kiếm
                </Button>
            </Box>
        </Box>
    );
};
