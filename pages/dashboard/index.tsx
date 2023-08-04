import React from 'react'
import Layout from '@/components/home/layout'
import Loader from '@/components/core/loader'
import Head from 'next/head'
import { getCookie } from 'cookies-next';

const Dashboard = () => {
  const token = getCookie('token');

  return (
    <>
    {token !== undefined ?<Layout>
      <Head>
        <title>Tableau de bord</title>
      </Head>

      <section>Dashboard</section>


    </Layout> :<Loader/>}
    </>
  )
}

export default Dashboard
