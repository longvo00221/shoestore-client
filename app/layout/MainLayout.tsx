import React, { ReactNode } from "react";
import Header from "../components/nav/Header";
import Footer from "../components/Footer";
import ToasterProvider from "../components/ToastProvider";
type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <ToasterProvider />
      <div>
        {children}
        <Footer />
      </div>
    </div>
  );
};
export default MainLayout;
