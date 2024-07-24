import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { getCookie } from "cookies-next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookie = getCookie("token", { req, res });

  const { id } = req.query;

  const formData = new FormData();
  formData.append("id_event", req.body.id_event);
  formData.append("prenom", req.body.prenom);
  formData.append("nom", req.body.nom);
  formData.append("email", req.body.email);
  formData.append("telParticipant", req.body.tel_participant);
  if (req.body.affiliation !== undefined) {
    formData.append("affiliation", req.body.affiliation);
  }
  formData.append("abonnement_newsletter", "" + req.body.abonnement_newsletter);
  formData.append("authorisationListe", "" + req.body.authorisation_liste);
  formData.append("id_ville", req.body.id_ville);
  formData.append("modeParticipation", req.body.mode_participation);
  formData.append("id_civilite", req.body.id_civilite);
  formData.append("id_local", req.body.id_local);
  formData.append("id_affiliation", req.body.id_affiliation);
  formData.append("id_tranche_age", req.body.id_tranche_age);
  if (req.body.mode_paiement) {
    formData.append("modePaiement", req.body.mode_paiement);
  }

  if (req.method === "DELETE") {
    axios
      .delete(`${process.env.base_route_get}/participants/${id}`, {
        headers: {
          withCredentials: true,
          Cookie: cookie,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response);

          return res.status(200).json({ message: "succes!" });
        }
      })
      .catch((err) => {
        console.log(err);

        return res.status(400).json({ error: "bad request", err: err });
      });
  }
  if (req.method === "PUT") {
    axios
      .put(`${process.env.base_route_get}/participants/${id}`, formData)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);

          return res
            .status(200)
            .json({ message: "succes!", data: response.data });
        }
      })
      .catch((err) => {
        console.log(err);
        if (err?.response?.status === 400) {
          // setResponseError(err.response.data);
        }
        return res.status(400).json({ error: "bad request", err: err });
        // setIsSubmit(false);
      });
  }
}
