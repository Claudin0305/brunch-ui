import React, { useState, useEffect, useMemo } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Swal from 'sweetalert2'
import CircularIndeterminate from "@/components/core/circular-indeterminate";
import Error from "@/components/core/error";
import axios from 'axios';
import { useRouter } from 'next/router'
import Select from 'react-select';


type option = {
    label: string;
    value: string;
}
type Inputs = {
  name: string;
  email: string;
  password: string;
  role: option | string | null |any;
  username: string;
  c_email: string;
  c_password: string;
};
type Props = {
  data_props: any | null
}


const AddUtilisateur: React.FC<Props> = ({data_props}) => {
    // const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }));

    const router = useRouter()
    const { register, handleSubmit, watch, reset, setValue, control, formState: { errors } } = useForm<Inputs>();
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [responseError, setResponseError] = useState<any>(null);
  const [errorEmail, setErrorEmail] = useState<boolean>(false);
  const [existEmail, setExistEmail] = useState<boolean>(false);
  const [identiqueEmail, setIdentiqueEmail] = useState<boolean>(true);
  const [identiquePassword, setIdentiquePassword] = useState<boolean>(true);
  const [email, setEmail] = useState<null | string>(null)
  const [password, setPassword] = useState<null | string>(null)
  const [options, setOptions] = useState<null|option[]|any>(null);

    useEffect(() => {

        if (data_props !== null) {


      setValue('name', data_props.name);
      setValue('username', data_props.username);
      setValue('email', data_props.email);
      setValue('c_email', data_props.email);
      const result = options?.filter((r:any) => r.value === data_props.role)[0];
      setValue('role', result);

        }
    }, [options])

    useEffect(() => {
        const tableOptions: option[] = [
  //          {
  //   value: "standard",
  //   label: "Standard"
  // },
  {
    value: "admin",
    label: "admin"
  },
  {
    value: "user",
    label: "user"
  },
        ];
        tableOptions.sort((a:any, b:any) => {
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


        setOptions(tableOptions);
    }, []);


    const updateUtilisateur = (data: Inputs) => {
        axios
            .put(`${process.env.base_route}/auth/signup/${data_props.id}`, data)
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
                    router.push('/utilisateurs')

                    reset();
                }

            })
            .catch((err) => {
                console.log(err)
                if (err.response.status === 400) {
                    setResponseError(err.response.data);
                }
                setIsSubmit(false);
            });


    };
    const createUtilisateur = (data: Inputs |FormData) => {

      axios.post(`${process.env.base_route}/auth/signup`, data).then(response => {
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
        const role = [];

        data?.role.forEach((r:any)=>{
          role.push(r.value)
        })
        data?.role = role;
        setIsSubmit(true);

        if (data_props === null) {
            createUtilisateur(data);
        } else {
            updateUtilisateur(data)
        }

    };

    return (
        <div className="container">
            <h1 className="font-bold text-sm md:text-lg capitalize mb-8">
                {data_props === null ? 'Ajouter' : 'Modifier'} Utilisateur
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="center">
                {/* register your input into the hook by invoking the "register" function */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div className="block">

          <TextField
            required
            autoComplete="given-name"
            fullWidth
              size="small"
            id="name"
            label="Nom complet"
            {...register("name", { required: true })}
          />
           {errors?.name && <Error text={errors.name.message} />}
    </div>
    <div className="block">

          <TextField
            required
            autoComplete="given-name"
            fullWidth
              size="small"
            id="username"
            label="Nom utilisateur"
            {...register("username", { required: true })}
          />
           {errors?.username && <Error text={errors.username.message} />}
    </div>




          <div className="block">

            <TextField
              required
              autoComplete="given-name"
              size="small"
              fullWidth
              id="email"
              type="email"
              label="Email"
              {...register("email", {
                required: "Ce champ est obligatoire", pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Email invalide!"
                }
              })}
              onChange={e => {
                //do something
                let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                setErrorEmail(!pattern.test(e?.target.value))
                setEmail(e?.target.value);
                setValue('c_email', "")
                // console.log(participants)
                // const result = participants?.filter(p=> p.email === e.target.value && p.idEvent === event.id_event)
                // setExistEmail(result.length > 0);
                register('email').onChange(e);
              }}
            />
            {/* {responseError !== null && <Error text={responseError?.libelle}/>} */}
            {errors?.email && <Error text={errors.email.message} />}
            {/* {existEmail && <Error text={"Ce courriel existe déjà dans notre système!"}/>} */}
          </div>
          <div className="block">

            <TextField
              required
              autoComplete="given-name"
              size="small"
              disabled={errorEmail}
              fullWidth
              id="c_email"
              type="email"
              label="Confirmation de l'email"
              {...register("c_email", {
                required: "Ce champ est obligatoire", pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "L'email est invalide!"
                }
              })}
              onChange={e => {
                setIdentiqueEmail(e?.target?.value === email);
                register('c_email').onChange(e);
              }}

            />
            {errors?.c_email && <Error text={errors.c_email.message} />}
            {!identiqueEmail && <Error text={"Les emails ne sont pas identiques!"} />}
          </div>

          {data_props === null && <>
            <div className="block">
              <TextField
                required={data_props === null}
                autoComplete="given-name"
                fullWidth
                type="password"
              size="small"
                id="password"
                label="Mot de passe"
                {...register("password", { required: true })}
                onChange={e => {

                  setPassword(e?.target.value);
                  setValue('c_password', "")
                  register('password').onChange(e);
                }}
              />
            </div>

            <div className="block">
              <TextField
                required={data_props === null}
                autoComplete="given-name"
                fullWidth
                type="password"
              size="small"
                id="c_password"
                label="Confirmation mot de passe"
                {...register("c_password", { required: true })}
                onChange={e => {
                  setIdentiquePassword(e?.target?.value === password);
                  register('c_password').onChange(e);
                }}
              />
              {errors?.c_password && <Error text={errors.c_password.message} />}
              {!identiquePassword && <Error text={"Les mots de passes ne sont pas identiques."} />}
            </div>
          </>}

            <div className="flex-col flex md:-mt-4 z-20">
              <label
                className="mb-2"
                htmlFor={`role`}
              >
                {" "}
                Role*{" "}
              </label>
              <Controller
                name={`role`}
                control={control}
                // rules={{
                //   required: "Ce champ est obligatoire",
                // }}

                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder={
                      "Choisir le role..."
                    }
                    isClearable
                    isMulti
                    options={options}

                  />
                )}
              />{" "}
              {errors?.role && <Error text={errors.role.message} />}
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

export default AddUtilisateur;
