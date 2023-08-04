
import { ReactNode } from "react";
import LinkButton from "@/components/core/link-button"
import { useRouter } from "next/router";
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddIcon from '@mui/icons-material/Add';
type Props = {
    children: ReactNode;
};
const VilleLayout: React.FC<Props> = ({ children }) => {
    const router = useRouter();
    return (
        <div className="relative px-4">
            <div className="flex flex-col w-full pb-8">
                <div className={"flex justify-center md:justify-start pt-8 mb-8 gap-8"}>
                    {router.pathname.includes("add") ? <LinkButton path="/villes" text="Lister villes" icon={<ListAltIcon />} /> : <LinkButton path="/villes/add" text="Ajouter ville" icon={<AddIcon />} />}
                    {router.pathname.includes('edit') && <LinkButton path="/villes" text="Lister villes" icon={<ListAltIcon />} />}
                    {router.pathname.includes('show') && <LinkButton path="/villes" text="Lister villes" icon={<ListAltIcon />} />}

                </div>
                {children}
            </div>
        </div>
    );
};

export default VilleLayout;
