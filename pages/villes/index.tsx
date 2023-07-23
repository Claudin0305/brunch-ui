import React from 'react'
import Layout from '@/components/home/layout'
import Head from 'next/head'
import VilleLayout from '@/components/geographie/villes/ville-layout';
import TableVille from '@/components/geographie/villes/table-ville';
type Props = {
  data: any
}

const Ville: React.FC<Props> = ({ data }) => {
  return (
    <Layout>
      <Head>
        <title>Villes | Liste</title>
      </Head>
      <VilleLayout>
        <div className="bg-white px-8 py-4 shadow-md h-[calc(100vh_-_200px)]">
          {/* <TableUser data={data}/> */}
          <TableVille data={data} />
        </div>
      </VilleLayout>



    </Layout>
  )
}
export async function getServerSideProps() {
  // Fetch data from external API
  // const res = await fetch(`${process.env.base_route}/villes`)
  const res = await fetch(`http://localhost:8080/api/villes`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}
export default Ville
