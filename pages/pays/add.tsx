import Layout from "@/components/home/layout";
import Head from "next/head";
import React from "react";
import PaysLayout from "@/components/geographie/pays/pays-layout";
// import AddP
import AddPays from "@/components/geographie/pays/add-pays";

const Add:React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>Pays | Ajouter</title>
      </Head>
      <PaysLayout>
        <div className="bg-white px-8 py-4 shadow-md overflow-y-scroll h-[calc(100vh_-_200px)]">
          <AddPays data_props={null}/>
        </div>
      </PaysLayout>
    </Layout>
  );
};

export default Add;
