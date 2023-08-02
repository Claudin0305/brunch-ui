import Head from 'next/head'
import Layout from '@/components/home/layout'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import HomeLayout from '@/components/core/home-layout'
import React from 'react'
import Counter from '@/components/core/counter'
import Link from 'next/link'
import { Button } from '@mui/material'
import HowToRegIcon from '@mui/icons-material/HowToReg';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import Loader from "@/components/core/loader"
type Props = {
    data: any;
}
const Home: React.FC<Props> = ({ data }) => {
  const token = getCookie('token');
    return (
        <>
            {
              token !== undefined ? <><Head>
                <title>Evenements | Participants</title>
                <meta name="description" content="Brunch" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>

                <main className={``}>
                    {/* <h2 className="text-xl md:text-3xl text-blue-500 text-center mb-8">Liste des évènements</h2> */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 p-8">
                        {
                            data?.map((e: any)=>(
                                <Link
                                key={e.idEvent}
                                href={`participants/${e.id_event}`}
                                >
                                    <div className="block shadow-md pb-8 bg-white">
                                        <Image
                                            src={`${process.env.base_route_get}/events/images/${e?.imageDatas?.filter((img:any) => img.active === true)[0]?.name}`}
                                            width={400}
                                            height={400}
                                            alt={'logo évènement'}
                                        />
                                        <h2 className='ml-8 text-blue-500'>{`${e.eventType.replace("_", " ")}'${e.createdAt.split("-")[0]}`}</h2>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </main>
            </Layout></> : <Loader/>
            }
        </>
    )
}
export async function getServerSideProps(context: any) {
  // Fetch data from external API
  // const cookies = new Cookies(req, res);
  const { req, res } = context
  const cookie = getCookie("token", { req, res })

  try {
    // Fetch data from an API or perform other async operations
    const response = await axios.get(`${process.env.base_route_get}/events`, {
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
// export async function getServerSideProps() {
//     // Fetch data from external API
//     const res = await fetch(`${process.env.base_route_get}/events`)
//     const data = await res.json()

//     // Pass data to the page via props
//     return { props: { data } }
// }
export default Home;
