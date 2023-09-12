import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getCookie } from 'cookies-next';

export default async function handler( req: NextApiRequest,
  res: NextApiResponse) {
    const cookie = getCookie('token', {req, res})
    const formData = new FormData();
    formData.append('libelleTexte', req.body.libelle_texte);
        formData.append('messageType', req.body.message_type)
        formData.append('subject', req.body.subject)

if(req.method === 'POST'){
    axios
          .post(`${process.env.base_route_get}/messages`, formData, {
    headers: {
          withCredentials: true,
          Cookie: cookie,
          "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundary7MAn6uwusjajaB",
          //  "Content-Type": 'application/x-www-form-urlencoded'
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


}
