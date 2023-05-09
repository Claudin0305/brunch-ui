import Layout from "@/components/home/layout";
import Head from "next/head";
import React from "react";
import { GetServerSideProps } from 'next'
import DeviseLayout from "@/components/devises/devise-layout";
import AddDevise from "@/components/devises/add-devise";
type Props = {
  data: any;
}

const Page: React.FC<Props> = ({ data }) => {
  return (
    <Layout>
      <Head>
        <title>Devise | Edit</title>
      </Head>
      <DeviseLayout>
        <div className="bg-white px-8 py-4 mb-4 shadow-md h-[calc(100vh_-_215px)] overflow-y-scroll">
          <AddDevise data_props={data} />
        </div>
      </DeviseLayout>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // ...
  const res = await fetch(`${process.env.base_route}/devises/${context?.params?.id}`)
  //    console.log(res)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}

export default Page;
