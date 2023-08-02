import Layout from "@/components/home/layout";
import Head from "next/head";
import React from "react";
import CiviliteLayout from "@/components/civilites/civilite-layout";
import {getCookie} from 'cookies-next'
import AddCivilite from "@/components/civilites/add-civilite";
import Loader from "@/components/core/loader";

const Add:React.FC = () => {
  const token = getCookie('token');
  return (
    <>
    {token !== undefined ?<Layout>
      <Head>
        <title>Civilité | Ajouter</title>
      </Head>
      <CiviliteLayout>
        <div className="bg-white px-8 py-4 shadow-md overflow-y-scroll h-[calc(100vh_-_200px)]">
          <AddCivilite data_props={null}/>
        </div>
      </CiviliteLayout>
    </Layout> : <Loader/>}
    </>
  );
};

export default Add;



