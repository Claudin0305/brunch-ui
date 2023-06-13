import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import HomeNavBar from '@/components/core/home-nav-bar'
import HomeLayout from '@/components/core/home-layout'
import React from 'react'
const inter = Inter({ subsets: ['latin'] })
type Props = {
  data: any;
}
const Home: React.FC<Props>  = ({data})=> {
  console.log(data)
  return (
    <>
      <Head>
        <title>Brunch UI</title>
        <meta name="description" content="Brunch" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <HomeLayout>

      <main className={`bg-white`}>
        <section id="event_home" className="text-white bg-white text-center flex">
          <h1 className="m-auto font-waterfall text-5xl text-white font-bold">Brunch'2023</h1>
        </section>
        {/* <section id="blog" className="text-white bg-purple-600 text-center h-screen flex">
          <h1 className="m-auto font-waterfall text-7xl text-white font-bold">Blog</h1>
        </section>
         <section id="contact" className="text-white bg-black text-center h-screen flex">
          <h1 className="m-auto font-waterfall text-7xl text-purple-600 font-bold">Contact</h1>
        </section>
        <section id="projects" className="text-white bg-purple-600 text-center h-screen flex">
          <h1 className="m-auto font-waterfall text-7xl text-white font-bold">Projects</h1>
        </section> */}
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
