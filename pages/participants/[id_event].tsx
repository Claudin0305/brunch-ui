import Layout from "@/components/home/layout";
import Head from "next/head";
import React from "react";
import { GetServerSideProps } from 'next'
import TableParticipant from "@/components/participants/table-participant";
import ParticipantLayout from "@/components/participants/participant-layout";
import axios from 'axios';
import { getCookie } from 'cookies-next';
import Loader from "@/components/core/loader"
type Props = {
    data: any;
}

const Page: React.FC<Props> = ({ data }) => {
  const token = getCookie('token');
    return (
      <>
       {
        token !== undefined ? <Layout>
      <Head>
        <title>Participants | Liste</title>
      </Head>
      <ParticipantLayout>
        <div className="bg-white px-8 py-4 shadow-md h-[calc(100vh_-_200px)]">
          {/* <TableUser data={data}/> */}
          <TableParticipant data={data} />
        </div>
      </ParticipantLayout>



    </Layout> : <Loader/>
       }
    </>
    );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  // ...
const { req, res } = context;
  const cookie = getCookie("token", {req, res})

  try {
    // Fetch data from an API or perform other async operations
    const response = await axios.get(`${process.env.base_route_get}/participants/all/${context?.params?.id_event}`, {
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
