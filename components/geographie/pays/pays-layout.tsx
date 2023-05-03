import React from "react";
import { ReactNode } from "react";
import LinkButton from "@/components/core/link-button"
import { useRouter } from "next/router";
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddIcon from '@mui/icons-material/Add';
type Props = {
  children: ReactNode;
};
const PaysLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  return (
    <div className="relative px-4">
      <div className="flex flex-col w-full pb-8">
        <div className={"flex justify-center md:justify-start pt-8 mb-8 gap-8"}>
          {router.pathname.includes("add")? <LinkButton path="/pays" text="Lister pays" icon={<ListAltIcon/>}/>:<LinkButton path="/pays/add" text="Ajouter pays" icon={<AddIcon/>}/>}
            {router.pathname.includes('edit') && <LinkButton path="/pays" text="Lister pays" icon={<ListAltIcon/>}/>}
            {router.pathname.includes('show') && <LinkButton path="/pays" text="Lister pays" icon={<ListAltIcon/>}/>}
          {/* {router.pathname.includes("add") ? (
            <LinkButton path="/pays" text="Lister pays" icon={<ListAltIcon/>} />
          ) : (
            <LinkButton path="/pays/add" text="ajouter pays" icon={<AddIcon/>} />
          )} */}
        </div>
        {children}
      </div>
    </div>
  );
};

export default PaysLayout;
