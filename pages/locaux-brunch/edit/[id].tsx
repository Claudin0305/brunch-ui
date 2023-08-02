import Layout from "@/components/home/layout";
import Head from "next/head";
import React from "react";
import { GetServerSideProps } from 'next'
import LocalBrunchLayout from "@/components/local-brunch/local-brunch-layout";
import AddLocalBrunch from "@/components/local-brunch/add-local-brunch";
import axios from 'axios';
import { getCookie } from 'cookies-next';
import Loader from "@/components/core/loader"
type Props = {
  data: any;
}

const Page: React.FC<Props> = ({ data }) => {
  const token = getCookie('token');
  // console.log(data)
  return (
    <>
    {
      token !== undefined ? <Layout>
      <Head>
        <title>Locaux Evénement | Edit</title>
      </Head>
      <LocalBrunchLayout>
        <div className="bg-white px-8 py-4 mb-4 shadow-md h-[calc(100vh_-_215px)] overflow-y-scroll">
          <AddLocalBrunch data_props={data} pays={data?.pays} events={data?.events} devises={data?.devises} />
        </div>
      </LocalBrunchLayout>
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
    const [localRes, eventResp, deviseResp, paysResp] = await Promise.all([
      axios.get(`${process.env.base_route_get}/locaux/${context?.params?.id}`, {
            headers: {
               withCredentials: true,
        Cookie: cookie
            }
          }),
      axios.get(`${process.env.base_route_get}/events`, {
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
          axios.get(`${process.env.base_route_get}/pays`, {
            headers: {
               withCredentials: true,
        Cookie: cookie
            }
          })
    ])
    // const response = await axios.get(`http://localhost:8080/api/events`);
    const local = localRes.data
    const events =eventResp.data;
    const devises = deviseResp.data;
    const pays = paysResp.data;
    const data = {...local, devises:devises, pays:pays, events: events}

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
// export const getServerSideProps: GetServerSideProps = async (context) => {

//   const [localRes, eventResp, deviseResp, paysResp] = await Promise.all([
//     fetch(`${process.env.base_route_get}/locaux/${context?.params?.id}`),
//     fetch(`${process.env.base_route_get}/events`),
//     fetch(`${process.env.base_route_get}/devises`),
//     fetch(`${process.env.base_route_get}/pays`),
//   ]);
//   const [local, events, devises, pays] = await Promise.all([
//     localRes.json(),
//     eventResp.json(),
//     deviseResp.json(),
//     paysResp.json()
//   ]);
//   // ...
//   // const res = await fetch(`${process.env.base_route}/departements/${context?.params?.id}`)
//   // //    console.log(res)
//   // const data = await res.json()
//   // const res_ = await fetch(`${process.env.base_route}/pays`)
//   // const data_ = await res_.json()
//   // console.log(data_)

//   // Pass data to the page via props
//   const data = {...local, devises:devises, pays:pays, events: events}
//   // console.log(data)
//   return { props: { data } }
// }

export default Page;
