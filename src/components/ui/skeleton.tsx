import { FC, HTMLProps, PropsWithChildren } from "react";
import { BodyTextProps } from "zmp-ui/text";
import { Text } from "zmp-ui";

export const TextSkeleton: FC<PropsWithChildren<BodyTextProps>> = ({
    className,
    ...props
}) => {
    return (
        <Text
            {...props}
            className={`bg-skeleton text-transparent w-fit h-fit animate-pulse ${
                className ?? ""
            }`}
        />
    );
};

export const ImageSkeleton: FC<HTMLProps<HTMLImageElement>> = ({
    className,
    ...props
}) => {
    return (
        <div
            {...props}
            className={`bg-skeleton animate-pulse ${className ?? ""}`}
        />
    );
};

export const ProductItemSkeleton: FC = () => {
    return (
        <div className="space-y-2">
            <ImageSkeleton className="w-full aspect-square rounded-lg" />
            <TextSkeleton>1234567890</TextSkeleton>
            <TextSkeleton size="xxSmall">20,000đ</TextSkeleton>
        </div>
    );
};
