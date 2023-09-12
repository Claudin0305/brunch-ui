import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
// import { getCookie } from 'cookies-next';

export default async function handler( req: NextApiRequest,
  res: NextApiResponse) {
    // const cookie = getCookie('token', {req, res})
    const formData = new FormData();
    formData.append("id_participant", req.body.id_participant);
        formData.append('id_event', req.body.id_event)

if(req.method === 'POST'){
    axios
      .post(`${process.env.base_route_get}/participants/send-message`, formData)
      .then((response) => {
        if (response.status === 201) {
          console.log(response);

          return res
            .status(201)
            .json({ message: "succes!", data: response.data });
        }
      })
      .catch((err) => {
        console.log(err);
        if (err?.response?.status === 400) {
        }
        return res.status(400).json({ error: "bad request", err: err });
      });
}


}
