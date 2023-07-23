import Layout from "@/components/home/layout";
import Head from "next/head";
import React from "react";
import DepartementLayout from "@/components/geographie/departements/departement-layout";
// import AddP
import AddDepartement from "@/components/geographie/departements/add-departement";
type Props = {
  data:any;
}
const Add:React.FC<Props> = ({data}) => {
  return (
    <Layout>
      <Head>
        <title>Departements | Ajouter</title>
      </Head>
      <DepartementLayout>
        <div className="bg-white px-8 py-4 shadow-md overflow-y-scroll h-[calc(100vh_-_200px)]">
          <AddDepartement data_props={null} pays={data}/>
        </div>
      </DepartementLayout>
    </Layout>
  );
};
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.base_route_get}/pays`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}
export default Add;
