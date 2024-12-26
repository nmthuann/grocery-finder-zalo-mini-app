import { FC } from "react";
import { useRecoilCallback } from "recoil";
import { Box, Header, Text, Icon, List, Page, useNavigate } from "zmp-ui";
import { userState } from "../state";
import subscriptionDecor from "../icons/subscription-decor.svg";
const { Item } = List;

const Subscription: FC = () => {
    const requestUserInfo = useRecoilCallback(
        ({ snapshot }) =>
            async () => {
                const userInfo = await snapshot.getPromise(userState);
                console.warn(
                    "Các bên tích hợp có thể sử dụng userInfo ở đây...",
                    {
                        userInfo,
                    }
                );
            },
        []
    );

    return (
        <Box className="m-4" onClick={requestUserInfo}>
            <Box
                className="bg-green-600 text-white rounded-xl p-4 space-y-2 mt-14"
                style={{
                    backgroundImage: `url(${subscriptionDecor})`,
                    backgroundPosition: "right 8px center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <Text.Title className="font-bold">
                    Đăng ký thành viên
                </Text.Title>
                <Text size="xxSmall">
                    Tích điểm đổi thưởng, mở rộng tiện ích
                </Text>
            </Box>
        </Box>
    );
};

const ProfilePage = () => {
    const navigate = useNavigate();
    return (
        <Page className="bg-slate-100">
            <Header showBackIcon={false} title="Thiết lập" />
            <Subscription />
            <Box className="bg-white">
                <List divider={false}>
                    <Item
                        prefix={<Icon icon="zi-user" />}
                        title="Thông tin cá nhân"
                        suffix={<Icon icon="zi-chevron-right" />}
                        onClick={() => navigate("/search")}
                    />

                    <Item
                        prefix={<Icon icon="zi-inbox" />}
                        title="Đơn Hàng của bạn"
                        suffix={<Icon icon="zi-chevron-right" />}
                    />

                    <Item
                        prefix={<Icon icon="zi-help-circle" />}
                        title="Chính sách hỗ trợ"
                        suffix={<Icon icon="zi-chevron-right" />}
                    />

                    <Item
                        prefix={<Icon icon="zi-more-grid" />}
                        title="về chúng tôi"
                        suffix={<Icon icon="zi-chevron-right" />}
                    />
                </List>
            </Box>
        </Page>
    );
};

export default ProfilePage;
