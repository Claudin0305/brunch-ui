
import { ReactNode } from "react";
import LinkButton from "@/components/core/link-button"
import { useRouter } from "next/router";
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from "@mui/material";
type Props = {
  children: ReactNode;
  getSelectedRows?: any;
  selectedRows?: any
};
const DashboardLayout: React.FC<Props> = ({ children, selectedRows, getSelectedRows }) => {
  const router = useRouter();
  return (
    <div className="relative px-4">
      <div className="flex flex-col w-full pb-8">
        <div className={"flex justify-center md:justify-start pt-8 mb-8 gap-8"}>
          <LinkButton path="/dashboard" text="Retour" icon={<ArrowBackIcon />} />
          {/* {router.pathname.includes("add") ? (
            <LinkButton path="/pays" text="Lister pays" icon={<ListAltIcon/>} />
          ) : (
            <LinkButton path="/pays/add" text="ajouter pays" icon={<AddIcon/>} />
          )} */}
          <Button onClick={getSelectedRows} className="bg-blue-500 capitalize" variant="contained">
            Annuler inscription
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
