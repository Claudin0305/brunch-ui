import React, { useState, useEffect, useMemo } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Swal from 'sweetalert2'
import CircularIndeterminate from "@/components/core/circular-indeterminate";
import Error from "@/components/core/error";
import axios from 'axios';
import { useRouter } from 'next/router'
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Select from 'react-select';
import Image from "next/image"
import dynamic from "next/dynamic";


type Inputs = {
  date_debut: String;
  date_fin: String;
  heure_debut: String;
  heure_fin: String;
  format_event: String;
  text_descriptif: String;
  adr_email_event: String;
  domaine_email: String;
  cible_participation: number;
  image_event: any


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
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }));
  const [valueText, setValueText] = useState<String | null>("");
  const [errorDate, setErrorDate] = useState<boolean>(false);
  const [dateFin, setDateFin] = useState<String>("")
  const [dateDebut, setDateDebut] = useState<String>("")
  const [valueTextError, setValueTextError] = useState<boolean>(false);
  const [defaultDate, setDefaultDate] = useState<String | null>("")
  const [previewImage, setPreviewImage] = useState<String>("")
  const [currentImage, setCurrentImage] = useState<File>()
  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const router = useRouter()
  const { register, handleSubmit, watch, reset, setValue, control, formState: { errors } } = useForm<Inputs>();
  const min = 1;
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const [responseError, setResponseError] = useState<any>(null);
  useEffect(() => {

    if (data_props !== null) {
      setValue('domaine_email', data_props.domaine_email);
      setValue('adr_email_event', data_props.adr_email_event);
      setValueText(data_props.text_descriptif);
      setValue('cible_participation', data_props.cible_participation);
      const result:String | null = format_events.filter(e=> e.value === data_props.format_event)[0]
      setValue('format_event', result);
      const date_debut = data_props.date_debut.split("T")[0]
      setValue('date_debut', date_debut)
      const date_fin = data_props.date_fin.split("T")[0]
      setValue('date_fin', date_fin)
      setValue('heure_debut', data_props.heure_debut)
      setValue('heure_fin', data_props.heure_fin)

    }
  }, [])




  useEffect(() => {
    setValueTextError(valueText === "<p><br></p>" || valueText === null || valueText === "")

  }, [valueText])


  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }
    const formattedDate = `${year}-${month}-${day}`
    setDefaultDate(formattedDate);
    setDateFin(formattedDate)
    setDateDebut(formattedDate)
  }, [])



  const updateEvent = (data: FormData) => {
    axios
      .put(`${process.env.base_route}/events/${data_props.id_event}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
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

  const createEvent = (data: FormData) => {

    axios.post(`${process.env.base_route}/events`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(response => {
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
        setValue('format_event', "");
        setValueText("");
        setPreviewImage("")
      }
    }).catch(err => {
      setIsSubmit(false);
      // console.log(err)
      // if (err.response.status === 400) {
      //   setResponseError(err.response.data);
      //   // console.log(responseError)
      //   //sweal error
      // }
    })


  };
  const onSubmit: SubmitHandler<Inputs> = data => {
    // console.log(data)

    setIsSubmit(true);
    let formData = new FormData()
    formData.append("date_debut", data.date_debut)
    formData.append('date_fin', data.date_fin)
    formData.append('heure_debut', data.heure_debut)
    formData.append('heure_fin', data.heure_fin)
    formData.append('domaine_email', data.domaine_email)
    formData.append('adr_email_event', data.adr_email_event)
    formData.append('image', data.image_event[0])
    formData.append('format_event', data.format_event?.value)
    formData.append('cible_participation', data.cible_participation)
    formData.append('text_descriptif', valueText);

    if (data_props === null) {

      createEvent(formData);
    } else {
      updateEvent(formData)
    }

  };

  useEffect(() => {
    const debut = new Date(dateDebut);
    const fin = new Date(dateFin)
    setErrorDate(fin < debut)
  }, [dateDebut, dateFin])
  // console.log(previewImage)
  return (
    <div className="container">
      <h1 className="font-bold text-sm md:text-lg capitalize mb-8">
        {data_props === null ? 'Ajouter' : 'Modifier'} Evénement
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="center">
        {/* register your input into the hook by invoking the "register" function */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div className="grid col-span-1 md:col-span-2 grid-cols-1 md:grid-cols-4 gap-8">

            <div className="block">
              <TextField
                required
                autoComplete="given-name"
                fullWidth
                id="date_debut"
                label="Date debut"
                defaultValue={defaultDate}
                type="date"
                value={dateDebut}
                {...register("date_debut", { required: 'Ce champ est obligatoire!' })}
                onChange={e => {
                  setDateFin(defaultDate);
                  setDateDebut(e.target.value.trim())
                  register('date_debut').onChange(e)
                  setErrorDate(false)
                }}
              />
              {errors?.date_debut && <Error text={errors.date_debut.message} />}
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
            </div>
            <div className="block">
              <TextField
                required
                autoComplete="given-name"
                fullWidth
                id="date_fin"
                label="Date fin"
                defaultValue={defaultDate}
                type="date"
                value={dateFin}
                {...register("date_fin", { required: 'Ce champ est obligatoire' })}
                onChange={e => {
                  setDateFin(e.target.value.trim());
                  register('date_fin').onChange(e);


                  // console.log(errorDate, 'fin: '+fin.getTime(), 'debut: ' +debut.getTime())
                }}
              />
              {errors?.date_fin && <Error text={errors.date_fin.message} />}
              {responseError !== null && <Error text={responseError?.libelle} />}
              {errorDate && <Error text={'La valeur de la date de fin est incorrecte!'} />}
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
          </div>
          <div className="grid grid-cols-1 col-span-1 md:col-span-2 md:grid-cols-4 gap-8">
            <div className="flex-col flex md:-mt-4 ">
              <label
                className="mb-2"
                htmlFor={`format_event`}
              >
                {" "}
                Format événement*{" "}
              </label>
              <Controller
                name={`format_event`}
                control={control}
                rules={{
                  required: "Ce champ est obligatoire",
                }}

                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder={
                      "Choisir le format..."
                    }
                    isClearable
                    options={format_events}
                    className="z-50"
                  />
                )}
              />{" "}
              {errors?.format_event && <Error text={errors.format_event.message} />}
            </div>
            <div className="block">
              <TextField
                required
                autoComplete="given-name"
                fullWidth
                id="cible_participation"
                label="Cible participation"
                type="number"
                inputProps={{ min }}
                {...register("cible_participation", {
                  required: true, min: {
                    value: 1,
                    message: 'La valeur doit être plus grande que 1'
                  }
                })}
              />

              {responseError !== null && <Error text={responseError?.libelle} />}
              {errors?.cible_participation && <Error text={errors.cible_participation.message} />}
            </div>
            <div className="block">
              <TextField
                required
                autoComplete="given-name"
                fullWidth
                id="adr_email_event"
                label="Email événement"
                type="email"
                {...register("adr_email_event", {
                  required: true, pattern: {
                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    message: "L'email est invalide!"
                  }
                })}
              />

              {errors?.adr_email_event && <Error text={errors.adr_email_event.message} />}
            </div>
            <div className="block">


              <TextField
                required
                autoComplete="given-name"
                fullWidth
                id="domaine_email"
                label="Domaine email"
                type="url"

                {...register("domaine_email", { required: true })}
              />

              {responseError !== null && <Error text={responseError?.libelle} />}
            </div>
          </div>
          <div className="row-span-4">
            <div className="block">
              {previewImage !== "" && <div className="mb-8 text-center">
                <div className="flex justify-center item-center">
                  <Image
                src={previewImage}
                width={300}
                height={300}

                />
                </div>
                <Button
                  variant="outlined"
                  color="error"
                  className="hover:bg-red-600 hover:text-white mt-8"
                  onClick={e => {
                    setValue('image_event', null);
                    setPreviewImage("");
                  }}
                >
                  Effacer
                </Button>
              </div>}
              <TextField
                required
                autoComplete="given-name"
                fullWidth
                id="image_event"
                label="Image événement"
                type="file"
                inputProps={{ accept: "image/*" }}

                {...register("image_event", { required: "Ce champ est obligatoire!" })}
                onChange={e => {
                  setCurrentImage(e.target.files?.[0]);
                  setPreviewImage(URL?.createObjectURL(e.target?.files?.[0]));
                  register("image_event").onChange(e)
                }}
              />
              {errors?.image_event && <Error text={errors.image_event.message} />}
              {responseError !== null && <Error text={responseError?.libelle} />}
            </div>
          </div>

          <div className="row-span-5">
             <ReactQuill
              modules={modules}
              theme="snow"
              placeholder="Text descriptif...*"
              onChange={setValueText}
              value={valueText}
            />

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
            disabled={isSubmit || errorDate || valueTextError}
            type="submit"
            className={`${isSubmit || errorDate || valueTextError ? 'bg-blue-300' : 'bg-blue-600 '} capitalize text-white flex items-center justify-center gap-x-2`}
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
