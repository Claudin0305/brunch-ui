import Layout from "@/components/home/layout";
import { GetServerSideProps } from 'next'
import Head from "next/head";
import React, { MouseEvent } from "react";
import Link from 'next/link'
import Button from "@mui/material/Button";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LocalBrunchLayout from "@/components/local-brunch/local-brunch-layout";
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

import EditIcon from '@mui/icons-material/Edit';
type Props = {
  data: any;
}

const Page: React.FC<Props> = ({ data }) => {
  const router = useRouter()
  const deleteLocalBrunch = (id: number) => {
    fetch(`${process.env.base_route}/locaux-brunch/${id}`, {
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


        router.push('/locaux-brunch')

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
        deleteLocalBrunch(data.id_local)
      }
    })

    event.stopPropagation();

  };

  return (
    <Layout>
      <Head>
        <title>Local Brunch | Details</title>
      </Head>
      <LocalBrunchLayout>
        <div className="bg-white px-8 py-4 mb-4 shadow-md h-[calc(100vh_-_215px)] overflow-y-scroll">

          <div className="flex flex-col gap-y-4 w-1/2 mx-auto">
            <h1 className="font-bold text-sm md:text-lg capitalize bg-slate-100 text-center col-span-2">
              Détails LocalBrunch
            </h1>
            <div className="flex justify-between">

              <p>Identifiant</p><p>{`Local-${data.id_local}`}</p>
            </div>
            <div className="flex justify-between">

              <p>Ville</p><p>{data.ville.libelle}</p>
            </div>
            <div className="flex justify-between">

              <p>Adresse</p><p>{data.adresse_no_rue}</p>
            </div>
            <div className="flex justify-between">

              <p>Email resp.</p><p>{data.email_responsable}</p>
            </div>
            <div className="flex justify-between">

              <p>Capacité tot.</p><p>{data.capacite_totale}</p>
            </div>
            <div className="flex justify-between">

              <p>Capacité tab.</p><p>{data.capacite_table}</p>
            </div>
            <div className="flex justify-between">

              <p>Seuil alerte</p><p>{data.seuil_alerte}</p>
            </div>
            <div className="flex justify-between">

              <p>Nb Réservation</p><p>{data.nb_reservation}</p>
            </div>
            <div className="flex justify-between">

              <p>Montant part.</p><p>{`${data.montant_participation} ${data.codeDevise}`}</p>
            </div>


            <hr />
          </div>
          <div className={'flex flex-col gap-y-8 justify-center md:justify-end pt-4 mb-4 md:flex-row md:gap-x-8'}>

            <Button onClick={handleDelete} className="bg-red-600 capitalize" variant="contained" startIcon={<DeleteForeverIcon />}>
              Supprimer
            </Button>

            <Link href={`/locaux-brunch/edit/${data.id_local}`}>
              <Button className="bg-blue-600 capitalize" variant="contained" startIcon={<EditIcon />}>
                Editer
              </Button>
            </Link>

          </div>
        </div>
      </LocalBrunchLayout>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // ...
  const res = await fetch(`${process.env.base_route}/locaux-brunch/${context?.params?.id}`)
  //    console.log(res)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}

export default Page;
