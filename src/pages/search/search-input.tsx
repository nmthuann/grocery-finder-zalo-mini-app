import { FC } from "react";
import { Box, Button, Input } from "zmp-ui";

export const SearchInput: FC = () => {
    return (
        <Box
            flexDirection="row"
            p={4}
            className=" bg-white items-center space-x-2 "
        >
            <Input.Search className="rounded-full bg-slate-100/85" />
            <Box className="flex-grow-1 ">
                <Button size="medium" className="bg-[#ff734c]">
                    Tìm Kiếm
                </Button>
            </Box>
        </Box>
    );
};
