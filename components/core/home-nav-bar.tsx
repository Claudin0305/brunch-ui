import React, {useState} from "react";
import Image from "next/image"
import Link from "next/link"
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router'

type link={
  path: string;
  name: string;
}

const HomeNavBar = ()=>{
    const [navbar, setNavbar] = useState<boolean>(false)
    const router = useRouter();
    const links: link[] = [
      {
        path: '/',
        name: 'Accueil'
      },
      {
        path: '/liste-evenements',
        name: 'Liste des inscrits'
      },
      {
        path: '/paiements',
        name: 'Paiement'
      },
      {
        path: '/connexion',
        name: 'Tableau de bord'
      },
    ]
return<div>
    <nav className="w-full bg-white fixed top-0 left-0 right-0 z-50 shadow-lg">
        <div className="px-4 py-4 flex justify-between mx-auto lg:max-w-7xl md:items-center md:px-8">
             <Link href="/">
                        <h2 className="text-2xl md:my-4 text-blue-500 font-bold">Logo</h2>
                    </Link>
                    <div className="md:hidden">
                    <button
                    className="p-2 text-blue-500 rounded-md outline-none focus:border-blue-400 focus:border"
                    onClick={() => setNavbar(!navbar)}
                    >
                    {navbar ? (
                        <CloseIcon className="text-3xl"/>
                    ) : (
                        <MenuIcon
                            className="focus:border-none active:border-none text-3xl"
                        />
                    )}
                    </button>
                </div>
<div className="hidden md:flex justify-between gap-8">
  {
    links.map(link=>(
      <Link
        key={link.path}
        href={link.path}
        className={`text-xl hover:text-blue-600 ${router.pathname === link.path ? 'text-blue-500':''}`}
      >{link.name}
      </Link>
    ))
  }
</div>
        </div>
        <div className={`md:hidden flex flex-col justify-between gap-y-4 ${
                navbar ? 'p-12 md:p-0 block' : 'hidden'
              }`}>
                {
    links.map(link=>(
      <Link
        key={link.name}
        href={link.path}
        onClick={() => setNavbar(!navbar)}
        className={`text-xl text-center hover:text-blue-500 ${router.pathname === link.path ? 'text-blue-500':''}`}
      >{link.name}
      </Link>
    ))
  }

</div>

    </nav>
</div>
}

export default HomeNavBar;
