import { FC } from "react";
import { Box, Header, Text } from "zmp-ui";
import logo from "../../../public/logo-1800hoa.png";

export const Welcome: FC = () => {
    return (
        <Header
            className="app-header no-border pl-4 flex-none pb-2"
            showBackIcon={false}
            title={
                (
                    <Box flex alignItems="center" className="space-x-2">
                        <img
                            className="w-8 h-8 rounded-lg border-inset"
                            src={logo}
                            alt="1800 hoa logo"
                        />
                        <Box>
                            <Text.Title
                                size="small"
                                className="text-orange-600"
                            >
                                1800 Hoa
                            </Text.Title>
                        </Box>
                    </Box>
                ) as unknown as string
            }
        />
    );
};
