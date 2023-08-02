import Layout from "@/components/home/layout";
import Head from "next/head";
import React from "react";
import { GetServerSideProps } from 'next'
import VilleLayout from "@/components/geographie/villes/ville-layout";
import AddVille from "@/components/geographie/villes/add-ville";
import axios from 'axios';
import Loader from "@/components/core/loader"
import { getCookie } from 'cookies-next';
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
        <title>Villes | Edit</title>
      </Head>
      <VilleLayout>
        <div className="bg-white px-8 py-4 mb-4 shadow-md h-[calc(100vh_-_215px)] overflow-y-scroll">
          <AddVille data_props={data} departements={data?.departement} />
        </div>
      </VilleLayout>
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
    const [villesRes, deptsRes] = await Promise.all([
      axios.get(`${process.env.base_route_get}/villes/${context?.params?.id}`, {
            headers: {
               withCredentials: true,
        Cookie: cookie
            }
          }),
          axios.get(`${process.env.base_route_get}/departements`, {
            headers: {
               withCredentials: true,
        Cookie: cookie
            }
          })
    ])
    // const response = await axios.get(`http://localhost:8080/api/events`);
    const dat =villesRes.data;
    const dept = deptsRes.data;
    const data = {...dat, departement:dept}

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
