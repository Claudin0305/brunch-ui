import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getCookie } from 'cookies-next';

export default async function handler( req: NextApiRequest,
  res: NextApiResponse) {
    const cookie = getCookie('token', {req, res})

    const {id} = req.query

    let formData = new FormData()
    formData.append('id_devise', req.body.id_devise)
    formData.append('libelle', req.body.libelle)
    formData.append('id_ville', req.body.id_ville)
    formData.append('id_event', req.body.id_event)
    formData.append('capacite_totale', ""+req.body.capacite_totale)
    formData.append('capacite_table', ""+req.body.capacite_table)
    formData.append('montant_participation', ""+req.body.montant_participation)
    formData.append('email_responsable', req.body.email_responsable)
    formData.append('seuil_alerte', ""+req.body.seuil_alerte)
    formData.append('adresse_no_rue', req.body.adresse_no_rue)
    formData.append('nb_reservation', req.body.nb_reservation)
    if(req.method === 'PUT'){
      axios
          .put(`${process.env.base_route}/locaux/${id}`, formData, {
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
          .delete(`${process.env.base_route}/locaux/${id}`, {
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
