import { NumericFormat } from "react-number-format";

interface PriceProps {
    amount: number | string;
}

const Price = ({ amount }: PriceProps) => {
    const formattedAmount = parseFloat(amount.toString()).toString();

    return (
        <NumericFormat
            value={formattedAmount}
            displayType={"text"}
            thousandSeparator={true}
            suffix={"₫"}
        />
    );
};

export default Price;
