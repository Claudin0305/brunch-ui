import React from 'react'
import Layout from '@/components/home/layout'
import Head from 'next/head'
import TranchesAgeLayout from '@/components/tranches-age/tranches-age-layout';
import TableTranchesAge from '@/components/tranches-age/table-tranches-age';
type Props = {
  data: any
}

const TranchesAge: React.FC<Props> = ({ data }) => {
  return (
    <Layout>
      <Head>
        <title>Tranches-age | Liste</title>
      </Head>
      <TranchesAgeLayout>
        <div className="bg-white px-8 py-4 shadow-md h-[calc(100vh_-_200px)]">
          {/* <TableUser data={data}/> */}
          <TableTranchesAge data={data} />
        </div>
      </TranchesAgeLayout>



    </Layout>
  )
}
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.base_route}/tranches-ages`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}
export default TranchesAge
