
import Head from "next/head";
import React from "react";
import { GetServerSideProps } from 'next'
// import InscriptionLayout from "@/components/inscriptions/inscription-layout";
// import AddP
import HomeLayout from '@/components/core/home-layout'
import AddInscription from "@/components/inscriptions/add-inscription";
import axios from 'axios';
import { getCookie } from 'cookies-next';
type Props = {
    data: any;
}
const Page: React.FC<Props> = ({ data }) => {
    return (
        <HomeLayout>
            <Head>
                <title>Inscription | Modifier</title>
            </Head>
            <div className="px-4 md:px-32 mx-auto md:mt-32 mt-16">
                {/* <AddInscription data_props={data} pays={data?.pays} civilites={data?.civilites} tranche_ages={data?.trancheAges} locaux={data?.locaux} event={data?.event} participants={data?.participants} affiliations={data?.affiliations} /> */}
                Hello
            </div>


        </HomeLayout>
    );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
    // ...
    const { req, res } = context;
    console.log(req.method)
    // if (req.method === 'POST') {

    //     try {
    //         // Fetch data from an API or perform other async operations
    //         const [participant, civiliteResp, trancheAgeResp, paysResp, locauxResp, eventResp, respPart, respAff] = await Promise.all([
    //             axios.get(`${process.env.base_route_get}/participants/${context?.params?.username}`),
    //             axios.get(`${process.env.base_route_get}/civilites`),
    //             axios.get(`${process.env.base_route_get}/tranche-ages`),
    //             axios.get(`${process.env.base_route_get}/pays`),
    //             axios.get(`${process.env.base_route_get}/locaux`),
    //             axios.get(`${process.env.base_route_get}/events/${context?.params?.id_event}`),
    //             axios.get(`${process.env.base_route_get}/participants`),
    //             axios.get(`${process.env.base_route_get}/affiliations`),
    //         ])
    //         // const response = await axios.get(`http://localhost:8080/api/events`);
    //         const dat = participant.data;
    //         const civilites = civiliteResp.data;
    //         const trancheAges = trancheAgeResp.data;
    //         const pays = paysResp.data;
    //         const locaux = locauxResp.data;
    //         const event = eventResp.data;
    //         const participants = respPart.data;
    //         const affiliations = respAff.data;

    //         const data = { ...dat, trancheAges: trancheAges, pays: pays, civilites: civilites, locaux: locaux, event: event, participants: participants, affiliations: affiliations }

    //         // Return the data as props
    //         return {
    //             props: {
    //                 data,
    //             },
    //         };
    //     } catch (error) {
    //         // Handle the error
    //         console.error('Error fetching data:', error);
    //         // You can return an error prop to display a custom error message on the page
    //         const data: any[] = []
    //         return {
    //             props: {
    //                 data
    //             }
    //         };
    //     }
    // }
    // const data: any[] = []
    // return {
    //     props: {
    //         data
    //     }
    // };
    const data: any = []
    return {
        props: {
            data
        }
    };
}

export default Page;
