import Layout from "@/components/home/layout";
import Head from "next/head";
import React from "react";
import { GetServerSideProps } from 'next'
import UtilisateurLayout from "@/components/utilisateurs/utilisateur-layout";
import AddUtilisateur from "@/components/utilisateurs/add-utilisateur";
import axios from 'axios';
type Props = {
  data: any;
}

const Page: React.FC<Props> = ({ data }) => {
  // console.log(data)
  return (
    <Layout>
      <Head>
        <title>Utilisateurs | Edit</title>
      </Head>
      <UtilisateurLayout>
        <div className="bg-white px-8 py-4 mb-4 shadow-md h-[calc(100vh_-_215px)] overflow-y-scroll">
          <AddUtilisateur data_props={data} />
        </div>
      </UtilisateurLayout>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {

  const [utilisateursRes] = await Promise.all([
    fetch(`${process.env.base_route_get}/users/${context?.params?.id}`)
  ]);
  const [utilisateur] = await Promise.all([
    utilisateursRes.json()
  ]);
  // ...
  // const res = await fetch(`${process.env.base_route}/departements/${context?.params?.id}`)
  // //    console.log(res)
  // const data = await res.json()
  // const res_ = await fetch(`${process.env.base_route}/pays`)
  // const data_ = await res_.json()
  // console.log(data_)

  // Pass data to the page via props
  const data = {...utilisateur}
  // console.log(data)
  return { props: { data } }
}

export default Page;
