import Layout from "@/components/home/layout";
import Head from "next/head";
import React from "react";
import { GetServerSideProps } from 'next'
import HomeLayout from '@/components/core/home-layout'
import axios from 'axios';
import TableParticipant from "@/components/liste-participants/participants-table";
type Props = {
    data: any;
}

const Page: React.FC<Props> = ({ data }) => {
    return (
        <>
            <Head>
                <title>Participants | Liste</title>
            </Head>
            <HomeLayout>
                <main className="bg-white md:mt-32 mt-8 px-8 md:px-16 mx-auto h-screen">
                    <TableParticipant data={data}/>
                </main>
            </HomeLayout>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const res = await fetch(`${process.env.base_route_get}/participants/par-evenement/${context?.params?.id_event}`)
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
