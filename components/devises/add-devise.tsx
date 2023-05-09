import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler} from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Swal from 'sweetalert2'
import CircularIndeterminate from "@/components/core/circular-indeterminate";
import Error from "@/components/core/error";
import axios from 'axios';
import { useRouter } from 'next/router'


type Inputs = {
          devise:string;
            code_devise:string;
};
type Props = {
data_props: any | null;
}

const AddDevise: React.FC<Props> = ({data_props}) => {
  const router = useRouter()
  const { register, handleSubmit, watch, reset, setValue, control, formState: { errors } } = useForm<Inputs>();
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const [responseError, setResponseError] = useState<any>(null);
  useEffect(()=>{

    if(data_props !== null){
      setValue('devise', data_props.devise);
      setValue('code_devise', data_props.code_devise);

    }
  },[])



   const updateDevise = (data:Inputs) => {
    axios
        .put(`${process.env.base_route}/devises/${data_props.id_devise}`, data)
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
        router.push('/devises')
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
   const createDevise =  (data:Inputs) => {

  axios.post(`${process.env.base_route}/devises`, data).then(response=>{
console.log(response);
if(response.status === 201){
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
  }).catch(err=>{
    setIsSubmit(false);
    if(err.response.status === 400){
      setResponseError(err.response.data);
      // console.log(responseError)
      //sweal error
    }
  })


   };
  const onSubmit: SubmitHandler<Inputs> = data => {
    // console.log(data)

    setIsSubmit(true);
    if(data_props === null){
      createDevise(data);
    }else{
      updateDevise(data)
    }

  };

  return (
    <div className="container">
      <h1 className="font-bold text-sm md:text-lg capitalize mb-8">
        {data_props === null ? 'Ajouter':'Modifier'} Devise
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="center">
        {/* register your input into the hook by invoking the "register" function */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="block">

          <TextField
            required
            autoComplete="given-name"
            fullWidth
            id="devise"
            label="Devise"
            {...register("devise", { required: true })}
          />
          {responseError !== null && <Error text={responseError?.devise}/>}
          </div>


          <TextField
            required
            autoComplete="given-name"
            fullWidth
            id="code_devise"
            label="Code devise"
            {...register("code_devise", { required: true })}
          />



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
            {isSubmit && <CircularIndeterminate/>} <span>{data_props === null ? 'Ajouter':'Modifier' }</span>
          </Button>
        </div>

      </form>
    </div>
  );
};

export default AddDevise;
