import Layout from "@/components/home/layout";
import Head from "next/head";
import React from "react";
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
          <AddInscription data_props={null} pays={data?.pays} civilites={data?.civilites} tranche_ages={data?.trancheAges}/>
        </div>
      </InscriptionLayout>
    </Layout>
  );
};
export async function getServerSideProps() {
  // Fetch data from external API

  const [civiliteResp, trancheAgeResp, paysResp] = await Promise.all([
    fetch(`${process.env.base_route}/civilites`),
    fetch(`${process.env.base_route}/tranche-ages`),
    fetch(`${process.env.base_route}/pays`),
  ]);
  const [civilites, devises, pays] = await Promise.all([
    civiliteResp.json(),
    trancheAgeResp.json(),
    paysResp.json()
  ]);

  const data = {trancheAges:trancheAges, pays:pays, civilites: civilites}
  return { props: { data } }
}
export default Add;
