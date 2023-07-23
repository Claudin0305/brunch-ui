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
  const router = useRouter()
  console.log(data.imageDatas[0])
  const deleteEvent = (id: number) => {
    fetch(`${process.env.base_route}/events/${id}`, {
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


        router.push('/evenements')

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
    <Layout>
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

              <p>Identifiant</p><p>{`évènement-${data.id_event}`}</p>
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
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // ...
  const res = await fetch(`${process.env.base_route_get}/events/${context?.params?.id}`)
  //    console.log(res)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}

export default Page;
