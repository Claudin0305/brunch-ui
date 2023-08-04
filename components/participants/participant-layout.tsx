
import { ReactNode } from "react";
import LinkButton from "@/components/core/link-button"
import { useRouter } from "next/router";
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
type Props = {
  children: ReactNode;
};
const ParticipantLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  return (
    <div className="relative px-4">
      <div className="flex flex-col w-full pb-8">
        <div className={"flex justify-center md:justify-start pt-8 mb-8 gap-8"}>
          <LinkButton path="/participants" text="Retour" icon={<ArrowBackIcon/>}/>
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

export default ParticipantLayout;
