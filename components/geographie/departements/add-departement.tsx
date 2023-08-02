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
import Star from "@/components/core/star";

type option = {
    label: string;
    value: string;
}
type Inputs = {
    libelle: string;
    dept_abbreviation: string;
    id_pays: option | string | any;
};
type Props = {
    data_props: any | null;
    pays: any
}


const AddDepartement: React.FC<Props> = ({ data_props, pays }) => {
    const router = useRouter()
    const { register, handleSubmit, watch, reset, setValue, control, formState: { errors } } = useForm<Inputs>();
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [responseError, setResponseError] = useState<any>(null);
    const [options, setOptions] = useState<option[] | null | any>();

    useEffect(() => {

        if (data_props !== null) {
            setValue('libelle', data_props?.libelle);
            setValue('dept_abbreviation', data_props?.dept_abbreviation);
            setValue('id_pays', {label: data_props?.libellePays, value:data_props?.paysId})

        }
    }, [])

    useEffect(() => {
        const tableOptions: option[] = [];
        pays?.sort((a:any, b:any) => {
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
        pays?.forEach((p:any )=> {
            tableOptions.push({
                label: p.libelle,
                value: p.id_pays
            })
        })

        setOptions(tableOptions);
    }, []);



    const updateDepartement = (data: Inputs) => {
        axios
            .put(`/api/departements/${data_props.id_departement}`, data)
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
                    router.push('/departements')
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
    const createDepartement = (data: Inputs) => {

        axios.post(`/api/departements`, data).then(response => {
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
                setValue('id_pays', null)
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
        data.id_pays = data.id_pays?.value
        if (data_props === null) {
            createDepartement(data);
        } else {
            updateDepartement(data)
        }

    };

    return (
        <div className="container">
            <h1 className="font-bold text-sm md:text-lg capitalize mb-8">
                {data_props === null ? 'Ajouter' : 'Modifier'} Département
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
                            label="Libelle département"
                            {...register("libelle", { required: true })}
                        />
                        {responseError !== null && <Error text={responseError?.libelle} />}
                    </div>


                    <TextField
                        required
                        autoComplete="given-name"
                        fullWidth
                        size="small"
                        id="dept_abbreviation"
                        label="Abréviation du département"
                        {...register("dept_abbreviation", { required: true })}
                    />
                    <div className="flex-col flex">
                        <label
                            className="mb-2"
                            htmlFor={`id_pays`}
                        >
                            {" "}
                            Pays<Star/>{" "}
                        </label>
                        <Controller
                            name={`id_pays`}
                            control={control}
                            rules={{
                                required: true,
                            }}

                            render={({ field }) => (
                                <Select
                                    {...field}
                                    placeholder={
                                        "Choisir le pays..."
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

export default AddDepartement;
