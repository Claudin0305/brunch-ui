
import Head from "next/head";
import React from "react";
import Button from "@mui/material/Button";
import Image from "next/image";
// import InscriptionLayout from "@/components/inscriptions/inscription-layout";
// import AddP
import HomeLayout from '@/components/core/home-layout'


const Page: React.FC = () => {
    return (
        <HomeLayout>
            <Head>
                <title>Don pour projets en éducation</title>
            </Head>
            <div className="px-4 md:px-32 mx-auto md:mt-32 mt-16 mb-32">
                <h1 className="font-bold text-sm md:text-lg capitalize mb-8 text-center">
                    Don pour projets en éducation
                </h1>
                <div className="flex flex-col space-y-8 md:grid grid-cols-2 md:gap-8 md:space-y-0">
                    {/* Canada */}
                    <div className="">
                        <div className="bg-white shadow-lg flex flex-col items-center space-y-8 md:space-y-0 md:flex-row md:space-x-4 md:items-start p-4">
                            <div>
                                <Image src={'/images/brunch-image/canada.png'} height={200} width={200} alt="Canada" />
                            </div>
                            <div className="w-full h-full space-y-4">

                                <p><strong>En ligne :</strong> Veuillez <a href="https://www.canadahelps.org/fr/organismesdebienfaisance/fondation-quebec-haiti-pour-une-scolarisation-universelle-de-qualite-qhasuq/" target="_blank" className="text-blue-500 hover:text-blue-600" rel="noopener noreferrer">cliquer ici</a> pour effectuer votre don. * Vous devrez préciser <strong>« GRAHN »</strong> et le projet en éducation dans le formulaire.</p>
                                <p><strong>Par chèque :</strong> Veuillez remplir <a href="http://www.pigran.org/pdf/dons" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">le formulaire QHASUQ</a> et l'envoyer avec votre chèque à l'adresse suivante : Fondation QHASUQ 10000, rue Lajeunesse, bur. 200, Montréal, Québec, Canada, H3L 2E1</p>
                            </div>
                        </div>
                    </div>
                    {/* USA */}
                    <div className="">
                        <div className="bg-white shadow-lg flex flex-col items-center space-y-8 md:space-y-0 md:flex-row md:space-x-4 md:items-start p-4">
                            <div>
                                <Image src={'/images/brunch-image/usa2.png'} height={200} width={200} alt="USA" />
                            </div>
                            <div className="w-full h-full space-y-4">
                                <p>
                                    <strong>Online payment : </strong>Account information Citizens Bank ROP P.O. Box 7000 Providence, RI 02940
                                    <br />Routing #: 011500120<br />
                                    Account #: 29004403
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* France */}
                    <div className="bg-white shadow-lg flex flex-col items-center space-y-8 md:space-y-0 md:flex-row md:space-x-4 md:items-start p-4">
                        <div>
                            <Image src={'/images/brunch-image/france.png'} height={200} width={200} alt="France" />
                        </div>
                        <div className="w-full h-full space-y-4">

                            <p><strong>En ligne :</strong> Veuillez <a href="https://www.canadahelps.org/fr/organismesdebienfaisance/fondation-quebec-haiti-pour-une-scolarisation-universelle-de-qualite-qhasuq/" target="_blank" className="text-blue-500 hover:text-blue-600" rel="noopener noreferrer">cliquer ici</a> pour effectuer votre don. * Vous devrez préciser <strong>« GRAHN »</strong> et le projet en éducation dans le formulaire.</p>
                            <p><strong>Par chèque :</strong> Veuillez rédiger votre chèque à l’ordre de <strong>GRAHN-France, 3 Place du Ratrait, 92150 Suresnes, France</strong> et l’acheminer via la banque <strong>Société Générale</strong> au numéro de <strong>compte 00037265481</strong>.</p>
                            <p><strong>Par virement bancaire : </strong>Veuillez effectuer votre virement en utilisant l’<strong>IBAN : FR7630003040600003726548196</strong> (code SWIFT SOGEFRPPSUR).</p>
                            <p>
                                <strong>* Note : GRAHN-France n’émet aucun reçu fiscal pour les dons reçus.</strong>
                            </p>
                        </div>
                    </div>
                    {/* Haiti */}
                    <div className="">
                        <div className="bg-white shadow-lg flex flex-col items-center space-y-8 md:space-y-0 md:flex-row md:space-x-4 md:items-start p-4">
                            <div>
                                <Image src={'/images/brunch-image/haiti.png'} height={200} width={200} alt="Haiti" />
                            </div>
                            <div className="w-full h-full space-y-4">

                                <p><strong>En ligne :</strong> Veuillez <a href="https://www.canadahelps.org/fr/organismesdebienfaisance/fondation-quebec-haiti-pour-une-scolarisation-universelle-de-qualite-qhasuq/" target="_blank" className="text-blue-500 hover:text-blue-600" rel="noopener noreferrer">cliquer ici</a> pour effectuer votre don. * Vous devrez préciser <strong>« GRAHN »</strong> et le projet en éducation dans le formulaire.</p>
                                <p><strong>Par virement bancaire :</strong> À VENIR</p>
                                <p><strong>Par chèque :</strong> À VENIR</p>
                                <p><strong>Par dépôt bancaire :</strong> Veuillez effectuer votre dépôt bancaire en utilisant l'un des comptes suivants :<br />
                                    <span className="block">Compte en Gourdes : 515-1221-1274697</span>
                                    <span className="block">
                                        Compte en USD : 515-1222-1274684</span></p>
                            </div>
                        </div>
                    </div>

                    {/* Suisse */}
                    <div className="">
                        <div className="bg-white shadow-lg flex flex-col items-center space-y-8 md:space-y-0 md:flex-row md:space-x-4 md:items-start p-4">
                            <div>
                                <Image src={'/images/brunch-image/suisse.png'} height={200} width={200} alt="Suisse" />
                            </div>
                            <div className="w-full h-full space-y-4">

                                <p><strong>En ligne :</strong> Veuillez <a href="https://www.canadahelps.org/fr/organismesdebienfaisance/fondation-quebec-haiti-pour-une-scolarisation-universelle-de-qualite-qhasuq/" target="_blank" className="text-blue-500 hover:text-blue-600" rel="noopener noreferrer">cliquer ici</a> pour effectuer votre don. * Vous devrez préciser <strong>« GRAHN »</strong> et le projet en éducation dans le formulaire.</p>
                                <p><strong>Par bulletin de versement dans un bureau postal suisse :</strong> Veuillez acheminer votre bulletin en utilisant le code <strong>CCP-14-291693-9</strong>.</p>
                                <p><strong>Par chèque :</strong> Veuillez envoyer votre chèque à l'adresse suivante :GRAHN-Suisse, Route du Camp 61, CH-1228 Plan-les-Ouates, Suisse</p>

                                <p><strong>Par virement bancaire :</strong> Veuillez effectuer votre virement en utilisant l'IBAN : CH97 0900 0000 1429 1693 9.</p>

                                <p><strong>* Remarque : GRAHN-Suisse n'émet aucun reçu fiscal pour les dons reçus.</strong></p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </HomeLayout>
    );
};


export default Page;
