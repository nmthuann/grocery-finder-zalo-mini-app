import { Box, Header, Icon, List, Page } from "zmp-ui";
import { Divider } from "../components/common/divider";
const { Item } = List;
const NotificationPage = () => {
    return (
        <Page className="bg-slate-100">
            <Header title="Thông báo" showBackIcon={false} />
            <Divider />
            <Box className="bg-white">
                <List className="mt-10">
                    <Item
                        title="Chào mừng bạn quay trở lại"
                        prefix={<Icon icon="zi-notif" />}
                        subTitle="Cảm ơn đã sử dụng ZaUI Coffee, bạn có thể dùng ứng dụng này để tiết kiệm thời gian xây dựng"
                    />
                    <Item
                        title="Chào bạn mới"
                        prefix={<Icon icon="zi-notif" />}
                        subTitle="Cảm ơn đã sử dụng ZaUI Coffee, bạn có thể dùng ứng dụng này để tiết kiệm thời gian xây dựng"
                    />
                    <Item
                        title="Giảm 50% lần đầu mua hàng"
                        prefix={<Icon icon="zi-notif" />}
                        subTitle="Nhập WELCOME để được giảm 50% giá trị đơn hàng đầu tiên order"
                    />
                </List>
            </Box>
        </Page>
    );
};

export default NotificationPage;
