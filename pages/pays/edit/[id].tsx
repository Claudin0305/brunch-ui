import Layout from "@/components/home/layout";
import Head from "next/head";
import React from "react";
import { GetServerSideProps } from 'next'
import PaysLayout from "@/components/geographie/pays/pays-layout";
import AddPays from "@/components/geographie/pays/add-pays";
type Props = {
  data: any;
}

const Page: React.FC<Props> = ({ data }) => {
  return (
    <Layout>
      <Head>
        <title>Pays | Edit</title>
      </Head>
      <PaysLayout>
        <div className="bg-white px-8 py-4 mb-4 shadow-md h-[calc(100vh_-_215px)] overflow-y-scroll">
          <AddPays data_props={data} />
        </div>
      </PaysLayout>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // ...
  const res = await fetch(`${process.env.base_route}/pays/${context?.params?.id}`)
  //    console.log(res)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}

export default Page;
