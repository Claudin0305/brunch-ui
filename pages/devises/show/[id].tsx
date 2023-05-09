import Layout from "@/components/home/layout";
import { GetServerSideProps } from 'next'
import Head from "next/head";
import React, { MouseEvent } from "react";
import Link from 'next/link'
import Button from "@mui/material/Button";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeviseLayout from "@/components/devises/devise-layout";
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

import EditIcon from '@mui/icons-material/Edit';
type Props = {
  data: any;
}

const Page: React.FC<Props> = ({ data }) => {
  const router = useRouter()
  const deleteDevise = (id: number) => {
    fetch(`${process.env.base_route}/devises/${id}`, {
      method: "DELETE",

      headers: {
        "content-type": "application/json",
      },
    }).then(response => {
      console.log(response)
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


        router.push('/devises')

      }
    }).catch((e) => {
      console.log(e)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Echec de suppression!',
        //   footer: '<a href="">Why do I have this issue?</a>'
      })
    });
  }
  const handleDelete = (event: MouseEvent) => {
    Swal.fire({
      title: 'Etes-vous sûr?',
      text: "Supprimer " + data.devise,
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
        deleteDevise(data.id_devise)
      }
    })

    event.stopPropagation();

  };

  return (
    <Layout>
      <Head>
        <title>Devise | Details</title>
      </Head>
      <DeviseLayout>
        <div className="bg-white px-8 py-4 mb-4 shadow-md h-[calc(100vh_-_215px)] overflow-y-scroll">

          <div className="flex flex-col gap-y-4 w-1/2 mx-auto">
            <h1 className="font-bold text-sm md:text-lg capitalize bg-slate-100 text-center col-span-2">
              Détails Devise
            </h1>
            <div className="flex justify-between">

              <p>Devise</p><p>{data.devise}</p>
            </div>
            <div className="flex justify-between">

              <p>Code devise</p><p>{data.code_devise}</p>
            </div>


            <hr />
          </div>
          <div className={'flex flex-col gap-y-8 justify-center md:justify-end pt-4 mb-4 md:flex-row md:gap-x-8'}>

            <Button onClick={handleDelete} className="bg-red-600 capitalize" variant="contained" startIcon={<DeleteForeverIcon />}>
              Supprimer
            </Button>

            <Link href={`/devises/edit/${data.id_devise}`}>
              <Button className="bg-blue-600 capitalize" variant="contained" startIcon={<EditIcon />}>
                Editer
              </Button>
            </Link>

          </div>
        </div>
      </DeviseLayout>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // ...
  const res = await fetch(`${process.env.base_route}/devises/${context?.params?.id}`)
  //    console.log(res)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}

export default Page;
