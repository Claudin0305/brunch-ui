import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import HomeLayout from '@/components/core/home-layout'
import React from 'react'
import Counter from '@/components/core/counter'
import Link from 'next/link'
import { Button } from '@mui/material'
import HowToRegIcon from '@mui/icons-material/HowToReg';
const inter = Inter({ subsets: ['latin'] })
type Props = {
  data: any;
}
const Home: React.FC<Props> = ({ data }) => {
  console.log(data);
  const date_fin = data?.[0].date_fin.split("T")[0].replaceAll('-', '/');
  const heure_fin = data?.[0].heure_fin;
  const date_limite = new Date(date_fin).toLocaleDateString('fr-fr', { weekday: "long", year: "numeric", month: "short", day: "numeric" }).split(" ")
  return (
    <>
      <Head>
        <title>Evenements</title>
        <meta name="description" content="Brunch" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeLayout>

        <main className={`bg-white`}>
          <section id="event_home" className="text-white bg-white text-center flex z-40 mb-4 md:mb-8">
            <h1 className="m-auto font-waterfall text-5xl text-white font-bold">{`${data?.[0].eventType.replace("_", " ")}&apos;${data?.[0].createdAt.split("-")[0]}`}</h1>
          </section>
          <div className='px-8 md:px-32 mb-4 md:mb-8 container mx-auto flex flex-col w-full space-y-4'>
            <h3 className='uppercase text-gray-400 text-lg flex items-center'>a venir <span className='w-32 h-1 ml-2 border-t-2 border-t-blue-400 border border-b-0 border-r-0 border-l-0'></span> </h3>
            <h1 className='uppercase text-3xl font-bold text-black'>evènements proches</h1>
          </div>
          {/* Description event */}
          <section className='px-8 md:px-32 mb-4 md:mb-8 mx-auto flex flex-col-reverse md:flex-row gap-4 items-center md:items-start'>
            <div className='w-2/3 p-4'>
              <div className='mb-4 md:mb-8' dangerouslySetInnerHTML={{ __html: data?.[0].text_descriptif }}>
              </div>
              <div className='flex items-start'>
                <Link href={`/inscriptions/add/${data?.[0].id_event}`}>
                  <Button className="bg-blue-500 capitalize" variant="contained" startIcon={<HowToRegIcon />}>
                    S&apos;inscrire
                  </Button>
                </Link>
              </div>
            </div>
            <div className='w-2/3'>
              <Image
                src={`${process.env.base_route}/events/images/${data?.[0].eventImages?.filter(img => img.active === true)[0]?.name}`}
                width={400}
                height={400}
                alt={'logo évènement'}
              />
            </div>
          </section>
          <section id='counter' className='mb-8'>
            <Counter date_fin={`${date_fin} ${heure_fin}:00`} date_limite={date_limite} />
          </section>
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
