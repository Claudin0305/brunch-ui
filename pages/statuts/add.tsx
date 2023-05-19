import Layout from "@/components/home/layout";
import Head from "next/head";
import React from "react";
import StatutLayout from "@/components/statuts/statut-layout";
// import AddP
import AddStatut from "@/components/statuts/add-statut";

const Add:React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>Statut | Ajouter</title>
      </Head>
      <StatutLayout>
        <div className="bg-white px-8 py-4 shadow-md overflow-y-scroll h-[calc(100vh_-_200px)]">
          <AddStatut data_props={null}/>
        </div>
      </StatutLayout>
    </Layout>
  );
};

export default Add;
