import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Checkbox from '@mui/material/Checkbox';
import Button from "@mui/material/Button";
import Swal from 'sweetalert2'
import { FormControlLabel } from '@mui/material';
import CircularIndeterminate from "@/components/core/circular-indeterminate";
import Error from "@/components/core/error";
import axios from 'axios';
import { useRouter } from 'next/router'
import Select from 'react-select';
import FormStepper from "./form-stepper";

import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';


type Inputs = {
  email: string;
  email_confirmation: string;
  tel_participant: string;
  nom: string;
  prenom: string;
  affiliation: string;
  mode_participation: string;
  authorisation_liste: string;
  abonnement_newsletter: string;
  id_local: string | null;
  id_ville: string | null;
  id_civilite: string | null;
  id_event: string | null;
  id_tranche_age: string | null;
  id_pays: string | null;
  id_departement: string | null;
};
type Props = {
  data_props: any | null;
  pays: any | null;
  tranche_ages: any | null;
  civilites: any | null;
  event: any | null;
  locaux: any | null;
  participants: any | null;
}
type option = {
  label: string;
  value: string | number | undefined;
  id_ville?: string | number | null;
  data?: any | null
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
const AddInscription: React.FC<Props> = ({ data_props, pays, tranche_ages, civilites, event, locaux, participants }) => {
  const { register, handleSubmit, watch, reset, setValue, getValues, control, formState: { errors } } = useForm<Inputs>();

  const router = useRouter()
  const min = 1;
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [optionsCivilite, setOptionsCivilite] = useState<option[] | null>(null);
  const [optionsVille, setOptionsVille] = useState<option[] | null>(null);
  const [optionsDepartement, setOptionsDepartement] = useState<option[] | null>(null);
  const [optionsPays, setOptionsPays] = useState<option[] | null>(null);
  const [optionsLocal, setOptionsLocal] = useState<option[] | null>(null);
  const [optionsTrancheAge, setOptionsTrancheAge] = useState<option[] | null>(null);
  const [capaciteTable, setCapaciteTable] = useState<number>(10)
  const [selectedVille, setSelectedVille] = useState<option | null>(null);
  const [selectedMode, setSelectedMode] = useState<option | null>(null);
  const [selectedPays, setSelectedPays] = useState<option | null>(null);
  const [selectedDepartement, setSelectedDepartement] = useState<option | null>(null);
  const [selectCivilite, setSelectCivilite] = useState<option | null>(null);
  const [selectTrangeAge, setSelectTrangeAge] = useState<option | null>(null);
  const [selectLocal, setSelectLocal] = useState<option | null>(null);
  const [formatEventOptions, setFormatEventOptions] = useState<option[] | null>(null)
  const [errorEmail, setErrorEmail] = useState<boolean>(false);
  const [existEmail, setExistEmail] = useState<boolean>(false);
  const [identiqueEmail, setIdentiqueEmail] = useState<boolean>(true);
  const [email, setEmail] = useState<String | null>(null)

  const [responseError, setResponseError] = useState<any>(null);
  useEffect(() => {

    if (data_props !== null) {
      // setValue('email_responsable', data_props.email_responsable);
      // setValue('capacite_totale', data_props.capacite_totale);
      // setValue('capacite_table', data_props.capacite_table);
      // setValue('adresse_no_rue', data_props.adresse_no_rue);
      // setValue('montant_participation', data_props.montant_participation);
      // setValue('seuil_alerte', data_props.seuil_alerte);
      // const ville = optionsVille?.filter(v=> v.id_ville === data_props.id_ville)?.[0];
      // setValue('id_ville', ville);
      // const devise = optionsDevise?.filter(v=> v.id_devise === data_props.id_devise)?.[0];
      // setValue('id_ville', devise);
      // const civilite = optionsCivilite?.filter(v=> v.id_civilite === data_props.id_civilite)?.[0];
      // setValue('id_civilite', civilite);

    }
  }, [])

  useEffect(() => {
    const tableOptions: option[] = [];
    tranche_ages?.sort((a, b) => {
      let fa = a.libelle,
        fb = b.libelle;

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
    tranche_ages?.forEach(p => {
      tableOptions.push({
        label: p.libelle,
        value: p.id_tranche_age
      })
    })

    setOptionsTrancheAge(tableOptions);
  }, []);
  useEffect(() => {
    const tableOptions: option[] = [];

    locaux?.forEach(e => {
      tableOptions.push({
        label: `Local-${e.id_local}`,
        value: e.id_local,
        id_ville: e.idVille,
        data: e
      })
    })


    tableOptions?.sort((a, b) => {
      let fa = a.label,
        fb = b.label;

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
    if (selectedVille !== null) {
      const result = tableOptions?.filter(o => o.id_ville === selectedVille?.value)
      setOptionsLocal(result);
    } else {
      setOptionsLocal([])
    }
  }, [selectedVille]);
  useEffect(() => {
    const tableOptions: option[] = [],
          tablePays: option[] = [],
          tableDepartements: option[] = [],
          tableVilles: option[] = [];
    pays?.forEach(p=>{
      tablePays.push({
        label:p.libelle,
        value:p.id_pays,
        data:p.departements
      })
    })
    // pays?.forEach(p => {
    //   p?.departements?.forEach(d => {
    //     d?.villes?.forEach(v => {
    //       tableOptions.push(
    //         {
    //           label: `${v.libelle} (${d.libelle}, ${p.libelle})`,
    //           value: v.id_ville
    //         }
    //       )
    //     })
    //   })
    // })
    // tableOptions?.sort((a, b) => {
    //   let fa = a.label,
    //     fb = b.label;

    //   if (fa < fb) {
    //     return -1;
    //   }
    //   if (fa > fb) {
    //     return 1;
    //   }
    //   return 0;
    // });

    tablePays?.sort((a, b)=>{
      let fa = a.label,
        fb = b.label;

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    })

    setOptionsPays(tablePays);


    // setOptionsVille(tableOptions);
  }, []);

  // console.log(participants)

  useEffect(() => {
    if (event !== null) {
      //do something
      if (event.format_event === 'HYBRIDE') {
        const tableOptions: option[] = [{
          value: "PRESENTIEL",
          label: "Présentiel"
        },
        {
          value: "DISTANCIEL",
          label: "Distanciel"
        },];
        setFormatEventOptions(tableOptions)
      } else {
        const result = format_events.filter(f => f.value === event.format_event);
        setFormatEventOptions(result)
      }
    }
  }, [event])
const sorter = (table:option[])=>{
  table?.sort((a, b) => {
    let fa = a.label,
      fb = b.label;

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });
  return table;
}
  useEffect(() => {
    const tableOptions: option[] = [];
    civilites?.sort((a, b) => {
      let fa = a.libelle,
        fb = b.libelle;

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
    civilites?.forEach(e => {
      tableOptions.push({
        label: e.libelle,
        value: e.id_civilite
      })
    })

    setOptionsCivilite(tableOptions);
  }, [])

  const updateInscription = (data: Inputs | FormData) => {
    axios
      .put(`${process.env.base_route}/participants/${data_props.id_participant}`, data)
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
          // router.push('/locaux-brunch')
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
  const createInscription = (data: Inputs | FormData) => {

    axios.post(`${process.env.base_route}/participants`, data).then(response => {
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
        setValue('id_event', "");
        setValue('id_tranche_age', "");
        setValue('id_ville', "");
        setValue('id_local', "");
        setValue('id_civilite', "");

        setValue("abonnement_newsletter", "0")
        setValue("authorisation_liste", "0")

        setSelectedVille(null)
        setSelectedMode(null)
      }
    }).catch(err => {
      setIsSubmit(false);
      console.log(err)
      if (err.response.status === 400) {
        setResponseError(err.response.data);
        // console.log(responseError)
        //sweal error
      }
    })


  };


  const onSubmit: SubmitHandler<Inputs> = data => {
    let formData = new FormData()
    formData.append("id_event", event.id_event)
    formData.append("prenom", data.prenom)
    formData.append("nom", data.nom)
    formData.append("email", data.email)
    formData.append("tel_participant", data.tel_participant)
    if (data.affiliation !== undefined) {

      formData.append("affiliation", data.affiliation)
    }
    formData.append("abonnement_newsletter", data.abonnement_newsletter)
    formData.append("authorisationListe", data.authorisation_liste)
    formData.append("id_ville", selectedVille?.value)
    formData.append("mode_participation", selectedMode?.value)
    formData.append("id_civilite", data.id_civilite?.value)
    formData.append("id_tranche_age", data.id_tranche_age?.value)
    if (data.id_local.value !== undefined) {
      formData.append("id_local", data.id_local?.value)
    } else {
      formData.append("id_local", 0)

    }


    setIsSubmit(true);
    if (data_props === null) {
      createInscription(formData);
    } else {
      updateInscription(formData)
    }

  };
  console.log(errors)
  const steps = [
    {
      label: 'Informations personnelles',
      description: <div className="flex flex-col md:grid md:grid-cols-3 gap-8">
        <div className="flex-col flex md:-mt-4 z-30">
          <label
            className="mb-2"
            htmlFor={`id_civilite`}
          >
            {" "}
            Civilité*{" "}
          </label>
          <Controller
            name={`id_civilite`}
            control={control}
            rules={{
              required: "Ce champ est obligatoire",
            }}

            render={({ field }) => (
              <Select
                {...field}
                placeholder={
                  "Choisir civilité..."
                }
                isClearable
                options={optionsCivilite}
              />
            )}
          />{" "}
          {errors?.id_civilite && <Error text={errors.id_civilite.message} />}
        </div>
        <div className="block">

          <TextField
            required
            autoComplete="given-name"
            fullWidth
            id="nom"
            size="small"
            type="text"
            label="Nom"
            {...register("nom", { required: "Ce champ est obligatoire" })}
            className="md:mt-3"
          />
          {/* {responseError !== null && <Error text={responseError?.libelle}/>} */}
          {errors?.nom && <Error text={errors.nom.message} />}
        </div>
        <div className="block">

          <TextField
            required
            autoComplete="given-name"
            fullWidth
            id="prenom"
            size="small"
            type="text"
            label="Prénom"
            {...register("prenom", { required: "Ce champ est obligatoire" })}
            className="md:mt-3"
          />
          {/* {responseError !== null && <Error text={responseError?.libelle}/>} */}
          {errors?.prenom && <Error text={errors.prenom.message} />}
        </div>
        <div className="block">

          <TextField
            required
            autoComplete="given-name"
            fullWidth
            id="tel_participant"
            size="small"
            type="text"
            label="Téléphone"
            {...register("tel_participant", { required: "Ce champ est obligatoire" })}
            className=""
          />
          {/* {responseError !== null && <Error text={responseError?.libelle}/>} */}
          {errors?.tel_participant && <Error text={errors.tel_participant.message} />}
        </div>
        <div className="block">

          <TextField
            required
            autoComplete="given-name"
            size="small"
            fullWidth
            id="email"
            type="email"
            label="Courriel"
            {...register("email", {
              required: "Ce champ est obligatoire", pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: "Le format du courriel que vous avez spécifié incorrect.  Veuillez entrer un courriel valide."
              }
            })}
            onChange={e => {
              //do something
              let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
              setErrorEmail(!pattern.test(e?.target.value))
              setEmail(e?.target.value);
              setValue('email_confirmation', "")
              // console.log(participants)
              const result = participants?.filter(p => p.email === e.target.value && p.idEvent === event.id_event)
              setExistEmail(result.length > 0);
              register('email').onChange(e);
            }}
          />
          {/* {responseError !== null && <Error text={responseError?.libelle}/>} */}
          {errors?.email && <Error text={errors.email.message} />}
          {existEmail && <Error text={"Ce courriel existe déjà dans notre système!"} />}
        </div>
        <div className="block">

          <TextField
            required
            autoComplete="given-name"
            size="small"
            disabled={errorEmail}
            fullWidth
            id="email_confirmation"
            type="email"
            label="Confirmation de courriel"
            {...register("email_confirmation", {
              required: "Ce champ est obligatoire", pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: "L'email est invalide!"
              }
            })}
            onChange={e => {
              setIdentiqueEmail(e?.target?.value === email);
              register('email_confirmation').onChange(e);
            }}

          />
          {/* {responseError !== null && <Error text={responseError?.libelle}/>} */}
          {errors?.email_confirmation && <Error text={errors.email_confirmation.message} />}
          {!identiqueEmail && <Error text={"Le courriel que vous avez spécifié dans le champ \"Confirmation de courriel\" ne correspond pas à celui que vous avez indiqué dans le champ courriel.  Veuillez entrer la même valeur dans les 2 champs."} />}
        </div>
        <div className="flex-col flex md:-mt-4 z-40">
          <label
            className="mb-2"
            htmlFor={`id_tranche_age`}
          >
            {" "}
            Tranche d'âge{" "}
          </label>
          <Controller
            name={`id_tranche_age`}
            control={control}
            // rules={{
            //   required: "Ce champ est obligatoire",
            // }}

            render={({ field }) => (
              <Select
                {...field}
                placeholder={
                  "Choisir tranche d'âge..."
                }
                isClearable
                options={optionsTrancheAge}
              />
            )}
          />{" "}
          {errors?.id_tranche_age && <Error text={errors.id_tranche_age.message} />}
        </div>
        <div className="flex-col flex md:-mt-4 z-30 ">
          <label
            className="mb-2"
            htmlFor={`id_pays`}
          >
            {" "}
            Pays*{" "}
          </label>
          <Controller
            name={`id_pays`}
            control={control}
            rules={{
              required: "Ce champ est obligatoire",
            }}

            render={({ field }) => (
              <Select
                {...field}
                placeholder={
                  "Choisir pays..."
                }
                isClearable
                options={optionsPays}
                value={selectedPays}
                onChange={e => {
                  setSelectedPays(e)
                  setSelectedDepartement(null);
                  setSelectedVille(null);
                  const tableDept: option[] = [];
                  e?.data.forEach(d=>{
                    tableDept.push({
                      label: d.libelle,
                      value: d.id_departement,
                      data: d.villes
                    })
                  })
                  setOptionsDepartement(sorter(tableDept));
                  setValue('id_pays', e)
                }}
              />
            )}
          />{" "}
          {errors?.id_pays && <Error text={errors.id_pays.message} />}
        </div>
        {selectedPays && <div className="flex-col flex md:-mt-4 z-30 ">
          <label
            className="mb-2"
            htmlFor={`id_departement`}
          >
            {" "}
            Département*{" "}
          </label>
          <Controller
            name={`id_departement`}
            control={control}
            rules={{
              required: "Ce champ est obligatoire",
            }}

            render={({ field }) => (
              <Select
                {...field}
                placeholder={
                  "Choisir département..."
                }
                isClearable
                options={optionsDepartement}
                value={selectedDepartement}
                onChange={e => {
                  setSelectedVille(null)
                  setSelectedDepartement(e)
                  setValue('id_departement', e)
                  const tableVille: option[] = [];
                  e?.data.forEach(v => {
                    tableVille.push({
                      label: v.libelle,
                      value: v.id_ville,
                    })
                  })
                  setOptionsVille(sorter(tableVille))
                }}
              />
            )}
          />{" "}
          {errors?.id_departement && <Error text={errors.id_departement.message} />}
        </div>}
        {selectedDepartement && <div className="flex-col flex md:-mt-4 z-30 ">
          <label
            className="mb-2"
            htmlFor={`id_ville`}
          >
            {" "}
            Ville*{" "}
          </label>
          <Controller
            name={`id_ville`}
            control={control}
            rules={{
              required: "Ce champ est obligatoire",
            }}

            render={({ field }) => (
              <Select
                {...field}
                placeholder={
                  "Choisir ville..."
                }
                isClearable
                options={optionsVille}
                value={selectedVille}
                onChange={e => {
                  setSelectedVille(e)
                  setValue('id_ville', e)
                }}
              />
            )}
          />{" "}
          {errors?.id_ville && <Error text={errors.id_ville.message} />}
        </div>}
      </div>,
    },
    {
      label: 'Mode de participation',
      description: <div className="flex flex-col md:grid md:grid-cols-3 gap-8">
        <div className="flex-col flex md:-mt-4 z-20">
          <label
            className="mb-2"
            htmlFor={`mode_participation`}
          >
            {" "}
            Mode participation*{" "}
          </label>
          <Controller
            name={`mode_participation`}
            control={control}
            // rules={{
            //   required: "Ce champ est obligatoire",
            // }}

            render={({ field }) => (
              <Select
                {...field}
                placeholder={
                  "Choisir mode participation..."
                }
                isClearable
                options={formatEventOptions}
                value={selectedMode}
                onChange={e => {
                  setSelectedMode(e);

                }}
              />
            )}
          />{" "}
          {errors?.mode_participation && <Error text={errors.mode_participation.message} />}
        </div>



        {selectedVille !== null && selectedMode && selectedMode.value === "PRESENTIEL" &&
          <div className="flex-col flex md:-mt-4 z-10">
            <label
              className="mb-2"
              htmlFor={`id_local`}
            >
              {" "}
              Local*{" "}
            </label>
            <Controller
              name={`id_local`}
              control={control}
              rules={{
                required: {
                  message: "Ce champ est obligatoire",
                  value: selectedMode?.value === 'PRESENTIEL'
                },
              }}

              render={({ field }) => (
                <Select
                  {...field}
                  placeholder={
                    "Choisir local..."
                  }
                  isClearable
                  value={selectLocal}
                  onChange={e => {
                    setValue('id_local', e);
                    setSelectLocal(e)
                  }}
                  options={optionsLocal}
                />
              )}
            />{" "}
            {errors?.id_local && <Error text={errors.id_local.message} />}
            {selectLocal && <p className="mt-2"><span className="font-bold">Montant participation:</span> {`${selectLocal?.data?.montant_participation} ${selectLocal?.data?.codeDevise}`}</p>}
          </div>}
        {/* <div className="block">

          <TextField
            autoComplete="given-name"
            fullWidth
            id="affiliation"
            size="small"
            type="text"
            label="Affiliation"
            // {...register("affiliation")}
            className="md:mt-3"
            onChange={e=>{

              setDataForm({...dataForm, affiliation:e?.target.value})
              register('affiliation').onChange(e);
            }}
          />
          {errors?.affiliation && <Error text={errors.affiliation.message} />}
        </div> */}
        <div className="col-span-3">

          <div className="block">

            <Controller
              name='authorisation_liste'
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} />}
                  label={`J'autorise GRAHN-Monde à afficher mon nom dans le tableau des inscrits au Brunch'${new Date().getFullYear()}`}
                />
              )}
            />
          </div>
          <div className="block">

            <Controller
              name='abonnement_newsletter'
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} />}
                  label="Je souhaite recevoir les communications de GRAHN-Monde"
                />
              )}
            />
          </div>
        </div>
      </div>,
    },
    {
      label: 'resumé',
      description: <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {getValues('nom') && <div className="flex justify-between">
            <p>Nom:</p> <p>{getValues('nom')}</p>
          </div>
          }
          {getValues('prenom') && <div className="flex justify-between">
            <p>Prenom:</p> <p>{getValues('prenom')}</p>
          </div>
          }
          {getValues('email') && <div className="flex justify-between">
            <p>Email:</p> <p>{getValues('email')}</p>
          </div>
          }
          {getValues('tel_participant') && <div className="flex justify-between">
            <p>Téléphone:</p> <p>{getValues('tel_participant')}</p>
          </div>
          }
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
            disabled={isSubmit || existEmail || !identiqueEmail || selectedMode === null}
            type="submit"
            className={`bg-blue-600 capitalize text-white flex items-center justify-center gap-x-2 ${isSubmit || selectedMode === null ? "bg-blue-400" : ""}`}
            variant="contained"

          >
            {isSubmit && <CircularIndeterminate />} <span>{data_props === null ? "S'inscrire" : 'Modifier'}</span>
          </Button>
        </div>,
      </div>
    },
  ];
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  return (
    <div className="container">
      <h1 className="font-bold text-md text-center md:text-left md:text-lg capitalize mb-4">
        {data_props === null ? '' : 'Modifier'} Inscription Brunch'2023
      </h1>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)} className="center">
        {/* register your input into the hook by invoking the "register" function */}
        <section>
          <header
            className='py-2 text-center md:text-left mb-4'
          >
            <h1 className='uppercase font-semibold text-blue-500'>{steps[activeStep].label}</h1>
          </header>
          <div >
            {steps[activeStep].description}
          </div>
          <div className="mt-8">
            <MobileStepper
              variant="text"
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                >
                  Suivant
                  {theme.direction === 'rtl' ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                  {theme.direction === 'rtl' ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Retour
                </Button>
              }
            />
          </div>
        </section>

      </form>
    </div>
  );
};

export default AddInscription;
