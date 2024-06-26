import { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Icecream, DashboardCustomizeRounded } from "@mui/icons-material";
import LanguageIcon from '@mui/icons-material/Language';
import ChurchIcon from '@mui/icons-material/Church';
import PersonIcon from '@mui/icons-material/Person';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { GrStatusInfo } from "react-icons/gr";
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import WcIcon from '@mui/icons-material/Wc';
import EventIcon from '@mui/icons-material/Event';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import EmailIcon from '@mui/icons-material/Email';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PeopleIcon from '@mui/icons-material/People';
import PaymentsIcon from '@mui/icons-material/Payments';
type nav = {
  path: string;
  name: string;
  icon: ReactNode;
};
const SideBare: React.FC = () => {
  const router = useRouter();
  const navigation: nav[] = [
    {
      path: "/dashboard",
      icon: <DashboardCustomizeRounded/>,
      name: "Tableau de bord",
    },
    {
      path: "/evenements",
      icon: <EventIcon />,
      name: "Evénements",
    },
    {
      path: "/participants",
      icon: <PeopleIcon />,
      name: "Participants",
    },
    {
      path: "/paiement-repas",
      icon: <PaymentsIcon />,
      name: "Paiements",
    },
    {
      path: "/locaux-brunch",
      icon: <MeetingRoomIcon />,
      name: "Local événement",
    },
    {
      path: "/civilites",
      icon: <WcIcon />,
      name: "Civilités",
    },
    {
      path: "/tranches-age",
      icon: <SettingsEthernetIcon />,
      name: "Tranches-age",
    },
    {
      path: "/statuts",
      icon: <GrStatusInfo />,
      name: "Statuts",
    },
    {
      path: "/devises",
      icon: <MonetizationOnIcon />,
      name: "Devises",
    },
    {
      path: "/pays",
      icon: <LanguageIcon />,
      name: "Pays",
    },
    {
      path: "/departements",
      icon: <LocalFireDepartmentIcon/>,
      name: "Départements",
    },
    {
      path: "/villes",
      icon: <LocationCityIcon/>,
      name: "Villes",
    },
    {
      path: "/messages",
      icon: <EmailIcon/>,
      name: "Messages",
    },
    {
      path: "/utilisateurs",
      icon: <AdminPanelSettingsIcon/>,
      name: "Utilisateurs",
    },
    {
      path: "/affiliations",
      icon: <AttachFileIcon />,
      name: "Affiliations",
    },
  ];
  return (
    <div className="h-screen flex flex-col w-72 shadow-lg bg-white overflow-y-scroll">
      <div className="flex">

        <Link href={"/"}><h1 className="text-2xl uppercase px-4 py-4 hover:text-blue-500"> Accueil
        </h1></Link>
      </div>
      <div className="flex flex-col">
        {navigation.map(({ path, icon, name }) => (
          <Link
            className={`flex flex-row gap-x-4 py-2 hover:bg-blue-50 hover:text-blue-600 ${
              router.pathname.includes( path)
                ? "bg-blue-50 text-blue-600 border-r-4 border-r-blue-600 font-semibold"
                : ""
            }`}
            key={path}
            href={path}
          >
            <span className="ml-4">{icon}</span>
            <span className="mr-4">{name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBare;
