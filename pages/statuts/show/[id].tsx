import Layout from "@/components/home/layout";
import { GetServerSideProps } from 'next'
import Head from "next/head";
import React, { MouseEvent } from "react";
import Link from 'next/link'
import Button from "@mui/material/Button";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import StatutLayout from "@/components/statuts/statut-layout";
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import axios from 'axios';
import { getCookie } from 'cookies-next';
import Loader from "@/components/core/loader"

import EditIcon from '@mui/icons-material/Edit';
type Props = {
  data: any;
}

const Page: React.FC<Props> = ({ data }) => {
  const token = getCookie('token');
  const router = useRouter()
  const deleteStatut = (id: number) => {
      axios.delete(`/api/statuts/${id}`)
    .then(response=>{
      if (response.status === 200) {
        Swal.fire({
          // position: 'top-end',
          icon: 'success',
          title: 'Suppression effectuée!',
          // showConfirmButton: false,
          // timer: 1500
          // buttonColor:"#000000",
          // buttons:[""]
          confirmButtonColor: "#2563eb",
          confirmButtonText: "Fermer",
        })


        router.push('/statuts')

      }
    }).catch(error=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Echec de suppression!',
        confirmButtonColor: "#2563eb",
            confirmButtonText: "Fermer",
        //   footer: '<a href="">Why do I have this issue?</a>'
      })
    })

  }
  const handleDelete = (event: MouseEvent) => {
    Swal.fire({
      title: 'Etes-vous sûr?',
      text: "Supprimer " + data.libelle,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {

        // Swal.fire(
        //   'Deleted!',
        //   'Your file has been deleted.',
        //   'success'
        // )
        deleteStatut(data.id_statut)
      }
    })

    event.stopPropagation();

  };

  return (
    <>
    { token !== undefined ? <Layout>
      <Head>
        <title>Statut | Détails</title>
      </Head>
      <StatutLayout>
        <div className="bg-white px-8 py-4 mb-4 shadow-md h-[calc(100vh_-_215px)] overflow-y-scroll">

          <div className="flex flex-col gap-y-4 w-1/2 mx-auto">
            <h1 className="font-bold text-sm md:text-lg capitalize bg-slate-100 text-center col-span-2">
              Détails Statut
            </h1>
            <div className="flex justify-between">

              <p>Statut</p><p>{data.libelle}</p>
            </div>



            <hr />
          </div>
          <div className={'flex flex-col gap-y-8 justify-center md:justify-end pt-4 mb-4 md:flex-row md:gap-x-8'}>

            <Button onClick={handleDelete} className="bg-red-600 capitalize" variant="contained" startIcon={<DeleteForeverIcon />}>
              Supprimer
            </Button>

            <Link href={`/statuts/edit/${data.id_statut}`}>
              <Button className="bg-blue-600 capitalize" variant="contained" startIcon={<EditIcon />}>
                Editer
              </Button>
            </Link>

          </div>
        </div>
      </StatutLayout>
    </Layout> : <Loader/>}
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  // ...
const { req, res } = context;
  const cookie = getCookie("token", {req, res})

  try {
    // Fetch data from an API or perform other async operations
    const response = await axios.get(`${process.env.base_route_get}/statuts/${context?.params?.id}`, {
            headers: {
               withCredentials: true,
        Cookie: cookie
            }
          });
    // const response = await axios.get(`http://localhost:8080/api/events`);
    const data =response.data;

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
    const data:any[] = []
    return {
      props: {
        data
      }
    };
  }
}

export default Page;
