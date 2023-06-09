import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import HomeLayout from '@/components/core/home-layout'
import React from 'react'
import Counter from '@/components/core/counter'
import Link from 'next/link'
import { Button } from '@mui/material'
import HowToRegIcon from '@mui/icons-material/HowToReg';
type Props = {
    data: any;
}
const Home: React.FC<Props> = ({ data }) => {
    console.log(data)
    return (
        <>
            <Head>
                <title>Evenements</title>
                <meta name="description" content="Brunch" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <HomeLayout>

                <main className={`bg-white px-32 mx-auto`}>
                    <h2 className="text-xl md:text-3xl text-blue-500 text-center mb-8 md:mt-32">Liste des évènements</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4">
                        {
                            data?.map((e: any)=>(
                                <Link
                                key={e.idEvent}
                                href={`liste-participants/${e.id_event}`}
                                >
                                    <div className="block shadow-md pb-8">
                                        <Image
                                            src={`${process.env.base_route}/events/images/${e?.eventImages?.filter(img => img.active === true)[0]?.name}`}
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
            </HomeLayout>
        </>
    )
}
export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`${process.env.base_route}/events`)
    const data = await res.json()

    // Pass data to the page via props
    return { props: { data } }
}
export default Home;
