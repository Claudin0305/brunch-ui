import React from 'react'
import Layout from '@/components/home/layout'
import Head from 'next/head'
import UtilisateurLayout from '@/components/utilisateurs/utilisateur-layout';
import TableUtilisateur from '@/components/utilisateurs/table-utilisateur';
type Props = {
  data: any
}

const Utilisateur: React.FC<Props> = ({ data }) => {
  return (
    <Layout>
      <Head>
        <title>Utilisateurs | Liste</title>
      </Head>
      <UtilisateurLayout>
        <div className="bg-white px-8 py-4 shadow-md h-[calc(100vh_-_200px)]">
          <TableUtilisateur data={data} />
        </div>
      </UtilisateurLayout>



    </Layout>
  )
}
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.base_route}/users`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}
export default Utilisateur
