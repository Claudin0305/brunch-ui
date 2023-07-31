import Layout from "@/components/home/layout";
import Head from "next/head";
import React from "react";
import LocalBrunchLayout from "@/components/local-brunch/local-brunch-layout";
// import AddP
import AddLocalBrunch from "@/components/local-brunch/add-local-brunch";
import axios from 'axios';
import { getCookie } from 'cookies-next';
type Props = {
  data:any;
}
const Add:React.FC<Props> = ({data}) => {
  return (
    <Layout>
      <Head>
        <title>Local Evénement | Ajouter</title>
      </Head>
      <LocalBrunchLayout>
        <div className="bg-white px-8 py-4 shadow-md overflow-y-scroll h-[calc(100vh_-_200px)]">
          <AddLocalBrunch data_props={null} pays={data?.pays} events={data?.events} devises={data?.devises}/>
        </div>
      </LocalBrunchLayout>
    </Layout>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  // ...
const { req, res } = context;
  const cookie = getCookie("token", {req, res})

  try {
    // Fetch data from an API or perform other async operations
    const [eventResp, deviseResp, paysResp] = await Promise.all([
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
    const events =eventResp.data;
    const devises = deviseResp.data;
    const pays = paysResp.data;
    const data = {devises:devises, pays:pays, events: events}

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

export default Add;
