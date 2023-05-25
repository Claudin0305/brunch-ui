import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Swal from 'sweetalert2'
import CircularIndeterminate from "@/components/core/circular-indeterminate";
import Error from "@/components/core/error";
import axios from 'axios';
import { useRouter } from 'next/router'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


type Inputs = {
  libelle: string;
  date_debut: String;
  date_fin: String;
  heure_debut: String;
  heure_fin: String;
  format_event: String;
  text_descriptif: String;
  adr_email_event: String;
  domaine_email: String;
  cible_participation: number;
  logo_image_event: any


};
type Props = {
  data_props: any | null;
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

const AddEvent: React.FC<Props> = ({ data_props }) => {
  const  modules  = {
    toolbar: [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script:  "sub" }, { script:  "super" }],
        ["blockquote", "code-block"],
        [{ list:  "ordered" }, { list:  "bullet" }],
        [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
        ["link", "image", "video"],
        ["clean"],
    ],
};

  const router = useRouter()
  const { register, handleSubmit, watch, reset, setValue, control, formState: { errors } } = useForm<Inputs>();
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const [responseError, setResponseError] = useState<any>(null);
  useEffect(() => {

    if (data_props !== null) {
      setValue('libelle', data_props.libelle);

    }
  }, [])



  const updateEvent = (data: Inputs) => {
    axios
      .put(`${process.env.base_route}/events/${data_props.id_event}`, data)
      .then((response) => {
        if (response.status === 200) {

          setIsSubmit(false);
          Swal.fire({
            // position: 'top-end',
            icon: 'success',
            title: 'Modification effectuée!',

            confirmButtonColor: "#2563eb",
            confirmButtonText: "Fermer",
          })
          router.push('/evenements')
          reset();
        }

      })
      .catch((err) => {
        if (err.response.status === 400) {
          setResponseError(err.response.data);
        }
        setIsSubmit(false);
      });


  };
  const createEvent = (data: Inputs) => {

    axios.post(`${process.env.base_route}/events`, data).then(response => {
      console.log(response);
      if (response.status === 201) {
        Swal.fire({
          // position: 'top-end',
          icon: 'success',
          title: 'Enregistrement effectué!',
          // showConfirmButton: false,
          // timer: 1500
          // buttonColor:"#000000",
          // buttons:[""]
          confirmButtonColor: "#2563eb",
          confirmButtonText: "Fermer",
        })
        setIsSubmit(false);
        reset();
      }
    }).catch(err => {
      setIsSubmit(false);
      if (err.response.status === 400) {
        setResponseError(err.response.data);
        // console.log(responseError)
        //sweal error
      }
    })


  };
  const onSubmit: SubmitHandler<Inputs> = data => {
    // console.log(data)

    setIsSubmit(true);
    if (data_props === null) {
      createEvent(data);
    } else {
      updateEvent(data)
    }

  };

  return (
    <div className="container">
      <h1 className="font-bold text-sm md:text-lg capitalize mb-8">
        {data_props === null ? 'Ajouter' : 'Modifier'} Evénement
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="center">
        {/* register your input into the hook by invoking the "register" function */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* <div className="block">

          <TextField
            required
            autoComplete="given-name"
            fullWidth
            id="libelle"
            label="Libelle"
            {...register("libelle", { required: true })}
          />
          {responseError !== null && <Error text={responseError?.libelle}/>}
          </div> */}
          <div className="block">
            <TextField
              required
              autoComplete="given-name"
              fullWidth
              id="date_debut"
              label="Date debut"
              type="date"
              defaultValue={"2022-04-17"}
              {...register("date_debut", { required: true })}
            />

            {responseError !== null && <Error text={responseError?.libelle} />}
          </div>
          <div className="block">
            <TextField
              required
              autoComplete="given-name"
              fullWidth
              id="heure_debut"
              label="Heure debut"
              type="time"
              defaultValue={"00:00"}
              {...register("heure_debut", { required: true })}
            />

            {responseError !== null && <Error text={responseError?.libelle} />}
          </div>
          <div className="block">
            <TextField
              required
              autoComplete="given-name"
              fullWidth
              id="date_fin"
              label="Date fin"
              type="date"
              defaultValue={"2022-04-17"}
              {...register("date_fin", { required: true })}
            />

            {responseError !== null && <Error text={responseError?.libelle} />}
          </div>
          <div className="block">
            <TextField
              required
              autoComplete="given-name"
              fullWidth
              id="heure_fin"
              label="Heure fin"
              type="time"
              defaultValue={"00:00"}
              {...register("heure_fin", { required: true })}
            />

            {responseError !== null && <Error text={responseError?.libelle} />}
          </div>
          <div className="block col-span-2">
            <ReactQuill modules={modules} theme="snow" placeholder="Content goes here..." />

            {responseError !== null && <Error text={responseError?.libelle} />}
          </div>




        </div>
        <div className="flex justify-end flex-col mt-8 md:flex-row gap-8 mb-8">
          <Button
            type="reset"
            className="text-blue-600 border-blue-600 capitalize"
            variant="outlined"
          >
            Reinitialiser
          </Button>

          <Button
            disabled={isSubmit}
            type="submit"
            className="bg-blue-600 capitalize text-white flex items-center justify-center gap-x-2"
            variant="contained"
          >
            {isSubmit && <CircularIndeterminate />} <span>{data_props === null ? 'Ajouter' : 'Modifier'}</span>
          </Button>
        </div>

      </form>
    </div>
  );
};

export default AddEvent;
