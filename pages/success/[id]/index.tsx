import HomeLayout from '@/components/core/home-layout'
import Head from 'next/head'
import React from 'react'
import axios from 'axios';
import { GetServerSideProps } from 'next'
import Link from 'next/link';
type Props = {
    data: any
}
const Page: React.FC<Props> = ({ data }) => {

    return (
        <HomeLayout>
            <Head>
                <title>Confirmation paiement paypal</title>
            </Head>
            <div className='flex flex-col items-center justify-center mt-24 h-[70vh]'>
                <h1 className="text-3xl">Confirmation de paiement!</h1>
                <p>{data?.nomCivilte} {data?.nom} {data?.prenom}, </p>
                <p>Le commité du Brunch vous remercie pour votre paiement. Vous allez recevoir un email de confirmation avec les détails du paiement.</p>
                <p>Pour afficher la liste des inscrit, <Link className="text-blue-600" href={`/liste-participants/${data?.idEvent}`}>Cliquez ici</Link></p>
            </div>
        </HomeLayout >
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
        // console.log(data);
        const formData = new FormData();
        formData.append("id_participant", data.id_participant);
        formData.append('id_event', data.idEvent)
        axios.post(`${process.env.base_route_get}/participants/send-message`, formData, {
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        })
            .then(answer => {
                if (answer.status === 201) {
                    console.log("Message envoyer")
                }
            }).catch(errorSend => {
                console.log(errorSend)
            })
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

