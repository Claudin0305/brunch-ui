import Layout from "@/components/home/layout";
import Head from "next/head";
import React from "react";
import UtilisateurLayout from "@/components/utilisateurs/utilisateur-layout";
// import AddP
import AddUtilisateur from "@/components/utilisateurs/add-utilisateur";
import Loader from "@/components/core/loader"
import {getCookie} from "cookies-next"
type Props = {
  data: any;
}
const Add: React.FC<Props> = ({ data }) => {
  const token = getCookie('token');
  return (
    <>
    {
      token !== undefined ? <Layout>
      <Head>
        <title>Utilisateurs | Ajouter</title>
      </Head>
      <UtilisateurLayout>
        <div className="bg-white px-8 py-4 shadow-md overflow-y-scroll h-[calc(100vh_-_200px)]">
          <AddUtilisateur data_props={null} />
        </div>
      </UtilisateurLayout>
    </Layout> : <Loader/>
    }
    </>
  );
};

export default Add;
