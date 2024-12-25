import { FC } from "react";
import { Sheet as OrginalSheet } from "zmp-ui";
import { ActionSheetProps, SheetProps } from "zmp-ui/sheet";
import { useMatchStatusTextColor } from "../hooks/use-match-status-text-color";

export const Sheet: FC<Omit<SheetProps, "ref">> = (props) => {
    useMatchStatusTextColor(props.visible);
    return <OrginalSheet {...props} />;
};

export const ActionSheet: FC<Omit<ActionSheetProps, "ref">> = (props) => {
    useMatchStatusTextColor(props.visible);
    return <OrginalSheet.Actions {...props} />;
};
