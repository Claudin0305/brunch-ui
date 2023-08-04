import { useState, useEffect } from "react";
import React from "react";
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
import Star from "@/components/core/star";
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import ModalRecap from "@/components/core/modal-recap";
import ModalAddVille from "@/components/core/modal-add-ville";
import ModalAddAffiliation from "@/components/core/modal-add-affiliation";


type Inputs = {
  email: string;
  email_confirmation: string;
  tel_participant: string;
  nom: string;
  prenom: string;
  affiliation: string;
  mode_participation: string | option;
  authorisation_liste: string;
  abonnement_newsletter: string;
  id_local: string | null | any;
  id_affiliation: string | null | any;
  id_ville: string | null | any;
  id_civilite: string | null | any;
  id_event: string | null | any;
  id_tranche_age: string | null | any;
  id_pays: string | null | any;
  id_departement: string | null | any;
  mode_paiement: string | null | any;
};
type errType = {
  civilite?: any
  nom?: any
  prenom?: any
  email?: any
  email_confirmation?: any
  email_invalid?: any
  pays?: any
  departement?: any
  ville?: any
  tel_participant?: any
  affiliation?: any
  local?: any
  mode_participation?: any
  tranche_age?: any
  tel_invalid?: any
}
type Props = {
  data_props: any | null;
  pays: any | null;
  tranche_ages: any | null;
  civilites: any | null;
  event: any | null;
  locaux: any | null;
  participants: any | null;
  affiliations: any | null;
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
const mode_paiements: option[] = [
  {
    value: "DIFFERE",
    label: "Paiement Différé"
  },
  {
    value: "IMMEDIAT",
    label: "Paiement Immédiat"
  },

]

let errNext: errType = {};
const champ = 'Ce champ est obligatoire!';
const AddInscription: React.FC<Props> = ({ data_props, pays, tranche_ages, civilites, event, locaux, participants, affiliations }) => {
  const { register, handleSubmit, watch, reset, setValue, getValues, control, formState: { errors } } = useForm<Inputs>();
  const [errorNext, setErrorNext] = useState<any>({});
  const [show, setShow] = useState<boolean>(false);
  const [showModalVille, setShowModalVille] = useState<boolean>(false);
  const [showModalAffiliation, setShowModalAffiliation] = useState<boolean>(false);
  const router = useRouter()
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [newsLatter, setNewLatter] = useState<boolean>(false);
  const [showData, setShowData] = useState<boolean>(false);
  const [optionsCivilite, setOptionsCivilite] = useState<option[] | any>();
  const [optionsAffiliation, setOptionsAffiliation] = useState<option[] | any>();
  const [optionsVille, setOptionsVille] = useState<option[] | any>();
  const [optionsDepartement, setOptionsDepartement] = useState<option[] | any>();
  const [optionsPays, setOptionsPays] = useState<option[] | any>();
  const [optionsLocal, setOptionsLocal] = useState<option[] | any>();
  const [change, setChange] = useState<boolean>(false);
  const [optionsTrancheAge, setOptionsTrancheAge] = useState<option[] | any>();
  const [capaciteTable, setCapaciteTable] = useState<number>(10)
  const [selectedAffiliation, setSelectedAffiliation] = useState<option | any>();
  const [selectedVille, setSelectedVille] = useState<option | any>();
  const [selectedMode, setSelectedMode] = useState<option | any>();
  const [selectedPays, setSelectedPays] = useState<option | any>(null);
  const [selectedDepartement, setSelectedDepartement] = useState<option | any>(null);
  const [selectCivilite, setSelectCivilite] = useState<option | null>(null);
  const [selectTrangeAge, setSelectTrangeAge] = useState<option | null>(null);
  const [selectLocal, setSelectLocal] = useState<option | any>();
  const [selectModePaiement, setSelectModePaiement] = useState<option | any>(null);
  const [formatEventOptions, setFormatEventOptions] = useState<option[] | any>()
  const [errorEmail, setErrorEmail] = useState<boolean>(false);
  const [existEmail, setExistEmail] = useState<boolean>(false);
  const [identiqueEmail, setIdentiqueEmail] = useState<boolean>(true);
  const [email, setEmail] = useState<String | null>(null)
  const [responseData, setResponseData] = useState<any>(null)

  const [responseError, setResponseError] = useState<any>(null);
  useEffect(() => {
    if (data_props !== null) {
      setValue('nom', data_props.nom)
      setValue('prenom', data_props.prenom)
      setValue('email', data_props.email)
      setValue('tel_participant', data_props.tel_participant)
      setValue('authorisation_liste', data_props.authorisationListe)
      setValue('abonnement_newsletter', data_props.abonnement_newsletter)
      setValue('email_confirmation', data_props.email)
      const pays = optionsPays?.filter((o: any) => o.label === data_props.nomPays)[0];
      setValue('id_pays', pays);
      setSelectedPays(pays)
      const tableDept: option[] = [];
      pays?.data.forEach((d: any) => {
        tableDept.push({
          label: d.libelle,
          value: d.id_departement,
          data: d.villes
        })
      })
      setOptionsDepartement(sorter(tableDept));
      const dept = tableDept?.filter((o: any) => o.value === data_props.ville.departementId)[0];
      setValue('id_departement', dept);
      setSelectedDepartement(dept)


      const tableVille: option[] = [];
      tableVille.push({
        label: "Autre",
        value: "0"
      })
      dept?.data.forEach((v: any) => {
        tableVille.push({
          label: v.libelle,
          value: v.id_ville,
        })
      })
      setOptionsVille(sorter(tableVille))
      const ville = tableVille?.filter((o: any) => o.value === data_props.ville.id_ville)[0];
      setValue('id_ville', ville);
      setSelectedVille(ville)
      const trAge = optionsTrancheAge?.filter((o: any) => o.value === data_props.idTrancheAge)[0];
      setValue('id_tranche_age', trAge);
      const civilite = optionsCivilite?.filter((o: any) => o.value === data_props.idCivilite)[0];
      setValue('id_civilite', civilite);
      const aff = optionsAffiliation?.filter((o: any) => o.value === data_props?.idAffiliation)[0]
      setValue('id_affiliation', aff);
      setSelectedAffiliation(aff)
      const optionsMod: option[] = [
        {
          value: "PRESENTIEL",
          label: "Présentiel"
        },
        {
          value: "DISTANCIEL",
          label: "Distanciel"
        }
      ]
      const mod = optionsMod.filter((o: any) => o.value === data_props.mode_participation)[0];
      setValue('mode_participation', mod);
      setSelectedMode(mod)
      const loc = optionsLocal?.filter((o: any) => o.value === data_props?.idLocal)[0];
      setValue('id_local', loc);
      setSelectLocal(loc);

      const mod_p = mode_paiements.filter((o: any) => o.value === data_props?.modePaiement)[0];
      setValue('mode_paiement', mod_p);
      setSelectModePaiement(mod_p);

    }
  }, [optionsPays])

  useEffect(() => {
    const tableOptions: option[] = [];
    tranche_ages?.sort((a: any, b: any) => {
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
    tranche_ages?.forEach((p: any) => {
      tableOptions.push({
        label: p.libelle,
        value: p.id_tranche_age
      })
    })

    setOptionsTrancheAge(tableOptions);
  }, []);
  useEffect(() => {
    const tableOptions: option[] = [];

    locaux?.forEach((e: any) => {
      tableOptions.push({
        label: `${e.libelle} (${e.pays}, ${e.ville})`,
        value: e.id_local,
        id_ville: e.idVille,
        data: e
      })
    })


    tableOptions?.sort((a: any, b: any) => {
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
    setOptionsLocal(tableOptions);
    // if (selectedVille !== null) {
    //   const result = tableOptions?.filter(o => o.id_ville === selectedVille?.value)
    //   setOptionsLocal(result);
    // } else {
    //   setOptionsLocal([])
    // }
  }, []);
  useEffect(() => {
    const tableOptions: option[] = [],
      tablePays: option[] = [],
      tableDepartements: option[] = [],
      tableVilles: option[] = [];
    pays?.forEach((p: any) => {
      tablePays.push({
        label: p.libelle,
        value: p.id_pays,
        data: p.departements
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

    tablePays?.sort((a: any, b: any) => {
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


  useEffect(() => {
    const tableOptions: option[] = [];
    affiliations?.sort((a: any, b: any) => {
      let fa = a.nom_affiliation,
        fb = b.nom_affiliation;

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
    affiliations?.forEach((p: any) => {
      tableOptions.push({
        label: p.nom_affiliation,
        value: p.affiliationId
      })
    })

    setOptionsAffiliation([{
      label: "Autre Affiliation",
      value: "0"
    }, ...tableOptions]);
  }, [])

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
  const sorter = (table: option[]) => {
    table?.sort((a: any, b: any) => {
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
    civilites?.sort((a: any, b: any) => {
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
    civilites?.forEach((e: any) => {
      tableOptions.push({
        label: e.libelle,
        value: e.id_civilite
      })
    })

    setOptionsCivilite(tableOptions);
  }, [])

  const updateInscription = (data: Inputs | FormData) => {
    axios
      .put(`/api/inscriptions/${data_props.username}`, data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
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
          // router.push('/locaux-brunch')
          setValue('id_event', "");
          setValue('id_tranche_age', "");
          setValue('id_ville', "");
          setValue('id_local', "");
          setValue('id_affiliation', "");
          setValue('id_civilite', "");

          // setValue("abonnement_newsletter", "0")
          // setValue("authorisation_liste", "0")

          setSelectedVille(null)
          setSelectedMode(null)
          setSelectedAffiliation(null);
          router.push("/")
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
  // console.log(errors, errors!==null);
  const createInscription = (data: Inputs | FormData) => {

    axios.post(`/api/inscriptions`, data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
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
        setResponseData(response.data)
        setIsSubmit(false);
        setShow(true)
        reset();
        setValue('id_event', "");
        setValue('id_tranche_age', "");
        setValue('id_ville', "");
        setValue('id_local', "");
        setValue('id_affiliation', "");
        setValue('id_civilite', "");

        setValue("abonnement_newsletter", "0")
        setValue("authorisation_liste", "0")

        setSelectedVille(null)
        setSelectedMode(null)
        setSelectedAffiliation(null);
        // setSelectedLocal(null);
      }
    }).catch(err => {
      setIsSubmit(false);
      console.log(err)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Erreur lors de l\'inscription. Vérifiez vos données!',
        confirmButtonColor: "#2563eb",
        confirmButtonText: "Fermer",
      })
      if (err.response.status === 400) {
        setResponseError(err.response.data);
        // console.log(responseError)
        //sweal error
      }
    })


  };
  // /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\\./0-9]*$/g

  const onSubmit: SubmitHandler<Inputs> = data => {
    let formData = new FormData()
    data.id_event = event.id_event
    data.id_ville = selectedVille?.value;
    data.mode_participation = selectedMode?.value;
    data.id_tranche_age = data.id_tranche_age?.value
    data.id_civilite = data.id_civilite?.value;

    if (data.affiliation !== undefined) {

      formData.append("affiliation", data.affiliation)

    }

    if (data?.id_local?.value !== undefined) {
      data.id_local = data.id_local?.value;
      formData.append("id_local", data.id_local?.value)
    } else {
      formData.append("id_local", '0')
      data.id_local = '0'

    }
    if (data?.id_affiliation?.value !== undefined) {
      formData.append("id_affiliation", data.id_affiliation?.value)
      data.id_affiliation = data.id_affiliation?.value;
    } else {
      formData.append("id_affiliation", '0')
      data.id_affiliation = '0'

    }
    if (selectModePaiement !== null) {
      formData.append("modePaiement", selectModePaiement?.value);
      data.mode_paiement = selectModePaiement?.value
    }

    setIsSubmit(true);
    if (data_props === null) {
      createInscription(data);
    } else {
      updateInscription(data)
    }

  };

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
            Civilité<Star />{" "}
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
          {errNext?.civilite && <Error text={champ} />}
          {/* {errors?.id_civilite && <Error text={errors.id_civilite.message} />} */}
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
            onChange={e => {
              if (e?.target.value !== "") {
                errNext = { ...errNext, nom: false }
              }
              register('nom').onChange(e);
            }}
          />
          {/* {responseError !== null && <Error text={responseError?.libelle}/>} */}
          {/* {errors?.nom && <Error text={errors.nom.message} />} */}
          {errNext?.nom && <Error text={champ} />}
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
          {/* {errors?.prenom && <Error text={errors.prenom.message} />} */}
          {errNext?.prenom && <Error text={champ} />}
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
            {...register("tel_participant", {
              required: "Ce champ est obligatoire", pattern: {
                value: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\\./0-9]*$/g,
                message: "Le format du "
              }
            })}
            className=""
          />
          {/* {responseError !== null && <Error text={responseError?.libelle}/>} */}
          {/* {errors?.tel_participant && <Error text={errors.tel_participant.message} />} */}
          {errNext?.tel_participant && <Error text={champ} />}
          {errNext?.tel_invalid && <Error text={'Le numéro de téléphone est invalide!'} />}
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
              const result = participants?.filter((p: any) => p.email === e.target.value && p.idEvent === event.id_event)
              setExistEmail(result.length > 0);
              register('email').onChange(e);
            }}
          />
          {/* {responseError !== null && <Error text={responseError?.libelle}/>} */}
          {/* {errors?.email && <Error text={errors.email.message} />} */}
          {errNext?.email && <Error text={champ} />}
          {errNext?.email_invalid && <div className="block"> <Error text={'Le format du courriel que vous avez spécifié incorrect.  Veuillez entrer un courriel valide.'} /> </div>}
          {/* {existEmail && <Error text={"Ce courriel existe déjà dans notre système!"} />} */}
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
          {errNext?.email_confirmation && <Error text={'Le courriel que vous avez spécifié dans le champ "Confirmation de courriel" ne correspond pas à celui que vous avez indiqué dans le champ courriel.  Veuillez entrer la même valeur dans les 2 champs.'} />}
          {/* {errors?.email_confirmation && <Error text={errors.email_confirmation.message} />}
          {!identiqueEmail && <Error text={"Le courriel que vous avez spécifié dans le champ \"Confirmation de courriel\" ne correspond pas à celui que vous avez indiqué dans le champ courriel.  Veuillez entrer la même valeur dans les 2 champs."} />} */}
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
          {/* {errors?.id_tranche_age && <Error text={errors.id_tranche_age.message} />} */}
          {errNext?.tranche_age && <Error text={champ} />}
        </div>
        <div className="flex-col flex md:-mt-4 z-30 ">
          <label
            className="mb-2"
            htmlFor={`id_pays`}
          >
            {" "}
            Pays<Star />{" "}
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
                  e?.data.forEach((d: any) => {
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
          {/* {errors?.id_pays && <Error text={errors.id_pays.message} />} */}
          {errNext?.pays && <Error text={champ} />}
        </div>
        {selectedPays && <div className="flex-col flex md:-mt-4 z-30 ">
          <label
            className="mb-2"
            htmlFor={`id_departement`}
          >
            {" "}
            Département/Province/Etat/Canton<Star />{" "}
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
                  tableVille.push({
                    label: "Autre",
                    value: "0"
                  })
                  e?.data.forEach((v: any) => {
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
          {/* {errors?.id_departement && <Error text={errors.id_departement.message} />} */}
          {errNext?.departement && <Error text={champ} />}
        </div>}
        {selectedDepartement && <div className="flex-col flex md:-mt-4 z-30 ">
          <label
            className="mb-2"
            htmlFor={`id_ville`}
          >
            {" "}
            Ville<Star />{" "}
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
                  "Choisir une ville ou cliquez sur \"Autre\" pour créer une ville manquante."
                }
                isClearable
                options={optionsVille}
                value={selectedVille}
                onChange={e => {
                  if (e?.value == "0") {
                    setShowModalVille(!showModalVille)
                  } else {
                    setSelectedVille(e)
                    setValue('id_ville', e)

                  }
                }}
              />
            )}
          />{" "}
          {/* {errors?.id_ville && <Error text={errors.id_ville.message} />} */}
          {errNext?.ville && <Error text={champ} />}
        </div>}
      </div>,
    },
    {
      label: 'Mode de participation',
      description: <div className="flex flex-col md:grid md:grid-cols-3 gap-8">
        {JSON.stringify(errors) !== '{}' && <div className="md:col-span-3 col-span-1 text-center -mt-4 flex justify-center">
          <Error text="Erreur lors de la soumission. Vérifiez vos données!" />
        </div>}

        <input type="hidden" name="" />
        <div className="flex-col flex md:-mt-4 z-10">
          <label
            className="mb-2"
            htmlFor={`id_affiliation`}
          >
            {" "}
            Affiliation{" "}
          </label>
          <Controller
            name={`id_affiliation`}
            control={control}
            rules={{
              required: {
                message: "Ce champ est obligatoire",
                value: false
              },
            }}

            render={({ field }) => (
              <Select
                {...field}
                placeholder={
                  "Choisir une Affiliation ou cliquez sur \"Autre Affiliation\" pour créer une affiliation manquante."
                }
                isClearable
                options={optionsAffiliation}
                value={selectedAffiliation}
                onChange={e => {
                  if (e?.value == "0") {
                    setShowModalAffiliation(!showModalAffiliation)
                  } else {
                    setSelectedAffiliation(e)
                    setValue('id_affiliation', e)

                  }
                }}
              // value={selectLocal}
              // onChange={e => {
              //   setValue('id_affiliation', e);
              //   setSelectLocal(e)
              // }}
              />
            )}
          />{" "}
          {errors?.id_affiliation && <Error text={errors.id_affiliation.message} />}

        </div>
        <div className="flex-col flex md:-mt-4 z-20">
          <label
            className="mb-2"
            htmlFor={`mode_participation`}
          >
            {" "}
            Mode participation<Star />{" "}
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



        {selectedMode && selectedMode.value === "PRESENTIEL" &&
          <div className="flex-col flex md:-mt-4 z-10">
            <label
              className="mb-2"
              htmlFor={`id_local`}
            >
              {" "}
              Local<Star />{" "}
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
          </div>


        }
        {selectLocal && selectLocal?.data?.montant_participation > 0 &&
          <div className="flex-col flex md:-mt-4 z-10">
            <label
              className="mb-2"
              htmlFor={`mode_paiement`}
            >
              {" "}
              Mode paiement<Star />{" "}
            </label>
            <Controller
              name={`mode_paiement`}
              control={control}
              rules={{
                required: "Ce champ est obligatoire"
              }

              }

              render={({ field }) => (
                <Select
                  {...field}
                  placeholder={
                    "Choisir mode..."
                  }
                  isClearable
                  value={selectModePaiement}
                  onChange={e => {
                    // if(e?.value === "PAYPAL"){
                    //   Swal.fire({
                    //     icon: 'error',
                    //     title: 'Oops...',
                    //     text: 'Ce module est en cours de développement!',
                    //     confirmButtonColor: "#2563eb",
                    //     confirmButtonText: "Fermer",
                    //   })

                    // }else{

                    setValue('mode_paiement', e);
                    setSelectModePaiement(e);
                    // }
                  }}
                  options={mode_paiements}
                />
              )}
            />{" "}
            {errors?.mode_paiement && <Error text={errors.mode_paiement.message} />}
            {/* {selectLocal && <p className="mt-2"><span className="font-bold">Montant participation:</span> {`${selectLocal?.data?.montant_participation} ${selectLocal?.data?.codeDevise}`}</p>} */}
          </div>
        }
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
            <input
              {...register("authorisation_liste")}
              type="checkbox"
              id="authorisation_liste"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-2"
            />
            <label htmlFor="authorisation_liste">{`J'autorise GRAHN-Monde à afficher mon nom dans le tableau des inscrits au Brunch'${new Date().getFullYear()}`}</label>

          </div>
          <div className="block mt-4">
            <input
              {...register("abonnement_newsletter")}
              type="checkbox"
              id="abonnement_newsletter"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-2"
            />
            <label htmlFor="abonnement_newsletter">Je souhaite recevoir les communications de GRAHN-Monde</label>

          </div>
          {/* <div className="block">

            <Controller
              name='abonnement_newsletter'
              control={control}
              defaultValue={'0'}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} />}
                  label="Je souhaite recevoir les communications de GRAHN-Monde"
                />
              )}
            />
          </div> */}
        </div>
        <div className="flex justify-end flex-col mt-8 md:flex-row gap-8 mb-8 col-span-3">
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
      </div>,
    },

  ];
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    const values = getValues()
    const errC = values.id_civilite === null || values.id_civilite === undefined
    setErrorNext({ ...errorNext, errorCivilite: errC })
    if (values.id_civilite === null || values.id_civilite === undefined) {
      errNext = { ...errNext, civilite: true }
    } else {
      errNext = { ...errNext, civilite: false }
    }
    if (values.id_pays === null || values.id_pays === undefined) {
      errNext = { ...errNext, pays: true }
    } else {
      errNext = { ...errNext, pays: false }
    }
    if (values.id_ville === null || values.id_ville === undefined) {
      errNext = { ...errNext, ville: true }
    } else {
      errNext = { ...errNext, ville: false }
    }
    if (values.id_departement === null || values.id_departement === undefined) {
      errNext = { ...errNext, departement: true }
    } else {
      errNext = { ...errNext, departement: false }
    }
    if (values.id_tranche_age === null || values.id_tranche_age === undefined) {
      errNext = { ...errNext, tranche_age: true }
    } else {
      errNext = { ...errNext, tranche_age: false }
    }
    if (values.nom.trim() === "") {
      errNext = { ...errNext, nom: true }
    } else {
      errNext = { ...errNext, nom: false }
    }
    if (values.prenom.trim() === "") {
      errNext = { ...errNext, prenom: true }
    } else {
      errNext = { ...errNext, prenom: false }
    }
    if (values.email.trim() === "") {
      errNext = { ...errNext, email: true }
    } else {
      errNext = { ...errNext, email: false }
    }
    if (values.tel_participant.trim() === "") {
      errNext = { ...errNext, tel_participant: true }
    } else {
      errNext = { ...errNext, tel_participant: false }
      let reg = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\\./0-9]*$/g
      errNext = { ...errNext, tel_invalid: !reg.test(values.tel_participant) }
    }

    const keys = Object.keys(errNext);

    if (values.email.trim() !== "") {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      errNext = { ...errNext, email_invalid: !reg.test(values.email) }
    }
    if (values.email_confirmation.trim() !== "" && values.email !== values.email_confirmation) {
      errNext = { ...errNext, email_confirmation: true }
    } else {
      errNext = { ...errNext, email_confirmation: false }
    }

    const val = Object.values(errNext);

    const result = val.filter(v => v === true);
    if (result.length > 0) {
      Swal.fire({
        // position: 'top-end',
        icon: 'error',
        title: 'Vos données ne sont pas valides!',
        // showConfirmButton: false,
        // timer: 1500
        // buttonColor:"#000000",
        // buttons:[""]
        confirmButtonColor: "#2563eb",
        confirmButtonText: "Fermer",
      })
    } else {

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

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
      <ModalRecap show={show} setShow={setShow} data={responseData} />
      <ModalAddAffiliation
        show={showModalAffiliation}
        setShow={setShowModalAffiliation}
        setSelectedAffiliation={setSelectedAffiliation}
      />
      <ModalAddVille
        show={showModalVille}
        setShow={setShowModalVille}
        selectedDept={selectedDepartement}
        setSelectedVille={setSelectedVille}
      />
    </div>
  );
};

export default AddInscription;
