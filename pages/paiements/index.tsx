
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
                <title>Effectuer un paiement</title>
            </Head>
            <div className="px-4 md:px-32 mx-auto md:mt-32 mt-16 mb-32">
                <h1 className="font-bold text-sm md:text-lg capitalize mb-4">
                    Pour payer une inscription au Brunch
                </h1>
                <p className="-ml-4">Comme indiqué ci-dessous, veuillez utiliser l'une de nos méthodes de paiement et préciser l'invité(les invités) pour lequel(lesquels) vous souhaitez payer.</p>
                <ul className="flex flex-col gap-4 list-decimal">
                    <li>
                        <span className="font-semibold underline">Informations requises:</span>
                        <ul className="flex flex-col gap-4 list-decimal pl-8">
                            <li>Nom de famille, prénom (invité 1)</li>
                            <li>Nom de famille, prénom (invité 2)</li>
                            <li>etc.</li>
                        </ul>

                    </li>
                    <li>
                        <span className="font-semibold underline">Méthodes de paiement</span>
                        <ul className="flex flex-col gap-4 list-decimal pl-8">
                            <li>
                                <a href="https://paypal.me/DonBatir?country.x=CA&locale.x=fr_CA" target="_blank" className="text-blue-600 hover:text-blue-500 cursor-pointer">Paypal</a>
                            </li>
                            <li><span className="underline">Virement Interac</span>: <span className="text-blue-600">brunch-grahn@grahn-monde.org</span>, mot de passe Brunch2024 OU </li>
                            <li><span className="underline">Chèque</span>: GRAHN-Monde, 1649 Rue Notre-Dame-de Fatima, Laval, H7G 4V8, Québec, Canada</li>

                        </ul>

                    </li>

                </ul>
                <p className="-ml-4 my-4"><span className="underline">Note</span>: Vous pouvez envoyer les informations requises (#1) séparément (à <span className="text-blue-600">brunch-grahn@grahn-monde.org</span>).</p>
                <h1 className="font-bold text-sm md:text-lg capitalize mb-4 mt-4">
                    Pour faire un don
                </h1>
                <p className="-ml-4">Comme indiqué ci-dessous, veuillez nous acheminer votre don via l'une de nos méthodes de paiement et l'accompagner des informations requises pour le traiter:</p>

                <ul className="flex flex-col gap-4 list-disc">
                    <li>
                        <span className="font-semibold underline">Informations requises:</span>
                        <ul className="flex flex-col gap-4 list-decimal pl-8">
                            <li>Nom de famille</li>
                            <li>Prénom</li>
                            <li>Courriel à utiliser pour les communications</li>
                            <li>Adresse civique ← à fournir uniquement si vous souhaitez un reçu officiel pour fins d'impôt</li>
                            <li>Type de projet souhaité ← Les options sont: "santé", "éducation", "général" (veuillez choisir "général" si vous n'avez pas de préférence).</li>
                        </ul>

                    </li>
                    <li>
                        <span className="font-semibold underline">Méthodes de paiement</span>
                        <ul className="flex flex-col gap-4 list-decimal pl-8">
                            <li>
                                <a href="https://paypal.me/DonBatir?country.x=CA&locale.x=fr_CA" target="_blank" className="text-blue-600 hover:text-blue-500 cursor-pointer">Paypal</a>
                            </li>
                            <li><span className="underline">Virement Interac</span>: <span className="text-blue-600">brunch-grahn@grahn-monde.org</span>, mot de passe Brunch2024 OU </li>
                            <li><span className="underline">Chèque</span>: GRAHN-Monde, 1649 Rue Notre-Dame-de Fatima, Laval, H7G 4V8, Québec, Canada</li>

                        </ul>

                    </li>

                </ul>
                <p className="-ml-4 my-4"><span className="underline">Note</span>: Vous pouvez envoyer les informations requises (#1) séparément (à <span className="text-blue-600">brunch-grahn@grahn-monde.org</span>).</p>

            </div>


        </HomeLayout>
    );
};


export default Page;
