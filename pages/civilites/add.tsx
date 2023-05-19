import Layout from "@/components/home/layout";
import Head from "next/head";
import React from "react";
import CiviliteLayout from "@/components/civilites/civilite-layout";
// import AddP
import AddCivilite from "@/components/civilites/add-civilite";

const Add:React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>Civilité | Ajouter</title>
      </Head>
      <CiviliteLayout>
        <div className="bg-white px-8 py-4 shadow-md overflow-y-scroll h-[calc(100vh_-_200px)]">
          <AddCivilite data_props={null}/>
        </div>
      </CiviliteLayout>
    </Layout>
  );
};

export default Add;
