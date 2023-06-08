import React from 'react'
import Layout from '@/components/home/layout'
import Head from 'next/head'
import InscriptionLayout from '@/components/local-brunch/local-brunch-layout';
import TableInscription from '@/components/local-brunch/table-local-brunch';
type Props = {
  data: any
}

const LocalBrunch: React.FC<Props> = ({ data }) => {
  return (
    <Layout>
      <Head>
        <title>Inscription | Liste</title>
      </Head>
      <InscriptionLayout>
        <div className="bg-white px-8 py-4 shadow-md h-[calc(100vh_-_200px)]">
          <TableInscription data={data} />
        </div>
      </InscriptionLayout>



    </Layout>
  )
}
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.base_route}/inscriptions`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}
export default LocalBrunch
