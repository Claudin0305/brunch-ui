import Layout from "@/components/home/layout";
import Head from "next/head";
import React from "react";
import { GetServerSideProps } from 'next'
import MessageLayout from "@/components/messages/message-layout";
import AddMessage from "@/components/messages/add-message";
import axios from 'axios';
type Props = {
  data: any;
}

const Page: React.FC<Props> = ({ data }) => {
  // console.log(data)
  return (
    <Layout>
      <Head>
        <title>Messages | Edit</title>
      </Head>
      <MessageLayout>
        <div className="bg-white px-8 py-4 mb-4 shadow-md h-[calc(100vh_-_215px)] overflow-y-scroll">
          <AddMessage data_props={data} />
        </div>
      </MessageLayout>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {

  const [messagesRes] = await Promise.all([
    fetch(`${process.env.base_route_get}/messages/${context?.params?.id}`)
  ]);
  const [message] = await Promise.all([
    messagesRes.json()
  ]);
  // ...
  // const res = await fetch(`${process.env.base_route}/departements/${context?.params?.id}`)
  // //    console.log(res)
  // const data = await res.json()
  // const res_ = await fetch(`${process.env.base_route}/pays`)
  // const data_ = await res_.json()
  // console.log(data_)

  // Pass data to the page via props
  const data = {...message}
  // console.log(data)
  return { props: { data } }
}

export default Page;
