'use client';

import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return ( 
    <Toaster 
    containerStyle={{
      top: 100,
    }}
    position="top-center" 
    gutter={15}/>
   );
}
 
export default ToasterProvider;
