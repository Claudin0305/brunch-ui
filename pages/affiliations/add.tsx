import Layout from "@/components/home/layout";
import Head from "next/head";
import React from "react";
import AffiliationLayout from "@/components/affiliations/affiliation-layout";
// import AddP
import AddAffiliation from "@/components/affiliations/add-affiliation";
import Loader from '@/components/core/loader';
import { getCookie } from 'cookies-next';

const Add:React.FC = () => {
  const token = getCookie('token');
  return (
    <>
    {token !== undefined ? <Layout>
      <Head>
        <title>Affiliation | Ajouter</title>
      </Head>
      <AffiliationLayout>
        <div className="bg-white px-8 py-4 shadow-md overflow-y-scroll h-[calc(100vh_-_200px)]">
          <AddAffiliation data_props={null}/>
        </div>
      </AffiliationLayout>
    </Layout> : <Loader/>}
    </>
  );
};

export default Add;
