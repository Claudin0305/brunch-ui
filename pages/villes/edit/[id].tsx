import Layout from "@/components/home/layout";
import Head from "next/head";
import React from "react";
import { GetServerSideProps } from 'next'
import VilleLayout from "@/components/geographie/villes/ville-layout";
import AddVille from "@/components/geographie/villes/add-ville";
import axios from 'axios';
type Props = {
  data: any;
}

const Page: React.FC<Props> = ({ data }) => {
  // console.log(data)
  return (
    <Layout>
      <Head>
        <title>Villes | Edit</title>
      </Head>
      <VilleLayout>
        <div className="bg-white px-8 py-4 mb-4 shadow-md h-[calc(100vh_-_215px)] overflow-y-scroll">
          <AddVille data_props={data} departements={data?.departement} />
        </div>
      </VilleLayout>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {

  const [villesRes, deptsRes] = await Promise.all([
    fetch(`${process.env.base_route_get}/villes/${context?.params?.id}`),
    // fetch(`http://localhost:8080/api/villes/${context?.params?.id}`),
    fetch(`${process.env.base_route_get}/departements`)
    // fetch(`http://localhost:8080/api/departements`)
  ]);
  const [ville, dept] = await Promise.all([
    villesRes.json(),
    deptsRes.json()
  ]);
  // ...
  // const res = await fetch(`${process.env.base_route}/departements/${context?.params?.id}`)
  // //    console.log(res)
  // const data = await res.json()
  // const res_ = await fetch(`${process.env.base_route}/pays`)
  // const data_ = await res_.json()
  // console.log(data_)

  // Pass data to the page via props
  const data = {...ville, departement: dept}
  // console.log(data)
  return { props: { data } }
}

export default Page;
