import Layout from "@/components/home/layout";
import Head from "next/head";
import React from "react";
import VilleLayout from "@/components/geographie/villes/ville-layout";
// import AddP
import AddVille from "@/components/geographie/villes/add-ville";
type Props = {
  data:any;
}
const Add:React.FC<Props> = ({data}) => {
  return (
    <Layout>
      <Head>
        <title>Villes | Ajouter</title>
      </Head>
      <VilleLayout>
        <div className="bg-white px-8 py-4 shadow-md overflow-y-scroll h-[calc(100vh_-_200px)]">
          <AddVille data_props={null} departements={data}/>
        </div>
      </VilleLayout>
    </Layout>
  );
};
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.base_route}/departements`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}
export default Add;
