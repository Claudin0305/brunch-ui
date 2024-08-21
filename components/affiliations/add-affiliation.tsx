import { useState, useEffect } from "react";
import { useForm, SubmitHandler} from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Swal from 'sweetalert2'
import CircularIndeterminate from "@/components/core/circular-indeterminate";
import Error from "@/components/core/error";
import axios from 'axios';
import { useRouter } from 'next/router'
import Star from "@/components/core/star";


type Inputs = {
  nom_affiliation:string;
  validate:string | any;
};
type Props = {
data_props: any | null;
}

const AddAffiliation: React.FC<Props> = ({data_props}) => {
  const router = useRouter()
  const { register, handleSubmit, watch, reset, setValue, control, formState: { errors } } = useForm<Inputs>();
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const [responseError, setResponseError] = useState<any>(null);
  useEffect(()=>{

    if(data_props !== null){
      setValue('nom_affiliation', data_props.nom_affiliation);
      setValue('validate', data_props.validate ? "1":"0");

    }
  },[])



   const updateAffiliation = (data:Inputs) => {
    axios
        .put(`/api/affiliations/${data_props.affiliationId}`, data)
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
        router.push('/affiliations')
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
   const createAffiliation =  (data:Inputs) => {

  axios.post(`/api/affiliations`, data).then(response=>{
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
    data.validate = data.validate == "1" ? 1:0
    // console.log(data)
    setIsSubmit(true);
    if(data_props === null){
      createAffiliation(data);
    }else{
      updateAffiliation(data)
    }

  };

  return (
    <div className="container">
      <h1 className="font-bold text-sm md:text-lg capitalize mb-8">
        {data_props === null ? 'Ajouter':'Modifier'} Affiliation
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
            id="nom_affiliation"
            label="Nom affiliation"
              {...register("nom_affiliation", { required: 'Ce champ est obligatoire' })}
          />
            {responseError !== null && <Error text={responseError?.nom_affiliation}/>}
            {errors?.nom_affiliation && <Error text={errors.nom_affiliation.message} />}
          </div>

          <div className="block md:-mt-2">
            <label htmlFor="validate">Affiliation validée<Star /></label>
            <div className="flex gap-8">
              <div className="flex justify-center items-center my-2">

                <input {...register("validate")} onChange={(e) => {
                }} type="radio" value="1" id="yes1" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-2" />
                <label htmlFor="yes1" className="mb-1">Oui</label>
              </div>
              <div className="flex justify-center items-center my-2">

                <input {...register("validate")} onChange={(e) => {
                }} type="radio" value="0" id="no1" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-2" />
                <label htmlFor="no1" className="mb-1">Non</label>
              </div>
            </div>
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
            {isSubmit && <CircularIndeterminate/>} <span>{data_props === null ? 'Ajouter':'Modifier' }</span>
          </Button>
        </div>

      </form>
    </div>
  );
};

export default AddAffiliation;
