// this is a react js and tailwind css custom component that is used to create a card with a label and value , in this we can pass the label and value as props and we can customize label and value direction as per our needs

import type { ReactNode } from "react";

interface LabelValuePairProps {
    label: string;
    value: ReactNode;
    labelClassName?: string;
    valueClassName?: string;
    containerClassName?: string;
    direction?: "row" | "col";
}

const DetailItem: React.FC<LabelValuePairProps> = ({
    label,
    value,
    labelClassName = "text-[0.80rem] font-semibold text-gray-600",
    valueClassName = "text-[0.80rem] font-normal text-gray-600",
    containerClassName,
    direction = "row",
}) => {
    const layoutClass = direction === "col" ? "grid grid-cols-1" : "grid grid-cols-2 gap-1";

    return (
        <div className={containerClassName ?? layoutClass}>
            <div className={labelClassName}>{label} </div>
            <div className={valueClassName}>{value}</div>
        </div>
    );
};

export default DetailItem;
