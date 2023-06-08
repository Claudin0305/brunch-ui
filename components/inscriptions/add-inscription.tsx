import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Swal from 'sweetalert2'
import CircularIndeterminate from "@/components/core/circular-indeterminate";
import Error from "@/components/core/error";
import axios from 'axios';
import { useRouter } from 'next/router'
import Select from 'react-select';


type Inputs = {
  email: String;
  email_confirmation: String;
  telephone: String;
  nom: String;
  prenom: String;
  sexe: String;
  affiliation: String;
  authorisation_liste: number;
  abonnement_newletter: number;
  seuil_alerte: number;
  montant_participation: number;
  adresse_no_rue: String;
  id_devise: number;
  id_ville: number;
  id_civilite: number;
  capacite_totale: number;
  capacite_table: number;
};
type Props = {
  data_props: any | null;
  pays: any | null;
  tranche_ages: any | null;
  civilites: any | null;
}
type option = {
  label: String;
  value: String | number;
}

const AddInscription: React.FC<Props> = ({ data_props, pays, tranche_ages, civilites }) => {
  const router = useRouter()
  const min = 1;
  const { register, handleSubmit, watch, reset, setValue, control, formState: { errors } } = useForm<Inputs>();
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [optionsCivilite, setOptionsCivilite] = useState<option[] | null>(null);
  const [optionsVille, setOptionsVille] = useState<option[] | null>(null);
  const [optionsDevise, setOptionsDevise] = useState<option[] | null>(null);
  const [capaciteTable, setCapaciteTable] = useState<number>(10)

  const [responseError, setResponseError] = useState<any>(null);
  useEffect(() => {

    if (data_props !== null) {
      setValue('email_responsable', data_props.email_responsable);
      setValue('capacite_totale', data_props.capacite_totale);
      setValue('capacite_table', data_props.capacite_table);
      setValue('adresse_no_rue', data_props.adresse_no_rue);
      setValue('montant_participation', data_props.montant_participation);
      setValue('seuil_alerte', data_props.seuil_alerte);
      const ville = optionsVille?.filter(v=> v.id_ville === data_props.id_ville)?.[0];
      setValue('id_ville', ville);
      const devise = optionsDevise?.filter(v=> v.id_devise === data_props.id_devise)?.[0];
      setValue('id_ville', devise);
      const civilite = optionsCivilite?.filter(v=> v.id_civilite === data_props.id_civilite)?.[0];
      setValue('id_civilite', civilite);

    }
  }, [])

  useEffect(() => {
    const tableOptions: option[] = [];
    devises?.sort((a, b) => {
      let fa = a.code_devise,
        fb = b.code_devise;

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
    devises?.forEach(p => {
      tableOptions.push({
        label: `${p.code_devise} (${p.devise})`,
        value: p.id_devise
      })
    })

    setOptionsDevise(tableOptions);
  }, []);
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
    events?.forEach(e => {
      tableOptions.push({
        label: e.libelle,
        value: e.id_civilite
      })
    })

    setOptionsCivilite(tableOptions);
  }, []);
  useEffect(() => {
    const tableOptions: option[] = [];
    pays?.forEach(p => {
      p?.departements?.forEach(d => {
        d?.villes?.forEach(v => {
          tableOptions.push(
            {
              label: `${v.libelle} (${d.libelle}, ${p.libelle})`,
              value: v.id_ville
            }
          )
        })
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


    setOptionsVille(tableOptions);
  }, []);



  const updateInscription = (data: Inputs) => {
    axios
      .put(`${process.env.base_route}/locaux-brunch/${data_props.id_local}`, data)
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
          router.push('/locaux-brunch')
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
  const createInscription = (data: Inputs) => {

    axios.post(`${process.env.base_route}/locaux-brunch`, data).then(response => {
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
        setValue('id_event', null);
        setValue('id_devise', null);
        setValue('id_ville', null);
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
    let formData = new FormData()
    formData.append('id_devise', data.id_devise?.value)
    formData.append('id_ville', data.id_ville?.value)
    formData.append('id_civilite', data.id_civilite?.value)
    formData.append('capacite_totale', data.capacite_totale)
    formData.append('capacite_table', data.capacite_table)
    formData.append('montant_participation', data.montant_participation)
    formData.append('email_responsable', data.email_responsable)
    formData.append('seuil_alerte', data.seuil_alerte)
    formData.append('adresse_no_rue', data.adresse_no_rue)


    setIsSubmit(true);
    if (data_props === null) {
      formData.append('nb_reservation', 0)
      createInscription(formData);
    } else {
      updateInscription(formData)
    }

  };

  return (
    <div className="container">
      <h1 className="font-bold text-sm md:text-lg capitalize mb-8">
        {data_props === null ? 'Ajouter' : 'Modifier'} Inscription
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="center">
        {/* register your input into the hook by invoking the "register" function */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex-col flex md:-mt-4 z-50">
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
          <div className="flex-col flex md:-mt-4 z-50 ">
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
                />
              )}
            />{" "}
            {errors?.id_ville && <Error text={errors.id_ville.message} />}
          </div>
          <div className="block">

            <TextField
              required
              autoComplete="given-name"
              fullWidth
              id="adresse_no_rue"
              inputProps={{ min }}
              size="small"
              type="text"
              label="Adresse"
              {...register("adresse_no_rue", { required: "Ce champ est obligatoire" })}
              className="md:mt-3"
            />
            {/* {responseError !== null && <Error text={responseError?.libelle}/>} */}
            {errors?.adresse_no_rue && <Error text={errors.adresse_no_rue.message} />}
          </div>
          <div className="block">

            <TextField
              required
              autoComplete="given-name"
              size="small"
              fullWidth
              id="email_responsable"
              inputProps={{ min }}
              type="email"
              label="Email responsable"
              {...register("email_responsable", {
                required: "Ce champ est obligatoire", pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "L'email est invalide!"
                }
              })}
            />
            {/* {responseError !== null && <Error text={responseError?.libelle}/>} */}
            {errors?.email_responsable && <Error text={errors.email_responsable.message} />}
          </div>
          <div className="block">

            <TextField
              required
              autoComplete="given-name"
              fullWidth
              id="capacite_totale"
              type='number'
              size="small"
              inputProps={{ min }}
              label="Capacité totale"
              {...register("capacite_totale", {
                required: "Ce champ est obligatoire", min: {
                  value: 1,
                  message: 'La valeur doit être plus grande que 1'
                }
              })}
            />
            {/* {responseError !== null && <Error text={responseError?.libelle}/>} */}
            {errors?.capacite_totale && <Error text={errors.capacite_totale.message} />}
          </div>
          <div className="block">

            <TextField
              required
              autoComplete="given-name"
              fullWidth
              id="capacite_table"
              type='number'
              defaultValue={10}
              inputProps={{ min }}
              value={capaciteTable}
              size="small"
              label="Capacité table"
              {...register("capacite_table", { required: "Ce champ est obligatoire" })}
              onChange={e => {
                setCapaciteTable(e.target.value);
                register('capacite_table').onChange(e);
              }}
            />
            {/* {responseError !== null && <Error text={responseError?.libelle}/>} */}
            {errors?.capacite_table && <Error text={errors.capacite_table.message} />}
          </div>


          <div className="block">

            <TextField
              required
              autoComplete="given-name"
              fullWidth
              id="seuil_alerte"
              type='number'
              size="small"
              inputProps={{ min }}
              label="Seuil alerte"
              {...register("seuil_alerte", {
                required: "Ce champ est obligatoire", min: {
                  value: 1,
                  message: 'La valeur doit être plus grande que 1'
                }
              })}
              className="md:mt-4"
            />
            {/* {responseError !== null && <Error text={responseError?.libelle}/>} */}
            {errors?.seuil_alerte && <Error text={errors.seuil_alerte.message} />}
          </div>
          <div className="block">

            <TextField
              required
              autoComplete="given-name"
              fullWidth
              size="small"
              id="montant_participation"
              type='number'
              // step="any"
              inputProps={{ min: 0 }}
              label="Montant participation"
              {...register("montant_participation", {
                required: "Ce champ est obligatoire", min: {
                  value: 0,
                  message: 'La valeur doit être plus grande ou égale à 0'
                }
              })}
              className="md:mt-4"
            />
            {/* {responseError !== null && <Error text={responseError?.libelle}/>} */}
            {errors?.montant_participation && <Error text={errors.montant_participation.message} />}
          </div>

          <div className="flex-col flex md:-mt-4 z-50">
            <label
              className="mb-2"
              htmlFor={`id_devise`}
            >
              {" "}
              Devise*{" "}
            </label>
            <Controller
              name={`id_devise`}
              control={control}
              rules={{
                required: "Ce champ est obligatoire",
              }}

              render={({ field }) => (
                <Select
                  {...field}
                  placeholder={
                    "Choisir devise..."
                  }
                  isClearable
                  options={optionsDevise}
                />
              )}
            />{" "}
            {errors?.id_devise && <Error text={errors.id_devise.message} />}
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

export default AddInscription;
