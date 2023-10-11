
import Head from "next/head";
import React from "react";
import Button from "@mui/material/Button";
import Link from "next/link";
import Image from 'next/image'
// import InscriptionLayout from "@/components/inscriptions/inscription-layout";
// import AddP
import HomeLayout from '@/components/core/home-layout'


const Page: React.FC = () => {
    return (
        <HomeLayout>
            <Head>
                <title>Don pour projets en santé</title>
            </Head>
            <div className="px-4 md:px-32 mx-auto md:mt-32 mt-16 mb-32">
                <h1 className="font-bold text-sm md:text-lg capitalize mb-8 text-center">
                    Don pour projets en santé
                </h1>
                <div className="flex flex-col space-y-8 md:grid grid-cols-2 md:gap-8 md:space-y-0">
                    {/* Canada */}
                    <div className="">
                        <div className="bg-white shadow-lg flex flex-col items-center space-y-8 md:space-y-0 md:flex-row md:space-x-4 md:items-start p-4">
                            <div>
                                <Image src={'/images/brunch-image/canada.png'} height={200} width={200} alt="Canada" />
                            </div>
                            <div className="w-full h-full space-y-4">

                                <p><strong>En ligne :</strong> Veuillez <a href="https://www.canadahelps.org/fr/dn/37417" target="_blank" className="text-blue-500 hover:text-blue-600" rel="noopener noreferrer">cliquer ici</a> pour effectuer votre don via la FMCH.
                                    * Vous devrez préciser « Centre de santé AMHE-GRAHN » dans le formulaire.  Si vous souhaitez verser votre don plus spécifiquement à la salle des infirmières, veuillez aussi indiquer "salle RIIAH" en haut dans la zone de texte de la section "DÉTAILS SUR LE DON".</p>
                                <p><strong>Par chèque :</strong> Veuillez envoyer avec votre chèque à l'adresse suivante :
                                    FMCH
                                    11121 Avenue Salk, bureau 103
                                    Montréal-Nord, Québec, Canada, H1G 4Y3
                                    * Vous devrez préciser Centre de santé AMHE-GRAHN dans le chèque.</p>

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
                                <p><strong>En ligne :</strong> Veuillez <a href="https://www.amhefoundation.org/donate/" target="_blank" className="text-blue-500 hover:text-blue-600" rel="noopener noreferrer">cliquer ici</a> pour effectuer votre don via la FMCH.
                                    * Vous devrez préciser le projet “GRAHN-AMHE Health Center” dans le formulaire.</p>
                                <p><strong>Par chèque :</strong> Veuillez envoyer avec votre chèque à l’adresse suivante :
                                    AMHE FOUNDATION, PO BOX 211392, Royal Palm Beach, FL 33421
                                    * Vous devrez préciser “GRAHN-AMHE Health Center” dans le chèque.</p>

                            </div>
                        </div>
                    </div>
                    {/* France */}
                    <div className="bg-white shadow-lg flex flex-col items-center space-y-8 md:space-y-0 md:flex-row md:space-x-4 md:items-start p-4">
                        <div>
                            <Image src={'/images/brunch-image/france.png'} height={200} width={200} alt="France" />
                        </div>
                        <div className="w-full h-full space-y-4">
                            <p><strong>En ligne :</strong> Veuillez <a href="https://www.canadahelps.org/fr/dn/37417" target="_blank" className="text-blue-500 hover:text-blue-600" rel="noopener noreferrer">cliquer ici</a> pour effectuer votre don via la FMCH.
                                * Vous devrez préciser “Centre de santé AMHE-GRAHN” dans le formulaire.</p>
                            <p><strong>Par chèque :</strong> Veuillez rédiger votre chèque à l’ordre de GRAHN-France et l’acheminer via la banque Société Générale au
                                numéro de compte 00037265481.</p>
                            <p><strong>Par virement bancaire :</strong> Veuillez effectuer votre virement en utilisant l’IBAN : FR7630003040600003726548196 (code SWIFT
                                POFICHBEXXX).</p>

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
                                <p><strong>En ligne :</strong> Veuillez <a href="https://www.canadahelps.org/fr/dn/37417" target="_blank" className="text-blue-500 hover:text-blue-600" rel="noopener noreferrer">cliquer ici</a> pour effectuer votre don via la FMCH.
                                    * Vous devrez préciser “Centre de santé AMHE-GRAHN” dans le formulaire.</p>
                                <p><strong>Par virement bancaire :</strong> À VENIR</p>
                                <p><strong>Par chèque :</strong> À VENIR</p>
                                <p><strong>Par dépôt bancaire :</strong> Veuillez effectuer votre dépôt bancaire en utilisant l’un des comptes suivants :
                                    <br />1. Compte en Gourdes: 515-1221-1274697<br />
                                    2. Compte en USD: 515-1222-1274684</p>

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
                                <p><strong>En ligne :</strong> Veuillez <a href="https://www.canadahelps.org/fr/dn/37417" target="_blank" className="text-blue-500 hover:text-blue-600" rel="noopener noreferrer">cliquer ici</a> pour effectuer votre don via la FMCH.
                                    * Vous devrez préciser « Centre de santé AMHE-GRAHN » dans le formulaire.</p>
                                <p><strong>Par bulletin de versement dans un bureau postal suisse :</strong>
                                    Veuillez acheminer votre bulletin en utilisant le code CCP-14-291693-9.</p>
                                <p><strong>Par chèque :</strong> Veuillez envoyer votre chèque à l'adresse suivante : GRAHN-Suisse, Route du Camp 61, CH-1228 Plan-les-Ouates, Suisse</p>
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
