import Layout from "@/components/home/layout";
import Head from "next/head";
import React from "react";
import MessageLayout from "@/components/messages/message-layout";
// import AddP
import AddMessage from "@/components/messages/add-message";
import Loader from "@/components/core/loader"
import {getCookie} from "cookies-next"
type Props = {
  data:any;
}
const Add:React.FC<Props> = ({data}) => {
  const token = getCookie('token');
  return (
    <>
    {
      token !== undefined ? <Layout>
      <Head>
        <title>Messages | Ajouter</title>
      </Head>
      <MessageLayout>
        <div className="bg-white px-8 py-4 shadow-md overflow-y-scroll h-[calc(100vh_-_200px)]">
          <AddMessage data_props={null}/>
        </div>
      </MessageLayout>
    </Layout> : <Loader/>
    }
    </>
  );
};

export default Add;
