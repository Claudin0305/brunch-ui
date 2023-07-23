import Layout from "@/components/home/layout";
import Head from "next/head";
import React from "react";
import { GetServerSideProps } from 'next'
import AffiliationLayout from "@/components/affiliations/affiliation-layout";
import AddAffiliation from "@/components/affiliations/add-affiliation";
type Props = {
  data: any;
}

const Page: React.FC<Props> = ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <Head>
        <title>Affiliation | Edit</title>
      </Head>
      <AffiliationLayout>
        <div className="bg-white px-8 py-4 mb-4 shadow-md h-[calc(100vh_-_215px)] overflow-y-scroll">
          <AddAffiliation data_props={data} />
        </div>
      </AffiliationLayout>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // ...
  const res = await fetch(`${process.env.base_route_get}/affiliations/${context?.params?.id}`)
  //    console.log(res)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}

export default Page;
