import { FC } from "react";
import Section from "../../components/ui/section";
import { Swiper } from "zmp-ui";

export const RecommendContent: FC = () => {
    return (
        <Section title="Gợi ý cho bạn" padding="title-only">
            <Swiper>{"map, array -> list"}</Swiper>
        </Section>
    );
};
