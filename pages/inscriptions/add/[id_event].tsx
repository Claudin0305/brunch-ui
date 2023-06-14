import Layout from "@/components/home/layout";
import Head from "next/head";
import React from "react";
import { GetServerSideProps } from 'next'
import InscriptionLayout from "@/components/inscriptions/inscription-layout";
// import AddP
import AddInscription from "@/components/inscriptions/add-inscription";
type Props = {
  data:any;
}
const Add:React.FC<Props> = ({data}) => {
  console.log(data)
  return (
    <Layout>
      <Head>
        <title>Inscription | Ajouter</title>
      </Head>
      <InscriptionLayout>
        <div className="bg-white px-8 py-4 shadow-md overflow-y-scroll h-[calc(100vh_-_200px)]">
          <AddInscription data_props={null} pays={data?.pays} civilites={data?.civilites} tranche_ages={data?.trancheAges} locaux={data?.locaux} event={data?.event} participants={data?.participants}/>
        </div>
      </InscriptionLayout>
    </Layout>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch data from external API

  const [civiliteResp, trancheAgeResp, paysResp, locauxResp, eventResp, respPart] = await Promise.all([
    fetch(`${process.env.base_route}/civilites`),
    fetch(`${process.env.base_route}/tranche-ages`),
    fetch(`${process.env.base_route}/pays`),
    fetch(`${process.env.base_route}/locaux-brunch`),
    fetch(`${process.env.base_route}/events/${context?.params?.id_event}`),
    fetch(`${process.env.base_route}/participants`),
  ]);
  const [civilites, trancheAges, pays, locaux, event, participants] = await Promise.all([
    civiliteResp.json(),
    trancheAgeResp.json(),
    paysResp.json(),
    locauxResp.json(),
    eventResp.json(),
    respPart.json()
  ]);

  const data = {trancheAges:trancheAges, pays:pays, civilites: civilites, locaux:locaux, event:event, participants:participants}
  return { props: { data } }
}
export default Add;
