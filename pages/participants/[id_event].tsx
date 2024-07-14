import Layout from "@/components/home/layout";
import Head from "next/head";
import React from "react";
import { GetServerSideProps } from 'next'
import TableParticipant from "@/components/participants/table-participant";
import ParticipantLayout from "@/components/participants/participant-layout";
import axios from 'axios';
import { getCookie } from 'cookies-next';
import Loader from "@/components/core/loader"
import Swal from "sweetalert2";
import { useRouter } from 'next/navigation'
type Props = {
  data: any;
}

const Page: React.FC<Props> = ({ data }) => {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const token = getCookie('token');
  const router = useRouter()
  const getSelectedRows = () => {
    let ids: string[] = [];
    selectedRows?.forEach((r: any) => {
      ids.push(r.id_participant)
    })
    if (ids.length > 0) {
      Swal.fire({
        title: 'Etes-vous sûr?',
        text: `Annuler l'inscription pour ${ids.length} participant${ids.length > 1 ? "s" : ""}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#2563eb',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Annuler inscription',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.isConfirmed) {

          // Swal.fire(
          //   'Deleted!',
          //   'Your file has been deleted.',
          //   'success'
          // )
          axios.post(`${process.env.base_route_get}/participants/annulation-multiple`, { ids }).then(response => {
            if (response.status === 200) {

              // setAnchorEl(null);
              // revalidatePath('/paiement-repas')
              // router.push('/paiement-repas')
              // console.log(response)
              axios.post(`${process.env.base_route_get}/participants/send-message/annulation`, { ids }).then(response => {

              }).catch((err: any) => {
                console.log(err)
              })
              ids = []
              router.push('/paiement-repas')
              // router.refresh();
            }
          }).catch((err: any) => {
            console.log(err)
          })
        }
      })
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        confirmButtonColor: '#2563eb',
        text: "Aucun paiement à éffectuer!",
        confirmButtonText: 'Terminer',
      });
    }

    // Logique pour manipuler les lignes sélectionnées
  };
  return (
    <>
      {
        token !== undefined ? <Layout>
          <Head>
            <title>Participants | Liste</title>
          </Head>
          <ParticipantLayout>
            <div className="bg-white px-8 py-4 shadow-md h-[calc(100vh_-_200px)]">
              {/* <TableUser data={data}/> */}
              <TableParticipant data={data} setSelectedRows={setSelectedRows}/>
            </div>
          </ParticipantLayout>



        </Layout> : <Loader />
      }
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  // ...
  const { req, res } = context;
  const cookie = getCookie("token", { req, res })

  try {
    // Fetch data from an API or perform other async operations
    const response = await axios.get(`${process.env.base_route_get}/participants/all/${context?.params?.id_event}`, {
      headers: {
        withCredentials: true,
        Cookie: cookie
      }
    });
    // const response = await axios.get(`http://localhost:8080/api/events`);
    const data = response.data;

    // Return the data as props
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    // Handle the error
    console.error('Error fetching data:', error);
    // You can return an error prop to display a custom error message on the page
    const data: any[] = []
    return {
      props: {
        data
      }
    };
  }
}


export default Page;
