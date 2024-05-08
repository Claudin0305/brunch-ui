import React from 'react'
import Layout from '@/components/home/layout'
import Head from 'next/head'
import axios from 'axios';
import { getCookie } from 'cookies-next';
import Loader from "@/components/core/loader"
import PaiementLayout from '@/components/paiements/paiement-layout';
import TablePaiement from '@/components/paiements/table-paiement';
type Props = {
  data: any
}

const Paiement: React.FC<Props> = ({ data }) => {
  const token = getCookie('token');
  return (
    <>
   {
    token !== undefined ?  <Layout>
      <Head>
        <title>Paiements | Liste</title>
      </Head>

      <PaiementLayout>
        <div className="bg-white px-8 py-4 shadow-md h-[calc(100vh_-_200px)]">
          {/* <TableUser data={data}/> */}
          <TablePaiement data={data} />
        </div>
      </PaiementLayout>



    </Layout> : <Loader/>
   }
    </>
  )
}
export async function getServerSideProps(context: any) {
  // Fetch data from external API
  // const cookies = new Cookies(req, res);
  const { req, res } = context;
  const cookie = getCookie("token", { req, res })

  try {
    // Fetch data from an API or perform other async operations
    const response = await axios.get(`${process.env.base_route_get}/paiement-repas`, {
      headers: {
        withCredentials: true,
        Cookie: cookie
      }
    });
    // const response = await axios.get(`http://localhost:8080/api/events`);
    const data = response.data;

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

export default Paiement
