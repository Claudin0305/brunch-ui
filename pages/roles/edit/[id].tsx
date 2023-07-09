import Layout from "@/components/home/layout";
import Head from "next/head";
import React from "react";
import { GetServerSideProps } from 'next'
import RoleLayout from "@/components/roles/role-layout";
import AddRole from "@/components/roles/add-role";
type Props = {
  data: any;
}

const Page: React.FC<Props> = ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <Head>
        <title>Role | Edit</title>
      </Head>
      <RoleLayout>
        <div className="bg-white px-8 py-4 mb-4 shadow-md h-[calc(100vh_-_215px)] overflow-y-scroll">
          <AddRole data_props={data} />
        </div>
      </RoleLayout>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // ...
  const res = await fetch(`${process.env.base_route}/roles/${context?.params?.id}`)
  //    console.log(res)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}

export default Page;
