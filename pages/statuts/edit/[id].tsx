import Layout from "@/components/home/layout";
import Head from "next/head";
import React from "react";
import { GetServerSideProps } from 'next'
import StatutLayout from "@/components/statuts/statut-layout";
import AddStatut from "@/components/statuts/add-statut";
type Props = {
  data: any;
}

const Page: React.FC<Props> = ({ data }) => {
  return (
    <Layout>
      <Head>
        <title>Statut | Edit</title>
      </Head>
      <StatutLayout>
        <div className="bg-white px-8 py-4 mb-4 shadow-md h-[calc(100vh_-_215px)] overflow-y-scroll">
          <AddStatut data_props={data} />
        </div>
      </StatutLayout>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // ...
  const res = await fetch(`${process.env.base_route_get}/statuts/${context?.params?.id}`)
  //    console.log(res)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}

export default Page;
