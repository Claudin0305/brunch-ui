import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Swal from 'sweetalert2'
import CircularIndeterminate from "@/components/core/circular-indeterminate";
import axios from 'axios'
import { useRouter } from 'next/router'



type Inputs = {

  username: string;
  password: string;
};


const Login: React.FC = () => {
  const router = useRouter();
  const { register, handleSubmit, watch, reset, setValue, control, formState: { errors } } = useForm<Inputs>();
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const [responseError, setResponseError] = useState(null);



  const login = (data: Inputs) => {
    axios.post(`${process.env.base_route}/users/login`, data).then(response => {
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
          confirmButtonColor: "#0ea5e9",
          confirmButtonText: "Fermer",
        })
        setIsSubmit(false);
        reset();
      }
    }).catch(err => {
      setIsSubmit(false);
      console.log(err)
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
                  {/* <div className="flex items-center justify-between">
                      <div className="flex items-start">
                          <div className="flex items-center h-5">

                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                          </div>
                      </div>
                      <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div> */}
                  {/* <button  type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"> {isSubmit && <CircularIndeterminate />}Sign in</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                  </p> */}
              </form>
          </div>
      </div>
  </div>

  </section>


);
};

export default Login;
