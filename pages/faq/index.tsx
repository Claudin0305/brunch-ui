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
    const questions: string[] = ['Comment peut-on s’inscrire au Brunch? Payer une inscription au Brunch?', "Comment peut-on faire un don?", 'Comment peut-on aider pour le Brunch? L’initiative “Bâtir ensemble” - “Je fais ma part”', 'Comment peut-on agir à titre de Bâtisseur?', 'Comment peut-on agir à titre d’ambassadeur Bâtir et ainsi devenir Bâtisseur BRONZE?', 'Comment peut-on agir à titre de responsable de table?', "Comment peut-on agir à titre d’artisan Bâtir?", 'Comment peut-on adhérer à GRAHN-Monde?', "Quel est le délai pour obtenir un reçu officiel (Canada)?", "Quel est le point de contact pour des questions?"];
    return (
        <HomeLayout>
            <Head>
                <title>Foire aux questions</title>
            </Head>
            <div className="px-8 md:px-32 mx-auto md:mt-32 mt-16 mb-32">
                <h1 className="font-bold text-md md:text-2xl capitalize text-center text-blue-500 mt-40 mb-8">
                    Foire aux questions
                </h1>
                <ul className="list-disc pl-8 mb-8">
                    {questions.map((q, id) => (
                        <li key={`${id}`} className='marker:text-blue-500'>
                            <a href={`#question${id}`} className="text-blue-500 hover:text-blue-400 font-semibold hover:underline">{q}</a></li>
                    ))}
                </ul>
                <ul className="flex flex-col gap-8 list-decimal">
                    <li id="question0">
                        <Question content='Comment peut-on s’inscrire au Brunch? Payer une inscription au Brunch?' />
                        <Answer content='Veuillez consulter la rubrique “Inscription” du menu.' />
                    </li>
                    <li id="question1">
                        <Question content="Comment peut-on faire un don?" />
                        <Answer content='Veuillez consulter la rubrique “Faire un don” du menu.' />

                    </li>
                    <li id="question2">
                        <Question content='Comment peut-on aider pour le Brunch? L’initiative “Bâtir ensemble” - “Je fais ma part”' />
                        <Answer content="Le Groupe de Réflexion et d' Action pour une Haïti nouvelle (GRAHN-Monde) a le souci d'édifier une
                        Haïti nouvelle sur la base d'un effort citoyen et collectif. Aussi, le comité de Brunch convie depuis
                        2020 les membres et sympathisants à prendre part à une campagne de financement pour le projet phare
Pôle d'Innovation du Grand Nord (PIGraN)-Cité du savoir. C'est une occasion en or pour les Haïtiens"/>
                        <p>Vous pouvez aider en agissant à titre de <span className='font-semibold'>bâtisseur</span>, d’<span className='font-semibold'>ambassadeur Bâtir</span> ou encore d’<span className='font-semibold'>artisan Bâtir</span>.
                        </p>

                    </li>
                    <li id="question3">
                        <Question content='Comment peut-on agir à titre de Bâtisseur?' />
                        <Answer content='Vous pouvez agir à titre de Bâtisseur en jouant le rôle de responsable de table(s) ou en versant un(des)
don(s) totalisant CAD $1000 ou plus. En effet, une personne qui garantit une table ou qui fait un don de
CAD $1000 est automatiquement un Bâtisseur BRONZE. Veuillez consulter la rubrique du menu
“Faire un don” pour voir la procédure, les méthodes de paiement et le plan de reconnaissance.
Veuillez également consulter les sections ci-après pour plus d’informations sur ces rôles.'/>

                    </li>
                    <li id="question4">
                        <Question content='Comment peut-on agir à titre d’ambassadeur Bâtir et ainsi devenir Bâtisseur BRONZE?' />
                        <Answer content='Vous devez faire un don de 1000$ ou plus ou encore garantir une ou plusieurs tables au Brunch. Vous
devenez aussitôt un Bâtisseur (BRONZE ou plus). Veuillez consulter les sections se rapportant à un
Bâtisseur et à un responsable de table pour obtenir plus d’informations.'/>


                    </li>
                    <li id="question5">
                        <Question content='Comment peut-on agir à titre de responsable de table?' />
                        <Answer content="Dans le cadre du Brunch, un responsable de table est une personne qui accepte de faire ce qui suit pour
garantir une ou plusieurs de tables de 10 personnes:"/>
                        <ul className="list-decimal ml-8">
                            <li>Garantir l'inscription de 10 personnes ou plus en présentiel (cf rubrique “Inscription” du menu)</li>
                            <li>
                                <p>Envoyer un courriel intitulé “Brunch'2025: &lt;votre nom&gt; &lt;votre prénom&gt; à <span className='text-blue-500'>brunch-grahn@grahn-
                                    monde.org</span> avec la composition des tables:</p>

                                <p>Table #1 (10 personnes)</p>
                                <p> 1. &lt;nom invité 1&gt;, &lt;prénom invité 1&gt;</p>
                                <p>...</p>
                                <p>10. &ltnom invité 10&gt;, &lt;prénom invité 10&gt;</p>
                                <p>Table #n (10 personnes)</p>
                                <p>...</p>
                                <p className="-ml-8">En acceptant cette responsabilité, vous aidez à recruter et à fidéliser des membres, sympathisants,
                                    commanditaires et partenaires. Vous devenez ainsi un “ambassadeur Bâtir” et un Bâtisseur pour
                                    l’édition du Brunch.</p>
                            </li>
                        </ul>
                    </li>
                    <li id="question6">
                        <Question content="Comment peut-on agir à titre d’artisan Bâtir?" />
                        <Answer content='Vous devez faire un don du montant de votre choix. À titre d’information, une personne qui fait
un(des) don(s) de CAD $1000 ou plus devient automatiquement un Bâtisseur. Pour plus de
renseignements, veuillez consulter la rubrique du menu “Faire un don” pour voir la procédure, les

méthodes de paiement et le plan de reconnaissance. Veuillez également consulter les sections ci-
dessus pour obtenir plus d’informations.' />
                        <p>Tous les dons comptent.</p>
                    </li>

                    <li id="question7">
                        <Question content="Comment peut-on adhérer à GRAHN-Monde?" />
                        <p>Pour devenir membre de GRAHN-Monde, vous devez remplir un formulaire d’adhésion et
                            l’acheminer par courriel à <span className='text-blue-500'>contact@grahn-monde.org</span>. Vous devez également payer les frais
                            d’adhésion. Veuillez vous rendre sur la page d’accueil de GRAHN-Monde, cliquer sur « Demande
                            d’adhésion à GRAHN-Monde » et suivre les instructions.</p>

                    </li>
                    <li id="question8">
                        <Question content='Quel est le délai pour obtenir un reçu officiel (Canada)?' />
                        <Answer content="Les reçus officiels sont envoyés au premier trimestre de l’année suivante." />
                    </li>
                    <li id="question9">
                        <Question content='Quel est le point de contact pour des questions?' />
                        <p className="">Pour toute question, vous pouvez envoyer un courriel à l’adresse <span className='text-blue-500'>brunch-grahn@grahn-monde.org</span>. Il
                            nous fera un plaisir de vous répondre.</p>
                    </li>

                </ul>
            </div>
        </HomeLayout>
    )
}

export default Faq
