
import Head from "next/head";
import React from "react";
import Button from "@mui/material/Button";
import Link from "next/link";
// import InscriptionLayout from "@/components/inscriptions/inscription-layout";
// import AddP
import HomeLayout from '@/components/core/home-layout'


const Page: React.FC = () => {
    return (
        <HomeLayout>
            <Head>
                <title>Don pour autres projets</title>
            </Head>
            <div className="px-4 md:px-32 mx-auto md:mt-32 mt-16 mb-32">
                <h1 className="font-bold text-sm md:text-lg capitalize mb-8 text-center">
                    Don pour autres projets
                </h1>

            </div>


        </HomeLayout>
    );
};


export default Page;
