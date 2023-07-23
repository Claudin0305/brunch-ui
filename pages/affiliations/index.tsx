import React from 'react'
import Layout from '@/components/home/layout'
import Head from 'next/head'
import AffiliationLayout from '@/components/affiliations/affiliation-layout';
import TableAffiliation from '@/components/affiliations/table-affiliation';
type Props = {
  data: any
}

const Affiliation: React.FC<Props> = ({ data }) => {
  return (
    <Layout>
      <Head>
        <title>Affiliation | Liste</title>
      </Head>
      <AffiliationLayout>
        <div className="bg-white px-8 py-4 shadow-md h-[calc(100vh_-_200px)]">
          {/* <TableUser data={data}/> */}
          <TableAffiliation data={data} />
        </div>
      </AffiliationLayout>



    </Layout>
  )
}
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.base_route_get}/affiliations`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}
export default Affiliation
