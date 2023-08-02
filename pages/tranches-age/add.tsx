import Layout from "@/components/home/layout";
import Head from "next/head";
import React from "react";
import TranchesAgeLayout from "@/components/tranches-ages/tranches-age-layout";
// import AddP
import AddTranchesAge from "@/components/tranches-ages/add-tranches-age";
import Loader from "@/components/core/loader"
import {getCookie} from "cookies-next"

const Add:React.FC = () => {
  const token = getCookie('token');
  return (
    <>
    {
      token !== undefined ? <Layout>
      <Head>
        <title>Tranches-age | Ajouter</title>
      </Head>
      <TranchesAgeLayout>
        <div className="bg-white px-8 py-4 shadow-md overflow-y-scroll h-[calc(100vh_-_200px)]">
          <AddTranchesAge data_props={null}/>
        </div>
      </TranchesAgeLayout>
    </Layout> : <Loader/>
    }
    </>
  );
};

export default Add;
