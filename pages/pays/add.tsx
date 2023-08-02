import Layout from "@/components/home/layout";
import Head from "next/head";
import React from "react";
import PaysLayout from "@/components/geographie/pays/pays-layout";
// import AddP
import AddPays from "@/components/geographie/pays/add-pays";
import Loader from "@/components/core/loader"
import {getCookie} from "cookies-next";

const Add:React.FC = () => {
  const token = getCookie('token');
  return (
    <>
    {
      token !== undefined ? <Layout>
      <Head>
        <title>Pays | Ajouter</title>
      </Head>
      <PaysLayout>
        <div className="bg-white px-8 py-4 shadow-md overflow-y-scroll h-[calc(100vh_-_200px)]">
          <AddPays data_props={null}/>
        </div>
      </PaysLayout>
    </Layout> : <Loader/>
    }
    </>
  );
};

export default Add;
