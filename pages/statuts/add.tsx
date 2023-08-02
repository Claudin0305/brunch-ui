import Layout from "@/components/home/layout";
import Head from "next/head";
import React from "react";
import StatutLayout from "@/components/statuts/statut-layout";
// import AddP
import AddStatut from "@/components/statuts/add-statut";
import Loader from "@/components/core/loader"
import {getCookie} from "cookies-next"

const Add:React.FC = () => {
  const token = getCookie('token');
  return (
    <>
    {token !== undefined ? <Layout>
      <Head>
        <title>Statut | Ajouter</title>
      </Head>
      <StatutLayout>
        <div className="bg-white px-8 py-4 shadow-md overflow-y-scroll h-[calc(100vh_-_200px)]">
          <AddStatut data_props={null}/>
        </div>
      </StatutLayout>
    </Layout> : <Loader/>}
    </>
  );
};

export default Add;
