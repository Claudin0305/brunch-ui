import  { useState, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Swal from 'sweetalert2'
import CircularIndeterminate from "@/components/core/circular-indeterminate";
import Error from "@/components/core/error";
import axios from 'axios';
import { useRouter } from 'next/router'
import Star from "../core/star";


type Inputs = {
  password: string;
  c_password: string;
};
type Props = {
  data_props: any | null
}


const ResetUtilisateur: React.FC<Props> = ({data_props}) => {
    // const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }));

    const router = useRouter()
    const { register, handleSubmit, watch, reset, setValue, control, formState: { errors } } = useForm<Inputs>();
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [responseError, setResponseError] = useState<any>(null);
  const [identiquePassword, setIdentiquePassword] = useState<boolean>(true);
  const [password, setPassword] = useState<null | string>(null)





    const updateUtilisateur = (data: Inputs) => {
        axios
            .put(`/api/users/reset/${data_props.id}`, data)
            .then((response) => {
                if (response.status === 200) {

                    setIsSubmit(false);
                    Swal.fire({
                        // position: 'top-end',
                        icon: 'success',
                        title: 'Réinitialisation effectuée!',

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

    const onSubmit: SubmitHandler<Inputs> = data => {


        setIsSubmit(true);


            updateUtilisateur({...data})


    };

    return (
        <div className="container">
            <h1 className="font-bold text-sm md:text-lg capitalize mb-8">
                Réinitialiser mot de passe Utilisateur
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="center">
                {/* register your input into the hook by invoking the "register" function */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">


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
                        {isSubmit && <CircularIndeterminate />} <span>Modifier</span>
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ResetUtilisateur;
