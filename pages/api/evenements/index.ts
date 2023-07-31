import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getCookie } from 'cookies-next';

export default async function handler( req: NextApiRequest,
  res: NextApiResponse) {
    const cookie = getCookie('token', {req, res})

    console.log("===========================================")
    console.log(req.body)
    console.log("===========================================")
    let formData = new FormData();
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
    formData.append('image', req.body.image_event)

if(req.method === 'POST'){
    axios
          .post(`${process.env.base_route}/events`, formData, {
    headers: {
          withCredentials: true,
          Cookie: cookie,
          "Content-Type": "multipart/form-data",
        }
  })
          .then((response) => {
            if (response.status === 201) {
              console.log(response)

          return res.status(201).json({message:"succes!", data: response.data})
            }

          })
          .catch((err) => {
            console.log(err)
            if (err?.response?.status === 400) {
            }
            return res.status(400).json({error:"bad request", err: err})
          });
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
