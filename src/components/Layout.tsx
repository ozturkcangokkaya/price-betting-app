import React, { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LayoutProps {
  children: ReactNode;
}

const inter = Inter({ subsets: ["latin"] });

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={inter.className}>
      <ToastContainer
        autoClose={3000}
        position="bottom-right"
        transition={Flip}
      />
      {children}
    </div>
  );
};

export default Layout;
