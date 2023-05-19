import React from 'react'
import Layout from '@/components/home/layout'
import Head from 'next/head'
import CiviliteLayout from '@/components/civilites/civilite-layout';
import TableCivilite from '@/components/civilites/table-civilite';
type Props = {
  data: any
}

const Civilite: React.FC<Props> = ({ data }) => {
  return (
    <Layout>
      <Head>
        <title>Civilités | Liste</title>
      </Head>
      <CiviliteLayout>
        <div className="bg-white px-8 py-4 shadow-md h-[calc(100vh_-_200px)]">
          {/* <TableUser data={data}/> */}
          <TableCivilite data={data} />
        </div>
      </CiviliteLayout>



    </Layout>
  )
}
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.base_route}/civilites`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}
export default Civilite
