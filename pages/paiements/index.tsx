
import Head from "next/head";
import React from "react";
import { GetServerSideProps } from 'next'
// import InscriptionLayout from "@/components/inscriptions/inscription-layout";
// import AddP
import HomeLayout from '@/components/core/home-layout'

const Page: React.FC = () => {
    return (
        <HomeLayout>
            <Head>
                <title>Effectuer un paiement</title>
            </Head>
            <div className="px-4 md:px-32 mx-auto md:mt-32 mt-16 mb-32">
<h1 className="font-bold text-sm md:text-lg capitalize mb-4">
                Effectuer un paiement
            </h1>
            <ul className="flex flex-col gap-4 list-decimal">
                <li>
                    <a target="_blank" href="https://paypal.me/DonBatir?country.x=CA&locale.x=fr_CA" className="text-blue-500 hover:text-blue-600">PayPal</a>
                </li>
                <li>
                    <p><span className="font-semibold text-blue-500">Chèque</span>: GRAHN-Monde, 1649 Rue Notre-Dame-de Fatima, Laval, H7G 4V8, Québec, Canada</p>
                </li>
                <li><p><span className="font-semibold text-blue-500">Virement Interac</span>: brunch-grahn@monde.org, mot de passe Brunch'2023</p></li>
            </ul>
            </div>


        </HomeLayout>
    );
};


export default Page;
