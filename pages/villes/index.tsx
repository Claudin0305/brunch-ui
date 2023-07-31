import React from 'react'
import Layout from '@/components/home/layout'
import Head from 'next/head'
import VilleLayout from '@/components/geographie/villes/ville-layout';
import TableVille from '@/components/geographie/villes/table-ville';
import axios from 'axios';
import { getCookie } from 'cookies-next';
type Props = {
  data: any
}

const Ville: React.FC<Props> = ({ data }) => {
  return (
    <Layout>
      <Head>
        <title>Villes | Liste</title>
      </Head>
      <VilleLayout>
        <div className="bg-white px-8 py-4 shadow-md h-[calc(100vh_-_200px)]">
          {/* <TableUser data={data}/> */}
          <TableVille data={data} />
        </div>
      </VilleLayout>



    </Layout>
  )
}
export async function getServerSideProps(context: any) {
  // Fetch data from external API
  // const cookies = new Cookies(req, res);
  const { req, res } = context
  const cookie = getCookie("token", { req, res })

  try {
    // Fetch data from an API or perform other async operations
    const response = await axios.get(`${process.env.base_route_get}/villes`, {
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
export default Ville
