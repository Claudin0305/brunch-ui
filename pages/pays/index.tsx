import React from 'react'
import Layout from '@/components/home/layout'
import Head from 'next/head'
import PaysLayout from '@/components/geographie/pays/pays-layout';
import TablePays from '@/components/geographie/pays/table-pays';
type Props = {
  data: any
}

const Pays: React.FC<Props> = ({ data }) => {
  return (
    <Layout>
      <Head>
        <title>Pays | Liste</title>
      </Head>
      <PaysLayout>
        <div className="bg-white px-8 py-4 shadow-md h-[calc(100vh_-_200px)]">
          {/* <TableUser data={data}/> */}
          <TablePays data={data} />
        </div>
      </PaysLayout>



    </Layout>
  )
}
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.base_route_get}/pays`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}
export default Pays
