import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getCookie } from 'cookies-next';

export default async function handler( req: NextApiRequest,
  res: NextApiResponse) {
    const cookie = getCookie('token', {req, res})

        const formData = new FormData();
        formData.append("libelle", req.body.libelle);
        formData.append("id_departement", req.body.id_departement);

if(req.method === 'POST'){
    axios
          .post(`${process.env.base_route_get}/villes`, formData, {
    headers: {
          withCredentials: true,
          Cookie: cookie
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
