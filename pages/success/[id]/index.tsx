import HomeLayout from '@/components/core/home-layout'
import Head from 'next/head'
import React from 'react'
import axios from 'axios';
import { GetServerSideProps } from 'next'
type Props={
    data:any
}
const Page :React.FC<Props> = ({data}) => {
    console.log(data)
    return (
        <HomeLayout>
            <Head>
                <title>Confirmation paiement paypal</title>
            </Head>
            <div className='flex items-center justify-center text-3xl mt-24 h-[70vh]'>Le paiement a été effectué avec succès!</div>
        </HomeLayout>
    )
}

export default Page

export const getServerSideProps: GetServerSideProps = async (context) => {
    // ...
    const { req, res } = context;
    // const cookie = getCookie("token", { req, res })

    try {
        // Fetch data from an API or perform other async operations
        const response = await axios.get(`${process.env.base_route_get}/participants/${context?.params?.id}`);
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

