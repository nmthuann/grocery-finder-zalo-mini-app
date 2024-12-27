import { ReactNode, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BottomNavigation, Icon } from "zmp-ui";
import { CartIcon } from "../../icons/cart-icon";
import { useVirtualKeyboardVisible } from "../../hooks/use-virtual-keyboard-visible";

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

export const NO_BOTTOM_NAVIGATION_PAGES = ["/search", "/category", "/result"];
export type TabKeys = keyof typeof tabs;
const Navigation = () => {
    const keyboardVisible = useVirtualKeyboardVisible();
    const navigate = useNavigate();
    const location = useLocation();
    const noBottomNav = useMemo(() => {
        return NO_BOTTOM_NAVIGATION_PAGES.includes(location.pathname);
    }, [location]);

    if (noBottomNav || keyboardVisible) {
        return <></>;
    }
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
