import Layout from "@/components/home/layout";
import Head from "next/head";
import React from "react";
import LocalBrunchLayout from "@/components/local-brunch/local-brunch-layout";
// import AddP
import AddLocalBrunch from "@/components/local-brunch/add-local-brunch";
type Props = {
  data:any;
}
const Add:React.FC<Props> = ({data}) => {
  console.log(data)
  return (
    <Layout>
      <Head>
        <title>Local Evénement | Ajouter</title>
      </Head>
      <LocalBrunchLayout>
        <div className="bg-white px-8 py-4 shadow-md overflow-y-scroll h-[calc(100vh_-_200px)]">
          <AddLocalBrunch data_props={null} pays={data?.pays} events={data?.events} devises={data?.devises}/>
        </div>
      </LocalBrunchLayout>
    </Layout>
  );
};
export async function getServerSideProps() {
  // Fetch data from external API

  const [eventResp, deviseResp, paysResp] = await Promise.all([
    fetch(`${process.env.base_route_get}/events`),
    fetch(`${process.env.base_route_get}/devises`),
    fetch(`${process.env.base_route_get}/pays`),
  ]);
  const [events, devises, pays] = await Promise.all([
    eventResp.json(),
    deviseResp.json(),
    paysResp.json()
  ]);

  const data = {devises:devises, pays:pays, events: events}
  return { props: { data } }
}
export default Add;
