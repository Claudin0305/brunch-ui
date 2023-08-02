import Layout from "@/components/home/layout";
import Head from "next/head";
import React from "react";
import EventLayout from "@/components/evenements/event-layout";
// import AddP
import AddEvent from "@/components/evenements/add-event";
import Loader from "@/components/core/loader"
import {getCookie} from "cookies-next"

const Add: React.FC = () => {
  const token = getCookie('token');
  return (
    <>
    {
      token !== undefined ? <Layout>
      <Head>
        <title>Evénement | Ajouter</title>
      </Head>
      <EventLayout>
        <div className="bg-white px-8 py-4 shadow-md overflow-y-scroll h-[calc(100vh_-_200px)]">
          <AddEvent data_props={null} />
        </div>
      </EventLayout>
    </Layout> : <Loader/>
    }
    </>
  );
};

export default Add;
