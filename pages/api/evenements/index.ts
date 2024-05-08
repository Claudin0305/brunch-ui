"use server"
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse, NextRequest } from "next/server";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";


// export async function POST(request: NextRequest) {
//   // console.log(await request.formData());
//   try {
//     const data: FormData = await request.formData();
//     // const response = await axios.post(
//     //   `${process.env.BASE_ROUTE}/public/header-images/upload/image`,
//     //   data,
//     //  {headers:{
//     //    "Content-Type": "multipart/form-data",
//     //   }}
//     // );
//     console.log(data);
//     console.log("*******************************************************************");
//     // if (response.status === 201) {
//       // revalidatePath("/admin/headers");
//       return NextResponse.json({ data: "test" }, { status: 400 });
//     // }
//   } catch (error: any) {
//     if (error.response.status === 400) {
//       return NextResponse.json({ data: error.response.data }, { status: 400 });
//     } else {
//       return NextResponse.json(
//         { message: "Erreur serveur interne", data: error.response.data },
//         { status: 500 }
//       );
//     }
//   }
// }
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookie = getCookie("token", { req, res });

  console.log("===========================================");
  // const data: FormData = await req.formData();
  // console.log(req.body)
  // const t = new FormData(req.body);
  // console.log(data);
  // const {image, date_debut, date_fin, heure_debut, heure_fin, url, adr_email_event, format_event, text_descriptif, event_type} = req.body
  console.log( req.body);
  // console.log("===========================================");
  let formData = new FormData();
  // formData = await req.formData();
   formData.append("date_debut", req.body.date_debut)
  formData.append('date_fin', req.body.date_fin)
  formData.append('heure_debut', req.body.heure_debut)
  formData.append('heure_fin', req.body.heure_fin)
  formData.append('url', req.body.url)
  formData.append('adr_email_event', req.body.adr_email_event)
  formData.append('format_event', req.body.format_event)
  formData.append('eventType', req.body.event_type)
  formData.append('cible_participation', req.body.cible_participation)
  formData.append('text_descriptif', req.body.text_descriptif);
  formData.append('file', req.body.file)
  // console.log(formData)
  // const data = {
  //   date_debut: req.body.date_debut,
  // date_fin: req.body.date_fin,
  // heure_debut: req.body.heure_debut,
  // heure_fin: req.body.heure_fin,
  // url: req.body.url,
  // adr_email_event: req.body.adr_email_event,
  // format_event: req.body.format_event,
  // eventType: req.body.event_type,
  // cible_participation: req.body.cible_participation,
  // text_descriptif: req.body.text_descriptif,
  // file: req.body.image_event,
  // }

  if (req.method === "POST") {

// fetch(`${process.env.base_route_get}/events/test-upload`,
//     {
//         body: formData,
//         method: "post",
//            headers: {
//         "Content-Type": "multipart/form-data",

//     },
//     }).then(response=>{
//       console.log(response)
//     });
// console.log(formData)

    // axios.post(`${process.env.base_route_get}/events/test-upload`, req.body, { headers: {
    //     "Content-Type": "multipart/form-data",

    // },}).then(response=>{
    //   console.log("Test")
    // })
    axios
      .post(`${process.env.base_route_get}/events`, formData, {
        headers: {
          withCredentials: true,
          Cookie: cookie,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 201) {
          // console.log(response);

          return res
            .status(201)
            .json({ message: "succes!", data: response.data });
        }
      })
      .catch((err) => {
        console.log(err)
        if (err?.response?.status === 400) {
        }
        return res.status(400).json({ error: "bad request", err: err });
      });
      // return res
      //       .status(400)
      //       .json({ message: "succes!", data: 700 });

  }

  // if (req.method !== 'POST') {
  //   return res.status(405).json({ error: 'Method Not Allowed' });
  // }

  // try {
  //   const dataToSend = { message: 'Hello, server!' };
  //   const response = await axios.post('https://example.com/api/endpoint', dataToSend);

  //   // Vous pouvez éventuellement traiter la réponse du serveur distant avant de la renvoyer
  //   const responseData = response.data;
  //   res.status(200).json(responseData);
  // } catch (error) {
  //   console.error('Error:', error);
  //   res.status(500).json({ error: 'Internal Server Error' });
  // }
}
