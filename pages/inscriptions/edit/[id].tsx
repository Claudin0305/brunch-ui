import Layout from "@/components/home/layout";
import Head from "next/head";
import React from "react";
import { GetServerSideProps } from 'next'
import LocalBrunchLayout from "@/components/local-brunch/local-brunch-layout";
import AddLocalBrunch from "@/components/local-brunch/add-local-brunch";
import axios from 'axios';
type Props = {
  data: any;
}

const Page: React.FC<Props> = ({ data }) => {
  return (
    <Layout>
      <Head>
        <title>Locaux Brunch | Edit</title>
      </Head>
      <LocalBrunchLayout>
        <div className="bg-white px-8 py-4 mb-4 shadow-md h-[calc(100vh_-_215px)] overflow-y-scroll">
          <AddLocalBrunch data_props={data} pays={data?.pays} events={data?.events} devises={data?.devises} />
        </div>
      </LocalBrunchLayout>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {

  const [localRes, eventResp, deviseResp, paysResp] = await Promise.all([
    fetch(`${process.env.base_route}/locaux/${context?.params?.id}`),
    fetch(`${process.env.base_route}/events`),
    fetch(`${process.env.base_route}/devises`),
    fetch(`${process.env.base_route}/pays`),
  ]);
  const [local, events, devises, pays] = await Promise.all([
    localRes.json(),
    eventResp.json(),
    deviseResp.json(),
    paysResp.json()
  ]);
  // ...
  // const res = await fetch(`${process.env.base_route}/departements/${context?.params?.id}`)
  // //    console.log(res)
  // const data = await res.json()
  // const res_ = await fetch(`${process.env.base_route}/pays`)
  // const data_ = await res_.json()
  // console.log(data_)

  // Pass data to the page via props
  const data = {...local, devises:devises, pays:pays, events: events}
  // console.log(data)
  return { props: { data } }
}

export default Page;
