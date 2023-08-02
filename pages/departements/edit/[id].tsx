import Layout from "@/components/home/layout";
import Head from "next/head";
import React from "react";
import { GetServerSideProps } from 'next'
import DepartementLayout from "@/components/geographie/departements/departement-layout";
import AddDepartement from "@/components/geographie/departements/add-departement";
import axios from 'axios';
import { getCookie } from 'cookies-next';
import Loader from '@/components/core/loader';
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
        <title>Départements | Edit</title>
      </Head>
      <DepartementLayout>
        <div className="bg-white px-8 py-4 mb-4 shadow-md h-[calc(100vh_-_215px)] overflow-y-scroll">
          <AddDepartement data_props={data} pays={data?.pays} />
        </div>
      </DepartementLayout>
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
    const [deptsRes, paysRes] = await Promise.all([
      axios.get(`${process.env.base_route_get}/departements/${context?.params?.id}`, {
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
    const dat =deptsRes.data;
    const pays = paysRes.data;
    const data = {...dat, pays:pays}

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
