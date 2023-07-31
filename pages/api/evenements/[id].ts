import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getCookie } from 'cookies-next';

export default async function handler( req: NextApiRequest,
  res: NextApiResponse) {
    const cookie = getCookie('token', {req, res})
    const {id} = req.query
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
     formData.append('image_change', req.body.image_change);
     if(req.body.image_change == '1'){
      formData.append('image', req.body.image);
     }
    if(req.method === 'PUT'){
      axios
          .put(`${process.env.base_route}/events/${id}`, req.formData, {
    headers: {
          withCredentials: true,
          Cookie: cookie,
          "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundary7MAn6ue492Pmade",
        }
  })
          .then((response) => {
            if (response.status === 200) {
              console.log(response)

          return res.status(200).json({message:"succes!", data: response.data})
            }

          })
          .catch((err) => {
            console.log(err)
            if (err?.response?.status === 400) {
              // setResponseError(err.response.data);
            }
            return res.status(400).json({error:"bad request", err: err})
            // setIsSubmit(false);
          });
    }
if(req.method === 'DELETE'){
axios
          .delete(`${process.env.base_route}/events/${id}`, {
    headers: {
          withCredentials: true,
          Cookie: cookie
        }
  })
          .then((response) => {
            if (response.status === 200) {
              console.log(response)

          return res.status(200).json({message:"succes!"})
            }

          })
          .catch((err) => {
            console.log(err)

            return res.status(400).json({error:"bad request", err: err})
          });
}

}
