import React from 'react'
import Head from "next/head";
import HomeLayout from '@/components/core/home-layout'
const Faq = () => {
    const Question = ({ content }: { content: string }) => {
        return (<p className='font-bold text-xl'>{content}</p>)
    }
    const Answer = ({ content }: { content: string }) => {
        return (<p>{content}</p>)
    }
    return (
        <HomeLayout>
            <Head>
                <title>Foire aux questions</title>
            </Head>
            <div className="px-8 md:px-32 mx-auto md:mt-32 mt-16 mb-32">
                <h1 className="font-bold text-sm md:text-lg capitalize mb-4 text-center text-blue-500">
                    Foire aux questions
                </h1>
                <ul className="flex flex-col gap-4 list-decimal">
                    <li>
                        <Question content='Comment peut-on s’inscrire au Brunch?' />
                        <Answer content='Veuillez cliquer sur le lien : « Inscription » de l’invitation et suivre les inscriptions.' />
                    </li>
                    <li>
                        <Question content="Comment peut-on faire un paiement pour une inscription ou un don à l’occasion du Brunch?" />
                        <Answer content='Vous pouvez faire un paiement ou un don en utilisant l’une ou l’autre des options suivantes:' />
                        <ul className="flex flex-col list-decimal ml-4 gap-1">
                            <li>
                                <span className="underline">Paypal</span>: <a className="text-blue-600 hover:text-blue-400 cursor-pointer" href="https://paypal.me/DonBatir?country.x=CA&locale.x=fr_CA" target="_blank">https://paypal.me/DonBatir?country.x=CA&locale.x=fr_CA</a> (mention "<span className="text-gray-700">Batir2024</span>") OU
                            </li>
                            <li>
                                <span className="underline">Virement Interac</span>: <span className="text-blue-600">brunch-grahn@grahn-monde.org</span>, mot de passe <span className="text-gray-700">Batir2024</span> OU
                            </li>
                            <li>
                                <span className="underline">Chèque</span>: GRAHN-Monde, 1649 Rue Notre-Dame-de Fatima, Laval, H7G 4V8, Québec, Canada (mention "<span className="text-gray-700">Batir2024</span>")
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Question content='Comment peut-on aider pour le Brunch?' />
                        <p>L’initiative Bâtir vise à faire participer les membres et sympathisants du Brunch au coumbite (effort de
                            solidarité) extraordinaire de mise en œuvre du projet Pôle d'Innovation du Grand Nord (PIGraN) ˗˗
                            Cité du savoir. En adoptant cette initiative, le comité de Brunch s’engage à verser une contribution à
                            ce projet phare à partir des dons amassés dans le cadre d’une édition de Brunch.</p>
                        <p className='mt-4'>Pour aider, il vous suffit de jouer le rôle d’ambassadeur Bâtir ou de donateur:</p>
                        <ul className="flex flex-col list-disc ml-4 pl-4">
                            <li>
                                <span className='underline'>Un ambassadeur Bâtir</span>: Une personne qui agit à titre de responsable de table ou de donateur de CAD
                                $750 (ou plus) est automatiquement un “ambassadeur Bâtir”.
                            </li>
                            <li>
                                <span className='uderline'>Un donateur</span>: Une personne qui fait un don est un donateur. Elle devient un “ambassadeur Bâtir” si
                                elle effectue un(des) don(s) totalisant CAD $750 ou plus. <span className='font-semibold'>* Tous les dons sont importants</span>.
                            </li>
                            <p className="-ml-8 mt-4">Veuillez consulter les sections correspondantes ci-après.</p>
                        </ul>
                    </li>
                    <li>
                        <Question content='Comment peut-on jouer le rôle d’ambassadeur Bâtir en agissant comme responsable de table?' />
                        <p className="mb-2">Dans le cadre du Brunch, un responsable de table est une personne qui accepte de faire ce qui suit pour
                            garantir une ou plusieurs de tables de 10 personnes:</p>
                        <ul className="flex flex-col list-decimal ml-4 gap-1 pl-4">
                            <li>Inviter et assurer l'inscription en ligne de 10 personnes ou plus en présentiel (le lien vers le
                                formulaire se trouve dans l’invitation au Brunch).</li>
                            <li>Assurer le paiement de chacune des participations via l’une des méthodes de paiement
                                susmentionnées en 2.</li>
                            <li>
                                Acheminer un courriel intitulé “Brunch'2024: &lt;votre nom&gt; &lt;votre prénom&gt; à <span className='text-blue-500'>brunch-
                                    grahn@grahn-monde.org</span> incluant la composition des tables:

                                <p>Table #1 (10 personnes)</p>
                                <p>1. &lt;nom invité 1&gt;, &lt;prénom invité 1&gt;</p>
                                <p>...</p>
                                <p>10. &lt;nom invité 1&gt;, &lt;prénom invité 1&gt;</p>
                                <p>Table #n (10 personnes)</p>
                            </li>
                        </ul>
                        <p>En acceptant cette responsabilité, vous aidez à recruter et à fidéliser des membres, sympathisants,
                            commanditaires et partenaires. Vous devenez ainsi un “ambassadeur Bâtir” pour l’édition du Brunch.</p>
                    </li>
                    <li>
                        <Question content='Comment peut-on jouer le rôle d’ambassadeur Bâtir en agissant comme donateur?' />
                        <Answer content='Vous devez faire un(des) don(s) totalisant CAD $750 ou plus et préciser les informations suivantes
pour chaque don:'/>
                        <ul className="flex flex-col list-decimal ml-4 gap-1 pl-4">
                            <li>Nom de famille du donateur</li>
                            <li>Prénom du donateur</li>
                            <li>Courriel du donateur à utiliser pour les communications</li>
                            <li>Adresse civique du donateur ← veuillez fournir cette information uniquement si vous souhaitez
                                recevoir un reçu officiel pour fins d’impôt.</li>
                            <li>Type de projet souhaité par le donateur ← veuillez préciser le projet ou indiquer "général" si vous
                                n'avez pas de préférence.</li>
                            <li>Consentement ou non à la publication de votre nom dans nos communications (site web, livre
                                d’or, communiqué, et autres) ← veuillez préciser “oui” si vous le voulez, autrement “Anonyme".</li>
                        </ul>
                        <p>Vous pouvez également faire un don au moment de votre inscription. Si vous avez fait un don de cette
                            façon et que vous avez omis de fournir l'une des informations susmentionnées, veuillez nous la faire
                            parvenir dans les plus brefs délais via courriel à <span className="text-blue-500">brunch-grahn@grahn-monde.org</span>.</p>
                    </li>
                    <li>
                        <Question content='Comment doit-on procéder pour faire un don?' />
                        <Answer content="Pour faire un don, veuillez consulter la sous-rubrique “Faire un don” de la page web du Brunch et
suivre les inscriptions qui apparaîtront à l’écran."/>
                    </li>
                    <li>
                        <Question content="Comment doit-on procéder pour adhérer à GRAHN-Monde?" />
                        <p>Pour devenir membre de GRAHN-Monde, vous devez remplir un formulaire d’adhésion et
                            l’acheminer par courriel à <span className='text-blue-500'>contact@grahn-monde.org</span>. Vous devez également payer les frais
                            d’adhésion. Veuillez vous rendre sur la page d’accueil de GRAHN-Monde, cliquer sur « Demande
                            d’adhésion à GRAHN-Monde » et suivre les instructions.</p>
                    </li>
                    <li>
                        <Question content='Quel est le délai pour obtenir un reçu officiel?'/>
                        <Answer content="Les reçus officiels sont envoyés au premier trimestre de l’année suivante."/>
                    </li>
                    <li>
                        <Question content="Quel est le point de contact pour des questions?"/>
                        <p>Pour toute question, vous pouvez envoyer un courriel à l’adresse <span className="text-blue-500">brunch-grahn@grahn-monde.org</span>. Il
nous fera un plaisir de vous répondre.</p>
                    </li>
                </ul>
            </div>
        </HomeLayout>
    )
}

export default Faq
