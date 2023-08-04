import  { useState } from "react";
import Link from "next/link"
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router'

type link = {
    path: string;
    name: string;
}

const Footer = () => {
    const [navbar, setNavbar] = useState<boolean>(false)
    const router = useRouter();
    const links: link[] = [
        {
            path: '/',
            name: 'Accueil'
        },
        {
            path: '/participants',
            name: 'Liste des inscrits'
        },
        {
            path: '/login',
            name: 'Tableau de bord'
        },
    ]
    return (
    <footer className="bg-black text-white px-4 py-8 md:px-32 mx-auto mt-auto">
        <p className="text-center">&copy; 2023</p>
    </footer>)
}

export default Footer;
