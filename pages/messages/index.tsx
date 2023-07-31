import React from 'react'
import Layout from '@/components/home/layout'
import Head from 'next/head'
import MessageLayout from '@/components/messages/message-layout';
import TableMessage from '@/components/messages/table-message';
import axios from 'axios';
import { getCookie } from 'cookies-next';
type Props = {
  data: any
}

const Message: React.FC<Props> = ({ data }) => {
  return (
    <Layout>
      <Head>
        <title>Messages | Liste</title>
      </Head>
      <MessageLayout>
        <div className="bg-white px-8 py-4 shadow-md h-[calc(100vh_-_200px)]">
          {/* <TableUser data={data}/> */}
          <TableMessage data={data} />
        </div>
      </MessageLayout>



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
    const response = await axios.get(`${process.env.base_route_get}/messages`, {
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

export default Message
