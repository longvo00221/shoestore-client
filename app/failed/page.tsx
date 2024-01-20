import React from 'react';
import Wrapper from '../components/Wrapper';
import DisplayOrderState from '../components/DisplayOrderState';

type FailedPageProps = {
    
};

const FailedOrderPage:React.FC<FailedPageProps> = () => {
    
    return (<div className="min-h-[650px] flex items-center">
    <Wrapper>
      <DisplayOrderState
        header="Payment failed!"
        description="For any product related query, drop an email to"
      />
    </Wrapper>
  </div>)
}
export default FailedOrderPage;