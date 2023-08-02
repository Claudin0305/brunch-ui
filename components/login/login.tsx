"use server"
import React, { useState, useEffect } from "react";
import { setCookie } from 'cookies-next';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Swal from 'sweetalert2'
import CircularIndeterminate from "@/components/core/circular-indeterminate";
import axios from 'axios'
import { useRouter } from 'next/router'
import Error from "@/components/core/error";

type Inputs = {

  username: string;
  password: string;
};


const Login: React.FC = () => {
  const router = useRouter();
  const { register, handleSubmit, watch, reset, setValue, control, formState: { errors } } = useForm<Inputs>();
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [errorLogin, setErrorLogin] = useState<boolean>(false)

  const [responseError, setResponseError] = useState(null);



  const login = (data: Inputs) => {
    axios.post(`${process.env.base_route}/auth/signin`, data).then(response => {
      if (response.status === 200) {
        // Swal.fire({
        //   // position: 'top-end',
        //   icon: 'success',
        //   title: 'Enregistrement effectué!',
        //   // showConfirmButton: false,
        //   // timer: 1500
        //   // buttonColor:"#000000",
        //   // buttons:[""]
        //   confirmButtonColor: "#0ea5e9",
        //   confirmButtonText: "Fermer",
        // })
        setCookie('user', JSON.stringify(response.data))
        setCookie('token', response.data.token)
        // cookies.set('token', response.data.token)
        setIsSubmit(false);
        router.push("/dashboard");
        reset();
      }
    }).catch(err => {
      setIsSubmit(false);
      console.log(err)
      setErrorLogin(!errorLogin)
      if (err?.response?.status === 400) {
        setResponseError(err.response.data);
        // console.log(responseError)
        //sweal error
      }
    })


  };
  const onSubmit: SubmitHandler<Inputs> = data => {
    // console.log(data)
    setIsSubmit(true)
    login(data)


  };

  // console.log(watch("father_name")) // watch input value by passing the name of it
  return (

    <section className={"bg-gradient-to-br from-blue-800 to-blue-slate-3000 dark:bg-gray-900"}>
  <div className={"flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"}>
      {/* <a href="#yets" className={"flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"}>
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
          Flowbite
      </a> */}
    <div className={"w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"}>
          <div className={"p-6 space-y-4 md:space-y-6 sm:p-8"}>
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Connexion
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                {errorLogin && <div className="flex items-center justify-center">
                  <Error text="Nom utilisateur ou mot de passe invalide!"/>
                  </div>}
                  <div>
                      <TextField
            required
            autoComplete="given-name"
            fullWidth
              size="small"
            id="username"
            label="Nom utilisateur"
            {...register("username", { required: true })}
          />
                  </div>
                  <div>

                      <TextField
            required
            autoComplete="given-name"
            fullWidth
              size="small"
            id="password"
            type="password"
            label="Mot de passe"
            {...register("password", { required: true })}
          />
                  </div>
                  <div>
 <Button
            disabled={isSubmit}
            type="submit"
            className="bg-blue-500 capitalize text-white flex items-center justify-center gap-x-2 w-full"
            variant="contained"
          >
            {isSubmit && <CircularIndeterminate />} Connexion
          </Button>
                  </div>
              </form>
          </div>
      </div>
  </div>

  </section>


);
};

export default Login;
