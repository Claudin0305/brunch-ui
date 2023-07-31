import Layout from "@/components/home/layout";
import Head from "next/head";
import React from "react";
import { GetServerSideProps } from 'next'
import HomeLayout from '@/components/core/home-layout'
import axios from 'axios';
import { getCookie } from 'cookies-next';
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
  // ...
const { req, res } = context;
  const cookie = getCookie("token", {req, res})

  try {
    // Fetch data from an API or perform other async operations
    const response = await axios.get(`${process.env.base_route_get}/participants/par-evenement/${context?.params?.id_event}`, {
            headers: {
               withCredentials: true,
        Cookie: cookie
            }
          });
    // const response = await axios.get(`http://localhost:8080/api/events`);
    const data =response.data;

    // Return the data as props
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    // Handle the error
    console.error('Error fetching data:', error);
    // You can return an error prop to display a custom error message on the page
    const data:any[] = []
    return {
      props: {
        data
      }
    };
  }
}


export default Page;
