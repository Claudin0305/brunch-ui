import React from 'react'
import Layout from '@/components/home/layout'
import Head from 'next/head'
import LocalBrunchLayout from '@/components/local-brunch/local-brunch-layout';
import TableLocalBrunch from '@/components/local-brunch/table-local-brunch';
type Props = {
  data: any
}

const LocalBrunch: React.FC<Props> = ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <Head>
        <title>Locaux Brunch | Liste</title>
      </Head>
      <LocalBrunchLayout>
        <div className="bg-white px-8 py-4 shadow-md h-[calc(100vh_-_200px)]">
          <TableLocalBrunch data={data} />
        </div>
      </LocalBrunchLayout>



    </Layout>
  )
}
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.base_route}/locaux`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}
export default LocalBrunch
