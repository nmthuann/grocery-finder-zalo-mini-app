import { FC, useState, useEffect } from "react";
import { Box, Text } from "zmp-ui";
import { NewsItem } from "./news-item";
import { useRecoilValue } from "recoil";
import { newsListState } from "../../states/state";

export const NewsListContent: FC = () => {
    const newsList = useRecoilValue(newsListState);
    const [visibleViewNews, setVisibleViewNews] = useState(
        newsList.slice(0, 4)
    );
    const [startIndex, setStartIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (startIndex + 4) % newsList.length;
            setStartIndex(nextIndex);
            setVisibleViewNews(newsList.slice(nextIndex, nextIndex + 4));
        }, 4000);
        return () => clearInterval(interval);
    }, [startIndex, newsList]);

    return (
        <div className="bg-slate-100 p-4 mb-10">
            <Box className="flex flex-row justify-center items-center w-full mt-4 mb-4">
                <Text.Title className="text-[3A3C3D] font-semibold text-lg">
                    TIN TỨC
                </Text.Title>
            </Box>

            <Box className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2 ">
                {visibleViewNews.map((news) => (
                    <NewsItem key={news.id} news={news} />
                ))}
            </Box>
        </div>
    );
};
