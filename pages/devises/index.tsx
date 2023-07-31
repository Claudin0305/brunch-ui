import React from 'react'
import Layout from '@/components/home/layout'
import Head from 'next/head'
import DeviseLayout from '@/components/devises/devise-layout';
import TableDevise from '@/components/devises/table-devise';
import axios from 'axios';
import { getCookie } from 'cookies-next';
type Props = {
  data: any
}

const Devise: React.FC<Props> = ({ data }) => {
  return (
    <Layout>
      <Head>
        <title>Devise | Liste</title>
      </Head>
      <DeviseLayout>
        <div className="bg-white px-8 py-4 shadow-md h-[calc(100vh_-_200px)]">
          {/* <TableUser data={data}/> */}
          <TableDevise data={data} />
        </div>
      </DeviseLayout>



    </Layout>
  )
}
export async function getServerSideProps(context:any) {
  // Fetch data from external API
  // const cookies = new Cookies(req, res);
  const { req, res } = context
  const cookie = getCookie("token", {req, res})

  try {
    // Fetch data from an API or perform other async operations
    const response = await axios.get(`${process.env.base_route_get}/devises`, {
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
    const data:any[] = []
    return {
      props: {
        data
      }
    };
  }
}

export default Devise
