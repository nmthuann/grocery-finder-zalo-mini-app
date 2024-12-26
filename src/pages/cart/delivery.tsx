import { useState } from "react";
import { Box, Button, Icon, Input, List, Modal, Sheet, Text } from "zmp-ui";
const { Item } = List;
const Delivery = () => {
    const [dialogVisible, setDialogVisible] = useState(false);
    const [sheetVisible, setSheetVisible] = useState(false);
    const [sheetChoiceUserVisible, setSheetChoiceUserVisible] = useState(false);

    return (
        <Box className="space-y-3 px-4 bg-white">
            <Text.Header>Hình thức nhận hàng</Text.Header>
            <Item
                prefix={<Icon icon="zi-location" />}
                title="Địa chỉ giao hàng"
                subTitle="Yêu cầu truy cập vị trí"
                suffix={<Icon icon="zi-chevron-right" />}
                onClick={() => {
                    setSheetVisible(true);
                }}
            />
            <Item
                prefix={<Icon icon="zi-clock-1" />}
                title="10h-10h30, 26/12/2024"
                subTitle="Thời gian nhận hàng"
                suffix={<Icon icon="zi-chevron-right" />}
            />
            <Item
                prefix={<Icon icon="zi-user" />}
                title="Chọn người nhận"
                subTitle="Yêu cầu truy cập số điện thoại"
                suffix={<Icon icon="zi-chevron-right" />}
                onClick={() => {
                    setSheetChoiceUserVisible(true);
                }}
            />
            <Item
                prefix={<Icon icon="zi-note" />}
                title="Nhập ghi chú ..."
                onClick={() => {
                    setDialogVisible(true);
                }}
            />

            <Modal
                visible={dialogVisible}
                title="Nhập ghi chú của bạn"
                onClose={() => {
                    setDialogVisible(false);
                }}
                actions={[
                    {
                        text: "Đóng",
                        close: true,
                    },
                    {
                        text: "Xác nhận",
                        close: true,
                        highLight: true,
                    },
                ]}
            >
                <Input helperText="Nhập ghi chú để shipper giao hàng cho bạn thuận tiện hơn." />
            </Modal>

            <Sheet
                visible={sheetVisible}
                onClose={() => setSheetVisible(false)}
                autoHeight
                mask
                handler
                swipeToClose
            >
                <Box
                    p={4}
                    className="custom-bottom-sheet"
                    flex
                    flexDirection="column"
                >
                    <Box className="bottom-sheet-cover">
                        <img alt="Bottom Sheet" src={""} />
                    </Box>
                    <Box my={4}>
                        <Text.Title>
                            Cho phép Starbucks Coffee xác định vị trí của bạn
                        </Text.Title>
                    </Box>
                    <Box
                        className="bottom-sheet-body"
                        style={{ overflowY: "auto" }}
                    >
                        <Text>
                            Starbucks Coffee sẽ sử dụng vị trí của bạn để hỗ trợ
                            giao nhận hàng, tìm kiếm dịch vụ, bạn bè quanh bạn,
                            hoặc các dịch vụ liên quan đến địa điểm khác.
                        </Text>
                    </Box>
                    <Box flex flexDirection="row" mt={1}>
                        <Box style={{ flex: 1 }} pr={1}>
                            <Button
                                fullWidth
                                variant="secondary"
                                onClick={() => {
                                    setSheetVisible(false);
                                }}
                            >
                                Để sau
                            </Button>
                        </Box>
                        <Box style={{ flex: 1 }} pl={1}>
                            <Button
                                fullWidth
                                onClick={() => {
                                    setSheetVisible(false);
                                }}
                            >
                                Cho phép
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Sheet>

            <Sheet
                visible={sheetChoiceUserVisible}
                onClose={() => setSheetChoiceUserVisible(false)}
                autoHeight
                mask
                handler
                swipeToClose
            >
                <Box
                    p={4}
                    className="custom-bottom-sheet"
                    flex
                    flexDirection="column"
                >
                    <Box className="bottom-sheet-cover">
                        <img alt="Bottom Sheet" src={""} />
                    </Box>
                    <Box my={4}>
                        <Text.Title>
                            Cho phép truy cập số điện thoại của bạn.
                        </Text.Title>
                    </Box>
                    <Box
                        className="bottom-sheet-body"
                        style={{ overflowY: "auto" }}
                    >
                        <Text>
                            Starbucks Coffee sẽ sử dụng vị trí của bạn để hỗ trợ
                            giao nhận hàng, tìm kiếm dịch vụ, bạn bè quanh bạn,
                            hoặc các dịch vụ liên quan đến địa điểm khác.
                        </Text>
                    </Box>
                    <Box flex flexDirection="row" mt={1}>
                        <Box style={{ flex: 1 }} pr={1}>
                            <Button
                                fullWidth
                                variant="secondary"
                                onClick={() => {
                                    setSheetChoiceUserVisible(false);
                                }}
                            >
                                Để sau
                            </Button>
                        </Box>
                        <Box style={{ flex: 1 }} pl={1}>
                            <Button
                                fullWidth
                                onClick={() => {
                                    setSheetChoiceUserVisible(false);
                                }}
                            >
                                Cho phép
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Sheet>
        </Box>
    );
};

export default Delivery;
