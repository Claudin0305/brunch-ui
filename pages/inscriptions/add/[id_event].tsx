
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
const Add: React.FC<Props> = ({ data }) => {
  return (
    <HomeLayout>
      <Head>
        <title>Inscription | Ajouter</title>
      </Head>
      <div className="px-4 md:px-32 mx-auto md:mt-32 mt-16">
        <AddInscription data_props={null} pays={data?.pays} civilites={data?.civilites} tranche_ages={data?.trancheAges} locaux={data?.locaux} event={data?.event} participants={data?.participants} affiliations={data?.affiliations} />
      </div>


    </HomeLayout>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  // ...
const { req, res } = context;
console.log(req.method)

  try {
    // Fetch data from an API or perform other async operations
    const [civiliteResp/*, trancheAgeResp*/, paysResp, locauxResp, eventResp, respPart, respAff] = await Promise.all([
      axios.get(`${process.env.base_route_get}/civilites`),
      // axios.get(`${process.env.base_route_get}/tranche-ages`),
      axios.get(`${process.env.base_route_get}/pays`),
      axios.get(`${process.env.base_route_get}/locaux`),
      axios.get(`${process.env.base_route_get}/events/${context?.params?.id_event}`),
      axios.get(`${process.env.base_route_get}/participants`),
      axios.get(`${process.env.base_route_get}/affiliations`),
    ])
    // const response = await axios.get(`http://localhost:8080/api/events`);
    const civilites = civiliteResp.data;
    // const trancheAges = trancheAgeResp.data;
    const pays = paysResp.data;
    const locaux = locauxResp.data;
    const event = eventResp.data;
    const participants = respPart.data;
    const affiliations = respAff.data;

    const data = { /*trancheAges: trancheAges*/ pays: pays, civilites: civilites, locaux: locaux, event: event, participants: participants, affiliations: affiliations }

    // Return the data as props
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    // Handle the error
    console.error('Error fetching data:', error);
    // You can return an error prop to display a custom error message on the page
    const data:any[] = []
    return {
      props: {
        data
      }
    };
  }
}
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   // Fetch data from external API

//   const [civiliteResp, trancheAgeResp, paysResp, locauxResp, eventResp, respPart, respAff] = await Promise.all([
//     fetch(`${process.env.base_route_get}/civilites`),
//     fetch(`${process.env.base_route_get}/tranche-ages`),
//     fetch(`${process.env.base_route_get}/pays`),
//     fetch(`${process.env.base_route_get}/locaux`),
//     fetch(`${process.env.base_route_get}/events/${context?.params?.id_event}`),
//     fetch(`${process.env.base_route_get}/participants`),
//     fetch(`${process.env.base_route_get}/affiliations`),
//   ]);
//   const [civilites, trancheAges, pays, locaux, event, participants, affiliations] = await Promise.all([
//     civiliteResp.json(),
//     trancheAgeResp.json(),
//     paysResp.json(),
//     locauxResp.json(),
//     eventResp.json(),
//     respPart.json(),
//     respAff.json()
//   ]);

//   const data = { trancheAges: trancheAges, pays: pays, civilites: civilites, locaux: locaux, event: event, participants: participants, affiliations: affiliations }
//   return { props: { data } }
// }
export default Add;
