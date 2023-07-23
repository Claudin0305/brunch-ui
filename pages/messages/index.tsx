import React from 'react'
import Layout from '@/components/home/layout'
import Head from 'next/head'
import MessageLayout from '@/components/messages/message-layout';
import TableMessage from '@/components/messages/table-message';
type Props = {
  data: any
}

const Message: React.FC<Props> = ({ data }) => {
  return (
    <Layout>
      <Head>
        <title>Messages | Liste</title>
      </Head>
      <MessageLayout>
        <div className="bg-white px-8 py-4 shadow-md h-[calc(100vh_-_200px)]">
          {/* <TableUser data={data}/> */}
          <TableMessage data={data} />
        </div>
      </MessageLayout>



    </Layout>
  )
}
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.base_route_get}/messages`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}
export default Message
