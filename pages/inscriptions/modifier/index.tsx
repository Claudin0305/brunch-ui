
import Head from "next/head";
import React from "react";
import { GetServerSideProps } from 'next'
// import InscriptionLayout from "@/components/inscriptions/inscription-layout";
// import AddP
import HomeLayout from '@/components/core/home-layout'
import UpdateInscription from "@/components/core/modifier-form";

const Page: React.FC = () => {
    return (
        <HomeLayout>
            <Head>
                <title>Inscription | Modifier</title>
            </Head>
            <div className="px-4 md:px-32 mx-auto md:mt-32 mt-16 mb-auto">
               <UpdateInscription/>
            </div>


        </HomeLayout>
    );
};


export default Page;
