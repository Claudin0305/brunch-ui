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

type option = {
    label: string;
    value: string;
}
type Inputs = {
    libelle: string;
    id_departement: option | string | any;
};
type Props = {
    data_props: any | null;
    departements: any
}


const AddVille: React.FC<Props> = ({ data_props, departements }) => {
    const router = useRouter()
    const { register, handleSubmit, watch, reset, setValue, control, formState: { errors } } = useForm<Inputs>();
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [responseError, setResponseError] = useState<any>(null);
    const [options, setOptions] = useState<option[] | any>();

    useEffect(() => {

        if (data_props !== null) {
            setValue('libelle', data_props?.libelle);
            setValue('id_departement', {label: data_props?.libelleDepartement, value:data_props?.departementId})

        }
    }, [])

    useEffect(() => {
        const tableOptions: option[] = [];
        departements?.sort((a:any, b:any) => {
            let fa = a.libelle.toLowerCase(),
                fb = b.libelle.toLowerCase();

            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        });
        departements?.forEach((p:any) => {
            tableOptions.push({
                label: p.libelle,
                value: p.id_departement
            })
        })

        setOptions(tableOptions);
    }, []);



    const updateVille = (data: Inputs | FormData) => {
        axios
            .put(`${process.env.base_route}/villes/${data_props.id_ville}`, data)
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
                    router.push('/villes')

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
    const createVille = (data: Inputs |FormData) => {

        axios.post(`${process.env.base_route}/villes`, data).then(response => {
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
                reset();
                setValue('id_departement', null)
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

        setIsSubmit(true);
        data.id_departement = data.id_departement?.value
        const formData = new FormData();
        formData.append('libelle', data.libelle);
        formData.append('id_departement', data.id_departement)
        if (data_props === null) {
            createVille(formData);
        } else {
            updateVille(formData)
        }

    };

    return (
        <div className="container">
            <h1 className="font-bold text-sm md:text-lg capitalize mb-8">
                {data_props === null ? 'Ajouter' : 'Modifier'} Ville
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="center">
                {/* register your input into the hook by invoking the "register" function */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="block">

                        <TextField
                            required
                            autoComplete="given-name"
                            fullWidth
                            id="libelle"
                            size="small"
                            label="Libelle ville"
                            {...register("libelle", { required: true })}
                        />
                        {responseError !== null && <Error text={responseError?.libelle} />}
                    </div>


                    <div className="flex-col flex md:-mt-8">
                        <label
                            className="mb-2"
                            htmlFor={`id_departement`}
                        >
                            {" "}
                            Département*{" "}
                        </label>
                        <Controller
                            name={`id_departement`}
                            control={control}
                            rules={{
                                required: true,
                            }}

                            render={({ field }) => (
                                <Select
                                    {...field}
                                    placeholder={
                                        "Choisir le département..."
                                    }
                                    isClearable
                                    options={options}
                                />
                            )}
                        />{" "}

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

export default AddVille;
