import Layout from "@/components/home/layout";
import Head from "next/head";
import React from "react";
import { GetServerSideProps } from 'next'
import CiviliteLayout from "@/components/civilites/civilite-layout";
import AddCivilite from "@/components/civilites/add-civilite";
type Props = {
  data: any;
}

const Page: React.FC<Props> = ({ data }) => {
  return (
    <Layout>
      <Head>
        <title>Civilité | Edit</title>
      </Head>
      <CiviliteLayout>
        <div className="bg-white px-8 py-4 mb-4 shadow-md h-[calc(100vh_-_215px)] overflow-y-scroll">
          <AddCivilite data_props={data} />
        </div>
      </CiviliteLayout>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // ...
  const res = await fetch(`${process.env.base_route_get}/civilites/${context?.params?.id}`)
  //    console.log(res)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}

export default Page;
