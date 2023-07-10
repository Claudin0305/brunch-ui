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
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>chargement ...</p>,
});

type Inputs = {
  date_debut: string;
  date_fin: string;
  heure_debut: string;
  heure_fin: string;
  format_event: string | any;
  event_type: string | any;
  text_descriptif: string;
  adr_email_event: string;
  url: string;
  cible_participation: any;
  image_event: any


};
type Props = {
  data_props: any | null;
}
type option = {
  label: string;
  value: string;
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
const type_events: option[] = [
  {
    value: "AUTRE",
    label: "Autre"
  },
  {
    value: "ASSEMBLEE_GENERALE",
    label: "Assemblée Générale"
  },
  {
    value: "BRUNCH",
    label: "Brunch"
  },
  {
    value: "CONFERENCE",
    label: "Conférence"
  },
]

const AddEvent: React.FC<Props> = ({ data_props }) => {
  // const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }));
  const [valueText, setValueText] = useState<string | null>("");
  const [errorDate, setErrorDate] = useState<boolean>(false);
  const [dateFin, setDateFin] = useState<string | any>("")
  const [dateDebut, setDateDebut] = useState<string | any>("")
  const [valueTextError, setValueTextError] = useState<boolean>(false);
  const [defaultDate, setDefaultDate] = useState<string | null>("")
  const [previewImage, setPreviewImage] = useState<string | any>("")
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
      setValue('url', data_props.url);
      setValue('adr_email_event', data_props.adr_email_event);
      setValueText(data_props.text_descriptif);
      setValue('text_descriptif', data_props.text_descriptif)
      setValue('cible_participation', data_props.cible_participation);
      const result: string | any = format_events.filter(e => e.value === data_props.format_event)[0]
      setValue('format_event', result);
      const resultType: string | any = type_events.filter(e => e.value === data_props.eventType)[0]
      setValue('event_type', resultType);
      const date_debut = data_props.date_debut.split("T")[0]
      setValue('date_debut', date_debut)
      const date_fin = data_props.date_fin.split("T")[0]
      setValue('date_fin', date_fin)
      setValue('heure_debut', data_props.heure_debut)
      setValue('heure_fin', data_props.heure_fin)
      const image = data_props.eventImages?.filter((img: any) => img.active === true)?.[0]
      setPreviewImage(`${process.env.base_route}/events/images/${image?.name}`)
      setValue('image_event', image.name)

    }
  }, [])




  useEffect(() => {
    setValueTextError(valueText === "<p><br></p>" || valueText === null || valueText === "")

  }, [valueText])


  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    let month: string | number = today.getMonth() + 1;
    let day: string | number = today.getDate();
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
      .put(`${process.env.base_route}/events`, data, {
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
        console.log(err)
        // if (err.response.status === 400) {
        //   setResponseError(err.response.data);
        // }
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
  //ReactQuill
  //  const handleQuillChange = (content:any, delta:any, source:any, editor:any) => {
  //   //  setValueText(content)
  //    setValue('text_descriptif', content);
  // };
  const onSubmit: SubmitHandler<Inputs> = data => {
    // console.log(data)

    setIsSubmit(true);
    let formData = new FormData()
    formData.append("date_debut", data.date_debut)
    formData.append('date_fin', data.date_fin)
    formData.append('heure_debut', data.heure_debut)
    formData.append('heure_fin', data.heure_fin)
    formData.append('url', data.url)
    formData.append('adr_email_event', data.adr_email_event)
    formData.append('format_event', data.format_event?.value)
    formData.append('eventType', data.event_type?.value)
    formData.append('cible_participation', data.cible_participation)
    formData.append('text_descriptif', data.text_descriptif);
    setValueText(data.text_descriptif)

    if (data_props === null) {
      formData.append('image', data.image_event[0])
      createEvent(formData);
    } else {
      // if(data.image_event)
      formData.append('id_event', data_props.id_event)
      if (typeof (data.image_event) !== 'string') {
        // console.log(data.image_event);
        formData.append('image', data.image_event[0])
        formData.append('image_change', '1');
      } else {
        formData.append('image_change', '0');

      }
      updateEvent(formData)
      console.log(formData)
      // console.log(typeof(data.image_event));

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
          {data_props === null ? 'Ajouter' : 'Modifier'} Evènement
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
                  size="small"
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
                  size="small"
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
                  size="small"
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
                  size="small"
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
              <div className="flex-col flex md:-mt-4 ">
                <label
                  className="mb-2"
                  htmlFor={`event_type`}
                >
                  {" "}
                  Type événement*{" "}
                </label>
                <Controller
                  name={`event_type`}
                  control={control}
                  rules={{
                    required: "Ce champ est obligatoire",
                  }}

                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder={
                        "Choisir le type..."
                      }
                      isClearable
                      options={type_events}
                      className="z-50"
                    />
                  )}
                />{" "}
                {errors?.format_event && <Error text={errors.event_type?.message} />}
              </div>

              <div className="block md:mt-4">
                <TextField
                  required
                  autoComplete="given-name"
                  fullWidth
                  id="cible_participation"
                  label="Cible participation"
                  type="number"
                  size="small"
                  inputProps={{ min }}
                  {...register("cible_participation", {
                    required: true, min: {
                      value: 1,
                      message: 'La valeur doit être plus grande que 1'
                    }
                  })}
                />

                {errors?.cible_participation && <Error text={errors.cible_participation.message} />}
              </div>
              <div className="block md:mt-4">
                <TextField
                  required
                  autoComplete="given-name"
                  fullWidth
                  id="adr_email_event"
                  label="Email événement"
                  type="email"
                  size="small"
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
                  id="url"
                  size="small"
                  label="Domaine email"
                  type="url"

                  {...register("url", { required: true })}
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
                      alt={""}

                    />
                  </div>
                  <Button
                    variant="outlined"
                    color="error"
                    className="hover:bg-red-600 hover:text-white mt-8"
                    onClick={e => {
                      if (data_props === null) {
                        setValue('image_event', null);
                        setPreviewImage("");
                      } else {
                        const image = data_props.eventImages?.filter((img: any) => img.active === true)?.[0]
                        setPreviewImage(`${process.env.base_route}/events/images/${image?.name}`)
                        setValue('image_event', image.name)
                      }
                    }}
                  >
                    Effacer
                  </Button>
                </div>}
                <div className="-mt-4">
                  <label
                    htmlFor="image_event"
                    className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                  >Image Evènement{data_props === null && "*"} </label
                  >
                  <input
                    className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:mr-1 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                    id="image_event"
                    type="file"
                    accept="image/png, image/jpeg"
                    required={data_props === null}
                    {...register("image_event", {
                      required: {
                        value: data_props === null,
                        message: "Ce champ est obligatoire!"
                      }
                    })}
                    onChange={e => {
                      // setCurrentImage(e.target.files?.[0]);
                      if (e !== undefined && e !== null) {
                        if (e.target !== undefined && e.target !== null) {
                          if (e.target.files !== undefined && e.target.files !== null) {
                            setPreviewImage(URL?.createObjectURL(e.target.files.[0]));
                          }
                        }
                      }
                      register("image_event").onChange(e)
                    }}
                  />
                </div>
              </div>

              {errors?.image_event && <Error text={errors.image_event.message} />}
              {responseError !== null && <Error text={responseError?.libelle} />}
            </div>
          </div>

          <div className="row-span-5">
            <QuillNoSSRWrapper
              modules={modules}
              theme="snow"
              placeholder="Text descriptif...*"
              onChange={e => {
                // console.log(e.targe)
                if (e !== null) {
                  setValueText(e)
                }
                setValue('text_descriptif', e);
              }}
              value={valueText}
            />

            {responseError !== null && <Error text={responseError?.libelle} />}

            {errors?.text_descriptif && <Error text={errors.text_descriptif.message} />}
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
          disabled={isSubmit || errorDate}
          type="submit"
          className={`${isSubmit || errorDate ? 'bg-blue-300' : 'bg-blue-600 '} capitalize text-white flex items-center justify-center gap-x-2`}
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
