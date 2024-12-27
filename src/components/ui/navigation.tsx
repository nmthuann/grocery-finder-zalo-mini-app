import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BottomNavigation, Icon } from "zmp-ui";
import { CartIcon } from "../../icons/cart-icon";

export type MenuItem = {
    label: string;
    icon: ReactNode;
    activeIcon?: ReactNode;
};
const tabs: Record<string, MenuItem> = {
    "/": {
        label: "Trang chủ",
        icon: <Icon icon="zi-home" />,
    },
    "/scan": {
        label: "Scan",
        icon: <Icon icon="zi-qrline" />,
    },
    "/cart": {
        label: "Giỏ hàng",
        icon: <CartIcon />,
        activeIcon: <CartIcon active />,
    },
    "/setting": {
        label: "Setting",
        icon: <Icon icon="zi-setting" />,
    },
};
export type TabKeys = keyof typeof tabs;
const Navigation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <BottomNavigation
            id="footer"
            activeKey={location.pathname}
            onChange={navigate}
        >
            {Object.keys(tabs).map((path: TabKeys) => (
                <BottomNavigation.Item
                    key={path}
                    label={tabs[path].label}
                    icon={tabs[path].icon}
                    activeIcon={tabs[path].activeIcon}
                />
            ))}
        </BottomNavigation>
    );
};

export default Navigation;
