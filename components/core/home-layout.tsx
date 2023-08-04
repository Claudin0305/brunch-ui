
import { ReactNode } from "react";
import LinkButton from "@/components/core/link-button"
import { useRouter } from "next/router";
import HomeNavBar from '@/components/core/home-nav-bar'
import Footer from '@/components/core/footer'

type Props = {
  children: ReactNode;
};
const HomeLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="relative">
      <HomeNavBar />
      <div className="mx-auto mt-24 shadow-md pb-4">

        {children}
      </div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
