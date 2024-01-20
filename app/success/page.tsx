import React from "react";
import Wrapper from "../components/Wrapper";
import DisplayOrderState from "../components/DisplayOrderState";

const SuccessOrderPage = () => {
  return (
    <div className="min-h-[650px] flex items-center">
      <Wrapper>
        <DisplayOrderState
          header="Thanks for shopping at Shoe Shop!"
          subtitle="Your order has been placed successfully."
          description="For any product related query, drop an email to"
        />
      </Wrapper>
    </div>
  );
};
export default SuccessOrderPage;
