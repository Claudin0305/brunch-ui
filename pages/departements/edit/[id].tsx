import Layout from "@/components/home/layout";
import Head from "next/head";
import React from "react";
import { GetServerSideProps } from 'next'
import DepartementLayout from "@/components/geographie/departements/departement-layout";
import AddDepartement from "@/components/geographie/departements/add-departement";
import axios from 'axios';
type Props = {
  data: any;
}

const Page: React.FC<Props> = ({ data }) => {
  // console.log(data)
  return (
    <Layout>
      <Head>
        <title>Départements | Edit</title>
      </Head>
      <DepartementLayout>
        <div className="bg-white px-8 py-4 mb-4 shadow-md h-[calc(100vh_-_215px)] overflow-y-scroll">
          <AddDepartement data_props={data} pays={data?.pays} />
        </div>
      </DepartementLayout>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {

  const [deptsRes, paysRes] = await Promise.all([
    fetch(`${process.env.base_route}/departements/${context?.params?.id}`),
    fetch(`${process.env.base_route}/pays`)
  ]);
  const [dept, pays] = await Promise.all([
    deptsRes.json(),
    paysRes.json()
  ]);
  // ...
  // const res = await fetch(`${process.env.base_route}/departements/${context?.params?.id}`)
  // //    console.log(res)
  // const data = await res.json()
  // const res_ = await fetch(`${process.env.base_route}/pays`)
  // const data_ = await res_.json()
  // console.log(data_)

  // Pass data to the page via props
  const data = {...dept, pays: pays}
  // console.log(data)
  return { props: { data } }
}

export default Page;
