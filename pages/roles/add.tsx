import Layout from "@/components/home/layout";
import Head from "next/head";
import React from "react";
import RoleLayout from "@/components/roles/role-layout";
// import AddP
import AddRole from "@/components/roles/add-role";

const Add:React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>Role | Ajouter</title>
      </Head>
      <RoleLayout>
        <div className="bg-white px-8 py-4 shadow-md overflow-y-scroll h-[calc(100vh_-_200px)]">
          <AddRole data_props={null}/>
        </div>
      </RoleLayout>
    </Layout>
  );
};

export default Add;
