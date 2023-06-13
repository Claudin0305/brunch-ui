import React from 'react'
import Layout from '@/components/home/layout'
import Head from 'next/head'
import EventLayout from '@/components/evenements/event-layout';
import TableEvent from '@/components/evenements/table-event';
type Props = {
  data: any
}

const Event: React.FC<Props> = ({ data }) => {

  return (
    <Layout>
      <Head>
        <title>Evénements | Liste</title>
      </Head>
      <EventLayout>
        <div className="bg-white px-8 py-4 shadow-md h-[calc(100vh_-_200px)]">
          {/* <TableUser data={data}/> */}
          <TableEvent data={data} />
        </div>
      </EventLayout>



    </Layout>
  )
}
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.base_route}/events`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}
export default Event
