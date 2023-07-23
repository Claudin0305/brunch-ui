import React from 'react'
import Layout from '@/components/home/layout'
import Head from 'next/head'
import DepartementLayout from '@/components/geographie/departements/departement-layout';
import TableDepartement from '@/components/geographie/departements/table-departement';
type Props = {
  data: any
}

const Departement: React.FC<Props> = ({ data }) => {
  return (
    <Layout>
      <Head>
        <title>Départements | Liste</title>
      </Head>
      <DepartementLayout>
        <div className="bg-white px-8 py-4 shadow-md h-[calc(100vh_-_200px)]">
          {/* <TableUser data={data}/> */}
          <TableDepartement data={data} />
        </div>
      </DepartementLayout>



    </Layout>
  )
}
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.base_route_get}/departements`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}
export default Departement
