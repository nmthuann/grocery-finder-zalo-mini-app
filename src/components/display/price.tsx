import { NumericFormat } from "react-number-format";

interface PriceProps {
    amount: number;
}

const Price = ({ amount }: PriceProps) => {
    return (
        <NumericFormat
            value={amount}
            displayType={"text"}
            thousandSeparator={true}
            suffix={"₫"}
        />
    );
};

export default Price;
