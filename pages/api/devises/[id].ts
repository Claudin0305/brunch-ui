import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getCookie } from 'cookies-next';

export default async function handler( req: NextApiRequest,
  res: NextApiResponse) {
    const cookie = getCookie('token', {req, res})

    const {id} = req.query
      const formData = new FormData();
      formData.append("devise", req.body.devise);
      formData.append("code_devise", req.body.code_devise);
    if(req.method === 'PUT'){
      axios
          .put(`${process.env.base_route_get}/devises/${id}`, req.body, {
    headers: {
          withCredentials: true,
          Cookie: cookie
        }
  })
          .then((response) => {
            if (response.status === 200) {
              console.log(response)

          return res.status(200).json({message:"succes!", data: response.data})
            }

          })
          .catch((err) => {
            // console.log(err)
            if (err?.response?.status === 400) {
              // setResponseError(err.response.data);
              console.log(err?.response?.data)
              return res.status(400).json({data: err?.response?.data})
            }
            return res.status(400).json({err})
            // setIsSubmit(false);
          });
    }
if(req.method === 'DELETE'){
axios
          .delete(`${process.env.base_route_get}/devises/${id}`, {
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
