import React from "react";
import { ReactNode } from "react";
import LinkButton from "@/components/core/link-button"
import { useRouter } from "next/router";
import HomeNavBar from '@/components/core/home-nav-bar'

type Props = {
  children: ReactNode;
};
const HomeLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="relative">
      <HomeNavBar />
      <div className="px-16 md:px-32 mx-auto mt-24 shadow-md pb-4">

        {children}
      </div>

    </div>
  );
};

export default HomeLayout;
