import { FC, useEffect } from "react";
import { useLocation } from "react-router";

const scrollPositions: Record<string, number> = {};

export const ScrollRestoration: FC = () => {
    const location = useLocation();

    useEffect(() => {
        // Xác định phần tử chính để cuộn
        const content =
            document.querySelector("#main-content") || document.body;

        const key = `${location.pathname}${location.search}`;
        // Khôi phục vị trí cuộn
        if (scrollPositions[key] !== undefined) {
            content.scrollTo(0, scrollPositions[key]);
        }

        const handleScroll = () => {
            // Lưu vị trí cuộn
            scrollPositions[key] = content.scrollTop;
        };

        content.addEventListener("scroll", handleScroll);
        return () => content.removeEventListener("scroll", handleScroll);
    }, [location]);

    return null;
};
