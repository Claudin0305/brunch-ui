import Layout from "@/components/home/layout";
import Head from "next/head";
import React from "react";
import DeviseLayout from "@/components/devises/devise-layout";
// import AddP
import AddDevise from "@/components/devises/add-devise";
import Loader from "@/components/core/loader"
import {getCookie} from "cookies-next"

const Add:React.FC = () => {
  const token = getCookie('token');
  return (
    <>
    {
      token !== undefined ? <Layout>
      <Head>
        <title>Devise | Ajouter</title>
      </Head>
      <DeviseLayout>
        <div className="bg-white px-8 py-4 shadow-md overflow-y-scroll h-[calc(100vh_-_200px)]">
          <AddDevise data_props={null}/>
        </div>
      </DeviseLayout>
    </Layout> : <Loader/>
    }
    </>
  );
};

export default Add;
