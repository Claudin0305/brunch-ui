import React from 'react'
import Layout from '@/components/home/layout'
import Head from 'next/head'
import StatutLayout from '@/components/statuts/statut-layout';
import TableStatut from '@/components/statuts/table-statut';
type Props = {
  data: any
}

const Statut: React.FC<Props> = ({ data }) => {
  return (
    <Layout>
      <Head>
        <title>Statut | Liste</title>
      </Head>
      <StatutLayout>
        <div className="bg-white px-8 py-4 shadow-md h-[calc(100vh_-_200px)]">
          {/* <TableUser data={data}/> */}
          <TableStatut data={data} />
        </div>
      </StatutLayout>



    </Layout>
  )
}
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.base_route}/statuts`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}
export default Statut
