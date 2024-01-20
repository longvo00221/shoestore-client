import Link from "next/link";
import React from "react";

type DisplayOrderStateProps = {
  header: string;
  subtitle?: string;
  description: string;
};

const DisplayOrderState: React.FC<DisplayOrderStateProps> = ({
    header,subtitle,description
}) => {
  return (
    <div className="max-w-[600px] rounded-lg p-5 border border-black mx-auto flex flex-col">
      <div className="text-2xl font-bold">{header}</div>
      <div className="text-lg font-bold mt-2">
        {subtitle}
      </div>
      <div className="text-base mt-5">
        {description}
      </div>
      <div className="underline">longvo010203@shop.com</div>

      <Link href="/" className="font-bold mt-5">
        Continue Shopping
      </Link>
    </div>
  );
};
export default DisplayOrderState;
