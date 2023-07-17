import Layout from "@/components/home/layout";
import Head from "next/head";
import React from "react";
import AffiliationLayout from "@/components/affiliations/affiliation-layout";
// import AddP
import AddAffiliation from "@/components/affiliations/add-affiliation";

const Add:React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>Affiliation | Ajouter</title>
      </Head>
      <AffiliationLayout>
        <div className="bg-white px-8 py-4 shadow-md overflow-y-scroll h-[calc(100vh_-_200px)]">
          <AddAffiliation data_props={null}/>
        </div>
      </AffiliationLayout>
    </Layout>
  );
};

export default Add;
