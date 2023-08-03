import Layout from "@/components/home/layout";
import { GetServerSideProps } from 'next'
import Head from "next/head";
import React, { MouseEvent } from "react";
import Link from 'next/link'
import Button from "@mui/material/Button";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EventLayout from "@/components/evenements/event-layout";
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import Image from 'next/image'
import {useEffect} from "react"
import axios from 'axios';
import { getCookie } from 'cookies-next';
import Loader from "@/components/core/loader"

import EditIcon from '@mui/icons-material/Edit';
type Props = {
  data: any;
}

type option = {
  label: String;
  value: String;
}

const format_events: option[] = [
  {
    value: "PRESENTIEL",
    label: "Présentiel"
  },
  {
    value: "HYBRIDE",
    label: "Hybride"
  },
  {
    value: "DISTANCIEL",
    label: "Distanciel"
  },
]

const Page: React.FC<Props> = ({ data }) => {
  const token = getCookie('token');
  const router = useRouter()
  console.log(data.imageDatas[0])
  const deleteEvent = (id: number) => {
      axios.delete(`/api/evenements/${id}`)
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


        router.push('/evenements')

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
      text: "Supprimer ",
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
        deleteEvent(data.id_event)
      }
    })

    event.stopPropagation();

  };

  return (
    <>
    {
      token !== undefined ? <Layout>
      <Head>
        <title>Evènement | Détails</title>
      </Head>
      <EventLayout>
        <div className="bg-white px-8 py-4 mb-4 shadow-md h-[calc(100vh_-_215px)] overflow-y-scroll">

          <div className="flex flex-col gap-y-4 w-1/2 mx-auto">
            <h1 className="font-bold text-sm md:text-lg capitalize bg-slate-100 text-center col-span-2">
              Détails Evènement
            </h1>
            <div className="block mx-auto">
              <Image
              src={`${process.env.base_route_get}/events/images/${data?.imageDatas?.filter((img:any)=>img.active===true)[0]?.name}`}
              width={300}
              height={300}
              alt={'logo évènement'}
              />
            </div>
            <div dangerouslySetInnerHTML={{ __html: data.text_descriptif }}>
            </div>
            <div className="flex justify-between">

              <p>Identifiant</p><p>{`${data.eventType}'${data.date_debut.split('-')[0]}`}</p>
            </div>
            <div className="flex justify-between">

              <p>Date debut</p><p>{data.date_debut.split('T')[0]}</p>
            </div>
            <div className="flex justify-between">

              <p>Heure debut</p><p>{data.heure_debut}</p>
            </div>
            <div className="flex justify-between">

              <p>Date fin</p><p>{data.date_fin.split('T')[0]}</p>
            </div>
            <div className="flex justify-between">

              <p>Heure fin</p><p>{data.heure_fin}</p>
            </div>
            <div className="flex justify-between">

              <p>Cible participation</p><p>{data.cible_participation}</p>
            </div>
            <div className="flex justify-between">

              <p>Format évènement</p><p>{format_events.filter(f=>f.value === data.format_event)[0].label}</p>
            </div>
            <div className="flex justify-between">

              <p>Email évènement</p><p>{data.adr_email_event}</p>
            </div>
            <div className="flex justify-between">

              <p>Site web</p><p>{data.url}</p>
            </div>




            <hr />
          </div>
          <div className={'flex flex-col gap-y-8 justify-center md:justify-end pt-4 mb-4 md:flex-row md:gap-x-8'}>

            <Button onClick={handleDelete} className="bg-red-600 capitalize" variant="contained" startIcon={<DeleteForeverIcon />}>
              Supprimer
            </Button>

            <Link href={`/evenements/edit/${data.id_event}`}>
              <Button className="bg-blue-600 capitalize" variant="contained" startIcon={<EditIcon />}>
                Editer
              </Button>
            </Link>

          </div>
        </div>
      </EventLayout>
    </Layout> : <Loader/>
    }
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  // ...
const { req, res } = context;
  const cookie = getCookie("token", {req, res})

  try {
    // Fetch data from an API or perform other async operations
    const response = await axios.get(`${process.env.base_route_get}/events/${context?.params?.id}`, {
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
