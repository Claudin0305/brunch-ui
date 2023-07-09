import React from 'react'
import Layout from '@/components/home/layout'
import Head from 'next/head'
import RoleLayout from '@/components/roles/role-layout';
import TableRole from '@/components/roles/table-role';
type Props = {
  data: any
}

const Role: React.FC<Props> = ({ data }) => {
  return (
    <Layout>
      <Head>
        <title>Role | Liste</title>
      </Head>
      <RoleLayout>
        <div className="bg-white px-8 py-4 shadow-md h-[calc(100vh_-_200px)]">
          {/* <TableUser data={data}/> */}
          <TableRole data={data} />
        </div>
      </RoleLayout>



    </Layout>
  )
}
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.base_route}/roles`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}
export default Role
