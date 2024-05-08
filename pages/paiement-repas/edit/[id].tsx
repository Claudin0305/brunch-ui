import Layout from "@/components/home/layout";
import Head from "next/head";
import React from "react";
import { GetServerSideProps } from 'next'
import axios from 'axios';
import { getCookie } from 'cookies-next';
import Loader from '@/components/core/loader';
import PaiementLayout from "@/components/paiements/paiement-layout";
import AddPaiement from "@/components/paiements/add-paiement";
type Props = {
  data: any;
}

const Page: React.FC<Props> = ({ data }) => {
  // console.log(data)
  const token = getCookie('token');
  return (
    <>
      {
        token !== undefined ? <Layout>
          <Head>
            <title>Paiements | Edit</title>
          </Head>

          <PaiementLayout>
            <div className="bg-white px-8 py-4 mb-4 shadow-md h-[calc(100vh_-_215px)] overflow-y-scroll">
              <AddPaiement data_props={data} devises={data?.devises} statuts={data?.statuts} participants={data?.participants} />
            </div>
          </PaiementLayout>
        </Layout> : <Loader />
      }
    </>
  );
};


export const getServerSideProps: GetServerSideProps = async (context) => {
  // ...
  const { req, res } = context;
  const cookie = getCookie("token", { req, res })

  try {
    // Fetch data from an API or perform other async operations
    const [deptsRes, deviseRes, partResp, statutResp] = await Promise.all([
      axios.get(`${process.env.base_route_get}/paiement-repas/${context?.params?.id}`, {
        headers: {
          withCredentials: true,
          Cookie: cookie
        }
      }),
      axios.get(`${process.env.base_route_get}/devises`, {
        headers: {
          withCredentials: true,
          Cookie: cookie
        }
      }),
      axios.get(`${process.env.base_route_get}/participants`, {
        headers: {
          withCredentials: true,
          Cookie: cookie
        }
      }),
      axios.get(`${process.env.base_route_get}/statuts`, {
        headers: {
          withCredentials: true,
          Cookie: cookie
        }
      }),
    ])
    // const response = await axios.get(`http://localhost:8080/api/events`);
    const dat = deptsRes.data;
    const devises = deviseRes.data;
    const participants = partResp.data;
    const statuts = statutResp.data;
    const data = { ...dat, devises: devises, statuts: statuts, participants: participants }

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
    const data: any[] = []
    return {
      props: {
        data
      }
    };
  }
}

export default Page;
