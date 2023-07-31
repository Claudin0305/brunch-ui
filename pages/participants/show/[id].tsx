import Layout from "@/components/home/layout";
import { GetServerSideProps } from 'next'
import Head from "next/head";
import React, { MouseEvent } from "react";
import Link from 'next/link'
import Button from "@mui/material/Button";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ParticipantLayout from "@/components/participants/participant-layout";
import Swal from 'sweetalert2'
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router'

import EditIcon from '@mui/icons-material/Edit';
type Props = {
  data: any;
}

const Page: React.FC<Props> = ({ data }) => {
  const router = useRouter()
  const deleteParticipant = (id: number) => {
    fetch(`${process.env.base_route}/participants/${id}`, {
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


        router.push('/participants')

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
      text: "Supprimer " + data.prenom + " " + data.nom,
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
        deleteParticipant(data.id_participant)
      }
    })

    event.stopPropagation();

  };

  return (
    <Layout>
      <Head>
        <title>Participant | Details</title>
      </Head>
      <ParticipantLayout>
        <div className="bg-white px-8 py-4 mb-4 shadow-md h-[calc(100vh_-_215px)] overflow-y-scroll">

          <div className="flex flex-col gap-y-4 w-1/2 mx-auto">
            <h1 className="font-bold text-sm md:text-lg capitalize bg-slate-100 text-center col-span-2">
              Détails Participant
            </h1>
            <div className="flex justify-between">

              <p>Numéro de confirmation</p><p>{data.username}</p>
            </div>
            <div className="flex justify-between">

              <p>Prénom</p><p>{data.prenom}</p>
            </div>
            <div className="flex justify-between">

              <p>Nom</p><p>{data.nom}</p>
            </div>
            <div className="flex justify-between">

              <p>Pays</p><p>{data.Pays}</p>
            </div>
            <div className="flex justify-between">

              <p>Département</p><p>{data.ville.libelleDepartement}</p>
            </div>
            <div className="flex justify-between">

              <p>Ville</p><p>{data.ville.libelle}</p>
            </div>
            <div className="flex justify-between">

              <p>Email</p><p>{data.email}</p>
            </div>
            <div className="flex justify-between">

              <p>Téléphone</p><p>{data.tel_participant}</p>
            </div>
            <div className="flex justify-between">

              <p>Mode participation</p><p>{data.mode_participation}</p>
            </div>
            <div className="flex justify-between">

              <p>Affiliation</p><p>{data?.nomAffiliation}</p>
            </div>



            <hr />
          </div>
          <div className={'flex flex-col gap-y-8 justify-center md:justify-end pt-4 mb-4 md:flex-row md:gap-x-8'}>

            <Button onClick={handleDelete} className="bg-red-600 capitalize" variant="contained" startIcon={<DeleteForeverIcon />}>
              Supprimer
            </Button>

            <Link href={`/participants/edit/${data.id_participant}`}>
              <Button className="bg-blue-600 capitalize" variant="contained" startIcon={<EditIcon />}>
                Editer
              </Button>
            </Link>

          </div>
        </div>
      </ParticipantLayout>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // ...
const { req, res } = context;
  const cookie = getCookie("token", {req, res})

  try {
    // Fetch data from an API or perform other async operations
    const response = await axios.get(`${process.env.base_route_get}/participants/${context?.params?.id}`, {
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
