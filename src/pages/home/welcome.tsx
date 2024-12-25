import { FC } from "react";
import { Box, Header, Text } from "zmp-ui";
import react from "../../assets/react.svg";

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
                            src={react}
                        />
                        <Box>
                            <Text.Title size="small">
                                Cửa hàng tạp hóa
                            </Text.Title>
                        </Box>
                    </Box>
                ) as unknown as string
            }
        />
    );
};
