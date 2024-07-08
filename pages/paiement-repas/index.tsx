import React from 'react'
import Layout from '@/components/home/layout'
import Head from 'next/head'
import axios from 'axios';
import { getCookie } from 'cookies-next';
import Loader from "@/components/core/loader"
import PaiementLayout from '@/components/paiements/paiement-layout';
import TablePaiement from '@/components/paiements/table-paiement';

// import { useRouter } from "next/router";
// import { revalidatePath } from 'next/cache';
import { useRouter } from 'next/navigation'
import Swal from "sweetalert2";
type Props = {
  data: any
}

const Paiement: React.FC<Props> = ({ data }) => {
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
        text: `Marquer payer ${ids.length} participant${ids.length > 1 ? "s" : ""}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#2563eb',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Marquer payer',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.isConfirmed) {

          // Swal.fire(
          //   'Deleted!',
          //   'Your file has been deleted.',
          //   'success'
          // )
          axios.post(`${process.env.base_route_get}/participants/payments-multiple`, { ids }).then(response => {
            if (response.status === 200) {

              // setAnchorEl(null);
              // revalidatePath('/paiement-repas')
              // router.push('/paiement-repas')
              // console.log(response)
              axios.post(`${process.env.base_route_get}/participants/send-message/paiement`, { ids }).then(response => {

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
            <title>Paiements | Liste</title>
          </Head>

          <PaiementLayout getSelectedRows={getSelectedRows} selectedRows={selectedRows}>
            <div className="bg-white px-8 py-4 shadow-md h-[calc(100vh_-_200px)]">
              {/* <TableUser data={data}/> */}
              <TablePaiement data={data} selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
            </div>
          </PaiementLayout>



        </Layout> : <Loader />
      }
    </>
  )
}
export async function getServerSideProps(context: any) {
  // Fetch data from external API
  // const cookies = new Cookies(req, res);
  const { req, res } = context;
  const cookie = getCookie("token", { req, res })

  try {
    // Fetch data from an API or perform other async operations
    const response = await axios.get(`${process.env.base_route_get}/participants/mode-participation`, {
      headers: {
        withCredentials: true,
        Cookie: cookie
      }
    });
    // const response = await axios.get(`${process.env.base_route_get}/paiement-repas`, {
    //   headers: {
    //     withCredentials: true,
    //     Cookie: cookie
    //   }
    // });
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

export default Paiement
