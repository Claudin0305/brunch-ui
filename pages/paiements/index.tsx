
import Head from "next/head";
import React from "react";
import { GetServerSideProps } from 'next'
// import InscriptionLayout from "@/components/inscriptions/inscription-layout";
// import AddP
import HomeLayout from '@/components/core/home-layout'
import Link from "next/link";

const Page: React.FC = () => {
    return (
        <HomeLayout>
            <Head>
                <title>Effectuer un paiement ou un don</title>
            </Head>
            <div className="px-8 md:px-32 mx-auto md:mt-32 mt-16 mb-32">
                <h1 className="font-bold text-sm md:text-lg capitalize mb-4">
                    Pour payer une inscription ou faire un don
                </h1>
                <p className="-ml-4">Veuillez suivre les instructions suivantes pour mener à bien le traitement de votre don ou le paiement de votre inscription:</p>
                <ul className="flex flex-col gap-4 list-disc">
                    <li className="ml-4">
                        <p>Pour une <span className="font-semibold">inscription</span>, veuillez acheminer votre paiement via l’une de nos méthodes de paiement ci-dessous et préciser les invités ([nom de famille] et [prénom]).</p>
                    </li>
                    <li className="ml-4">
                        <p>Pour un <span className="font-semibold">don</span>, veuillez acheminer votre paiement via l’une de nos méthodes de paiement ci-dessous et fournir les informations ci-après pour le(s) don(s)/donateur(s):</p>
                        <ul className="flex flex-col gap-4 list-disc pl-8">
                            <li>[nom de famille], [prénom], [courriel à utiliser]</li>
                            <li>[adresse civique] ← préciser uniquement si un reçu officiel pour fins d'impôt est souhaité</li>
                            <li>[type de projet] ← préciser le projet ou encore "général" à défaut de choisir.</li>
                        </ul>
                    </li>

                </ul>

                <h1 className="font-bold text-sm md:text-lg capitalize mb-4 mt-4">
                    Méthodes de paiement
                </h1>
                <ul className="flex flex-col gap-4 list-decimal pl-8">
                    <li>
                        <span className="underline">Paypal</span>: <a className="text-blue-600 hover:text-blue-400 cursor-pointer" href="https://paypal.me/DonBatir?country.x=CA&locale.x=fr_CA" target="_blank">https://paypal.me/DonBatir?country.x=CA&locale.x=fr_CA</a> (mention "<span className="text-gray-700">Batir2025</span>") OU
                    </li>
                    <li>
                        <span className="underline">Virement Interac</span>: <span className="text-blue-600">brunch-grahn@grahn-monde.org</span>, mot de passe <span className="text-gray-700">Batir2025</span> OU
                    </li>
                    <li>
                        <span className="underline">Chèque</span>: GRAHN-Monde, 1649 Rue Notre-Dame-de Fatima, Laval, H7G 4V8, Québec, Canada (mention "<span className="text-gray-700">Batir2025</span>")
                    </li>
                </ul>


                <p className="-ml-4 my-4"><span className="underline">Note</span>: Vous pouvez envoyer les informations requises (#1) séparément (à <span className="text-blue-600">brunch-grahn@grahn-monde.org</span>).</p>

            </div>


        </HomeLayout>
    );
};


export default Page;
