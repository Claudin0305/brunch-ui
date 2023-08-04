import  { useState, useEffect } from "react";
import { useForm, SubmitHandler} from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Swal from 'sweetalert2'
import CircularIndeterminate from "@/components/core/circular-indeterminate";
import Error from "@/components/core/error";
import axios from 'axios';
import { useRouter } from 'next/router'


type Inputs = {
          libelle:string;
            pays_abbreviation:string;
};
type Props = {
data_props: any | null;
}

const AddPays: React.FC<Props> = ({data_props}) => {
  const router = useRouter()
  const { register, handleSubmit, watch, reset, setValue, control, formState: { errors } } = useForm<Inputs>();
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const [responseError, setResponseError] = useState<any>(null);
  useEffect(()=>{

    if(data_props !== null){
      setValue('libelle', data_props.libelle);
      setValue('pays_abbreviation', data_props.pays_abbreviation);

    }
  },[])



   const updatePays = (data:Inputs) => {
    axios
        .put(`/api/pays/${data_props.id_pays}`, data)
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
        router.push('/pays')
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
   const createPays =  (data:Inputs) => {

  axios.post(`/api/pays`, data).then(response=>{
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
      createPays(data);
    }else{
      updatePays(data)
    }

  };

  return (
    <div className="container">
      <h1 className="font-bold text-sm md:text-lg capitalize mb-8">
        {data_props === null ? 'Ajouter':'Modifier'} Pays
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
            id="libelle"
            label="Libelle pays"
            {...register("libelle", { required: true })}
          />
          {responseError !== null && <Error text={responseError?.libelle}/>}
          </div>


          <TextField
            required
            autoComplete="given-name"
            fullWidth
            size="small"
            id="pays_abbreviation"
            label="Abréviation du pays"
            {...register("pays_abbreviation", { required: true })}
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

export default AddPays;
