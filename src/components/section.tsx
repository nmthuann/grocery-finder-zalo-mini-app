import { FC, PropsWithChildren } from "react";
import { BoxProps } from "zmp-ui/box";
import { Box, Text } from "zmp-ui";

export interface SectionProps extends BoxProps {
    title: string;
    padding?: "all" | "none" | "title-only";
}

const Section: FC<PropsWithChildren<SectionProps>> = ({
    children,
    title,
    padding = "all",
    ...props
}) => {
    return (
        <Box
            className={`bg-background ${
                padding === "all" ? "p-4 space-y-4" : ""
            } ${padding === "title-only" ? "py-4 space-y-4" : ""}`}
            {...props}
        >
            <Text.Title className={`${padding === "title-only" ? "px-4" : ""}`}>
                {title}
            </Text.Title>
            {children}
        </Box>
    );
};

export default Section;
