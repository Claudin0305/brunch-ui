import Layout from "@/components/home/layout";
import Head from "next/head";
import React from "react";
import { GetServerSideProps } from 'next'
import axios from 'axios';
import TableParticipant from "@/components/participants/table-participant";
import ParticipantLayout from "@/components/participants/participant-layout";
type Props = {
    data: any;
}

const Page: React.FC<Props> = ({ data }) => {
    return (
       <Layout>
      <Head>
        <title>Participants | Liste</title>
      </Head>
      <ParticipantLayout>
        <div className="bg-white px-8 py-4 shadow-md h-[calc(100vh_-_200px)]">
          {/* <TableUser data={data}/> */}
          <TableParticipant data={data} />
        </div>
      </ParticipantLayout>



    </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const res = await fetch(`${process.env.base_route}/participants/all/${context?.params?.id_event}`)
    const data = await res.json()

    // Pass data to the page via props
    return { props: { data } }

    // const [participantsRes] = await Promise.all([
    //     fetch(`${process.env.base_route}/participants/par-evenement/${context?.params?.id_event}`)
    // ]);
    // const [participant] = await Promise.all([
    //     participantsRes.json()
    // ]);
    // ...
    // const res = await fetch(`${process.env.base_route}/departements/${context?.params?.id}`)
    // //    console.log(res)
    // const data = await res.json()
    // const res_ = await fetch(`${process.env.base_route}/pays`)
    // const data_ = await res_.json()
    // console.log(data_)

    // Pass data to the page via props
    // const data = { ...participant }
    // // console.log(data)
    // return { props: { data } }
}

export default Page;
