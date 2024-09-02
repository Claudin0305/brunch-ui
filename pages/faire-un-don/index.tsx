import React from 'react'
import Head from "next/head";
import Link from 'next/link';
import HomeLayout from '@/components/core/home-layout'
const FaireUnDon = () => {
    return (
        <HomeLayout>
            <Head>
                <title>Faire un Don</title>
            </Head>
            <div className="px-8 md:px-32 mx-auto md:mt-32 mt-16 mb-32">
                <div className='text-center mb-8 mt-40'>
                    <p className='text-2xl'>DONNEZ MAINTENANT</p>

                    <p>au projet Pôle d'Innovation du Grand Nord (PIGraN)-Cité du savoir</p>

                    <p>(CAD $20 000)</p>

                    <p className="mt-4">via CanadaDon ou via GRAHN-Monde</p>
                </div>
                <div className="">
                    <h2 className='font-semibold text-xl'>Donnez via CanaDon (QHASUQ ou FMCH)</h2>
                    <ul className="list-decimal ml-8">
                        <li>Donnez via <span className='underline'>QHASUQ</span> avec la mention "Batir2024" pour un soutien en éducation/sports OU
                        </li>
                        <li>Donnez via <span className='underline'>FMCH</span> avec la mention "Batir2024" pour un soutien en santé</li>
                    </ul>
                    <p className="my-8 uppercase">Ou</p>
                    <h2 className='font-semibold text-xl'>Donnez via GRAHN-Monde</h2>
                    <ul className="list-decimal ml-8 flex flex-col gap-4">
                        <li>
                            <p className="">Faites votre paiement via:</p>
                            <ul className="list-none ml-4">
                                <li>a. <span className='underline'>Paypal</span>: <a href='https://paypal.me/DonBatir?country.x=CA&locale.x=fr_CA' target='_blank' className='text-blue-500 hover:text-blue-400 hover:underline'>https://paypal.me/DonBatir?country.x=CA&locale.x=fr_CA</a> (avec la mention
                                    "Batir2024") OU
                                </li>
                                <li>b. <span className='underline'>Virement Interac</span>: brunch-grahn@grahn-monde.org, mot de passe Batir2024 OU</li>
                                <li>
                                    c. <span className='underline'>Chèque</span>: GRAHN-Monde, 1649 Rue Notre-Dame-de Fatima, Laval, H7G 4V8, Québec,
                                    Canada (avec la mention “Batir2024”)
                                </li>
                            </ul>
                        </li>
                        <li>
                            <p className="">Donnez les informations suivantes dans un courriel séparé à <span className='blue-500'>brunch-grahn@grahn-monde.org</span> ou
                                au moment de faire votre don:</p>
                            <ul className="list-none ml-4">
                                <li>
                                    a. [nom de famille], [prénom], [courriel à utiliser]

                                </li>
                                <li>
                                    b. [adresse civique] ← veuillez préciser uniquement si vous souhaitez un reçu officiel pour fins
                                    d'impôt
                                </li>
                                <li>
                                    c. [type de projet] ← veuillez préciser “santé” ou “énergie” ou “éducation/sports” ou
                                    “entreprenariat” ou (si aucune préférence) “général”
                                </li>
                                <li>d. [consentement ou non à la publication de votre nom dans nos communications (site web,
                                    livre d’or, communiqué, et autres)] ← veuillez préciser “oui” si vous le voulez, autrement
                                    “Anonyme".</li>
                            </ul>
                        </li>
                    </ul>
                    <p className="text-center mt-8 mb-4">Tous les dons comptent parce que "seul, on va plus vite; ensemble on va plus loin”.</p>
                    <div className="text-center flex flex-col gap-4">
                        <Link href={'/ambassadeurs'} className='text-gray-600 font-semibold'>Tableau des ambassadeurs</Link>
                        <a href={'/plan_de_reconnaissance.pdf'} target='_blank' className='text-blue-500 hover:text-blue-400 font-semibold -mt-2'>Plan de reconnaissance</a>
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default FaireUnDon
