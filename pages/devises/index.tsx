import React from 'react'
import Layout from '@/components/home/layout'
import Head from 'next/head'
import DeviseLayout from '@/components/devises/devise-layout';
import TableDevise from '@/components/devises/table-devise';
type Props = {
  data: any
}

const Devise: React.FC<Props> = ({ data }) => {
  return (
    <Layout>
      <Head>
        <title>Devise | Liste</title>
      </Head>
      <DeviseLayout>
        <div className="bg-white px-8 py-4 shadow-md h-[calc(100vh_-_200px)]">
          {/* <TableUser data={data}/> */}
          <TableDevise data={data} />
        </div>
      </DeviseLayout>



    </Layout>
  )
}
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.base_route_get}/devises`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}
export default Devise
