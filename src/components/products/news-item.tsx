import { FC } from "react";
import { Box, Text } from "zmp-ui";
import { News } from "../../types/news";
import { truncateText } from "../../utils/product";
export const NewsItem: FC<{ news: News }> = ({ news }) => {
    return (
        <Box className="bg-white rounded-lg shadow-md w-[170px] h-[268px] cursor-pointer">
            <Box className="w-full aspect-square relative">
                <img
                    loading="lazy"
                    src={news.image}
                    alt={news.title}
                    className="absolute left-0 right-0 top-0 bottom-0 w-full h-full object-cover object-center rounded-lg bg-skeleton"
                />
            </Box>

            <Box className="p-4 mb-2">
                <Text bold size="xxxSmall" className="text-gray-500">
                    {news.timestamp}
                </Text>
                <Text bold size="xSmall" className="text-gray-900">
                    {truncateText(news.title, 50)}
                </Text>
            </Box>
        </Box>
    );
};

export default NewsItem;
