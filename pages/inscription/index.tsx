import React from 'react'

import Head from "next/head";
import Link from 'next/link';
import HomeLayout from '@/components/core/home-layout'
const Inscription = () => {
    return (
        <HomeLayout>
            <Head>
                <title>Inscription</title>
            </Head>
            <div className="px-8 md:px-32 mx-auto md:mt-32 mt-16 mb-32">
                <p className="text-xl mb-8 mt-40 -ml-2">Pour <span className='font-semibold'>vous inscrire au Brunch</span>, veuillez suivre les étapes suivantes:</p>
                <ul className="list-decimal gap-4 flex-col flex">
                    <li>
                        Compléter avec succès le formulaire d'inscription en ligne <Link href={'/inscriptions/add/1'} className='text-blue-500 hover:blue-400 hover:underline font-semibold'>S'inscrire</Link>  et
                    </li>
                    <li>
                        <p className="">(pour un paiement en différé d’une inscription en présentiel) Payer votre inscription via l’une des
                            méthodes ci-dessous tout en prenant le soin de préciser votre nom et votre prénom:</p>
                        <ul className='flex flex-col gap-2'>
                            <li>
                                a. <span className='underline'>Paypal</span>: <a className="text-blue-500 hover:text-blue-600 hover:underline" href='https://paypal.me/DonBatir?country.x=CA&locale.x=fr_CA' target='_blank'>https://paypal.me/DonBatir?country.x=CA&locale.x=fr_CA</a> (ajouter la mention
                                "Batir2025") OU
                            </li>
                            <li>b. <span className='underline'>Virement Interac</span>: <span className='text-blue-500 hover:text-blue-600 hover:underline'>brunch-grahn@grahn-monde.org</span>, mot de passe <span className='text-gray-700 font-semibold'>Batir2025</span> OU</li>
                            <li>c. <span className='underline'>Chèque</span>: GRAHN-Monde, 1649 Rue Notre-Dame-de Fatima, Laval, H7G 4V8, Québec, Canada
                                (ajouter la mention “Batir2025")</li>
                        </ul>
                    </li>
                </ul>
                <div className="-ml-4 mt-8">
                    <p className=""><span className='underline'>Note 1</span>: Vous n'avez pas à suivre les instructions en 2 si vous vous avez choisi une inscription à distance ou si vous
                        avez choisi de payer votre participation au Brunch via Paypal au moment de votre inscription.</p>
                    <p>
                        <span className='underline'>Note 2</span>: Vous pouvez effectuer un seul versement pour payer l’inscription de plusieurs personnes. Dans ce cas, vous
                        devrez toutes les identifier ([nom de famille], [prénom]).
                    </p>
                    <p className="">Note 3: Vous pouvez envoyer les informations demandées en b) séparément (à <span className='text-blue-500'>brunch-grahn@grahn-monde.org</span>)</p>
                </div>
                <div className="mt-8 text-center flex flex-col">
                    <Link href={'/liste-evenements'} className='text-blue-500 hover:text-blue-400 font-semibold'>Liste des inscrits</Link>
                    <Link href={'/faire-un-don'} className='uppercase text-blue-500 hover:text-blue-400 font-semibold mt-4'>Donnez Maintenant</Link>
                </div>
            </div>
        </HomeLayout>
    )
}

export default Inscription
