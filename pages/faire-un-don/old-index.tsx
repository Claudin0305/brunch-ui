
import Head from "next/head";
import React from "react";
import { GetServerSideProps } from 'next'
import Button from "@mui/material/Button";
import Link from "next/link";
// import InscriptionLayout from "@/components/inscriptions/inscription-layout";
// import AddP
import HomeLayout from '@/components/core/home-layout'
type link = {
    path: string,
    name: string
}

const menu: link[] = [
    {
        path: '/faire-un-don/projets-en-education',
        name: 'Projets en éducation'
    },
    {
        path: '/faire-un-don/projets-en-sante',
        name: 'Projets en santé'
    },
    {
        path: '/faire-un-don/autres-projets',
        name: 'autres projets'
    },
]

const Page: React.FC = () => {
    return (
        <HomeLayout>
            <Head>
                <title>Faire un Don</title>
            </Head>
            <div className="px-4 md:px-32 mx-auto md:mt-32 mt-16 mb-32">
                <h1 className="font-bold text-sm md:text-lg capitalize mb-8 text-center">
                    Choisissez la catégorie de projets
                </h1>
                <div className="flex flex-col space-y-8 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
                    {
                        menu.map((m: link) => (
                            <Link key={m.path} href={m.path} className="w-full">
                                <Button className="bg-blue-500 capitalize w-full" variant="contained">{m.name}</Button>
                            </Link>
                        ))
                    }
                </div>
            </div>


        </HomeLayout>
    );
};


export default Page;
