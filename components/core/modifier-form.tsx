import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Swal from 'sweetalert2'
import CircularIndeterminate from "@/components/core/circular-indeterminate";
import Error from "@/components/core/error";
import axios from 'axios';
import { useRouter } from 'next/router'
import Router from 'next/router';


type Inputs = {
    username: string;
};


const UpdateInscription: React.FC = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>();
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const router = useRouter()
    const [responseError, setResponseError] = useState<any>(null);


    const updateForm = (data: Inputs) => {

        axios.get(`/api/inscriptions/update/${data.username}`).then(response => {
            if (response.status === 200) {

                if(response.data.data !== ""){
                    // axios.post(`/inscriptions/edit/${response.data.idEvent}/${response.data.username}`).then(response=>{
                    //     console.log('test')
                    // })

                    router.push(`/inscriptions/edit/${response.data.data.idEvent}/${response.data.data.username}`)
                }else{
                    Swal.fire({
                    // position: 'top-end',
                    icon: 'error',
                    title: 'Dossier introuvable!',
                    // showConfirmButton: false,
                    // timer: 1500
                    // buttonColor:"#000000",
                    // buttons:[""]
                    confirmButtonColor: "#2563eb",
                    confirmButtonText: "Fermer",
                })
                }
                setIsSubmit(false);
                // reset();
            }
        }).catch(err => {
            setIsSubmit(false);
            if (err.response.status === 400) {
                setResponseError(err.response.data);
                // console.log(responseError)
                //sweal error
            }
            Swal.fire({
                    // position: 'top-end',
                    icon: 'error',
                    title: 'Dossier introuvable!',
                    // showConfirmButton: false,
                    // timer: 1500
                    // buttonColor:"#000000",
                    // buttons:[""]
                    confirmButtonColor: "#2563eb",
                    confirmButtonText: "Fermer",
                })
                router.push('/')
        })


    };
    const onSubmit: SubmitHandler<Inputs> = data => {
        // console.log(data)

        setIsSubmit(true);

            updateForm(data);


    };

    return (
        <div className="container">
            <h1 className="font-bold text-sm md:text-lg capitalize mb-8">
                Modifier Inscription
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
                            id="username"
                            label="Numéro de dossier"
                            {...register("username", { required: 'Ce champ est obligatoire' })}
                        />
                        {responseError !== null && <Error text={responseError?.username} />}
                        {errors?.username && <Error text={errors.username.message} />}
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
                        {isSubmit && <CircularIndeterminate />} <span>Modifier Inscription</span>
                    </Button>
                </div>

            </form>
        </div>
    );
};

export default UpdateInscription;
