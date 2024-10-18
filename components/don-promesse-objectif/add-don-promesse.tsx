import { useState, useEffect } from "react";
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

type Option = {
    label: string;
    value: string;
}
type Inputs = {
    null?: string | number
    id?: number;
    don?: number;
    objectif?: number;
    promesse?: number;
    option?: Option | any;
    operation?: Option | any;
    dept_abbreviation: string;
};
type Props = {
    data_srv: any | null;
}
type PropsDetails ={
    description:string;
    value:number
    design:string;
}


const AddDonPromesse: React.FC<Props> = ({ data_srv }) => {
    const operationsOptions: Option[] = [
        {
            label: "Addition (+)",
            value: "addition"
        },
        {
            label: "Soustraction (-)",
            value: "soustraction"
        },
    ];
    const options: Option[] = [
        {
            label: "Don",
            value: "don"
        },
        {
            label: "Promesse",
            value: "promesse"
        },
        {
            label: "Objectif",
            value: "objectif"
        },
    ]
    const router = useRouter()
    const { register, handleSubmit, watch, reset, setValue, control, formState: { errors } } = useForm<Inputs>();
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<Option | any>(null)
    const [selectedOperation, setSelectedOperation] = useState<Option | any>(null)
    const [name, setName] = useState<"don" | "promesse" | "objectif" | "null">("null")
    const [responseError, setResponseError] = useState<any>(null);

const Details:React.FC<PropsDetails> = ({description, value, design})=>{
    return( <p className={`text-lg md:w-1/3 w-full ${design} p-4 rounded-lg text-center`}>
                    <span className="font-semibold">{description}:</span> <span>{value} $CA</span>
                </p>)
}

const resetData = ()=>{
    setSelectedOption(null)
    setSelectedOperation(null)
    reset()
}


    const updateDonPromesse = (data: Inputs) => {
        axios
            .post(`/api/don-promesse-objectif/ajouter-ou-enlever`, data)
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
                    router.push('/dashboard/don-promesse-objectif')
                    resetData();
                }

            })
            .catch((err) => {
                if (err.response.status === 400) {
                    setResponseError(err.response.data);
                }
                setIsSubmit(false);
            });


    };
    const createDonPromesse = (data: Inputs) => {

        axios.post(`/api/don-promesse-objectif`, data).then(response => {
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
                resetData();
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
        if (data_srv === null) {

            createDonPromesse(data);
        } else {
            data.id = data_srv.id
            if (selectedOperation !== null) {
                data.operation = selectedOperation.value
            }
            if (selectedOption !== null) {
                data.option = selectedOption.value
            }
            updateDonPromesse(data)
        }

    };

    return (
        <div className="container">
            {data_srv !== null &&<div className="block pt-8"><div className="flex gap-8 border-b-solid ">
                <Details description={'Objectif'} value={data_srv.objectif} design={'bg-green-500 text-white'}/>
                <Details description={'Don'} value={data_srv.don} design={'bg-blue-500 text-white'}/>
                <Details description={'Promesse'} value={data_srv.promesse} design={'bg-red-500 text-white'}/>

                </div>
                <hr className="my-4"/>
                </div>}
            <h1 className="font-bold text-sm md:text-lg capitalize mb-8">
                {data_srv === null ? 'Ajouter' : 'Modifier'}
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="center">
                {/* register your input into the hook by invoking the "register" function */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {data_srv === null ? <><div className="block">

                        <TextField
                            required
                            autoComplete="given-name"
                            fullWidth
                            size="small"
                            type="number"
                            id="objectif"
                            label="Montant de l'objectif en $CA"
                            {...register("objectif", { required: true })}
                        />
                        {responseError !== null && <Error text={responseError?.objectif} />}
                    </div>
                    </> : <>
                        <div className="flex-col flex z-40">
                            <label
                                className="mb-2"
                                htmlFor={`option`}
                            >
                                {" "}
                                Option<Star />{" "}
                            </label>
                            <Controller
                                name={`option`}
                                control={control}
                                rules={{
                                    required: true,
                                }}

                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        placeholder={
                                            "Choisir une option..."
                                        }
                                        isClearable
                                        options={options}
                                        value={selectedOption}
                                        onChange={e => {
                                            if (e !== null) {
                                                setName(e.value)
                                            }
                                            setValue("option", e)
                                            setSelectedOption(e)
                                            setSelectedOperation(null)
                                        }}
                                    />
                                )}
                            />{" "}

                        </div>
                        {
                            selectedOption && <><div className="flex-col flex z-30 ">
                                <label
                                    className="mb-2"
                                    htmlFor={`option`}
                                >
                                    {" "}
                                    Opération<Star />{" "}
                                </label>
                                <Controller
                                    name={`option`}
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}

                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            placeholder={
                                                "Choisir une opération..."
                                            }
                                            isClearable
                                            options={operationsOptions}
                                            value={selectedOperation}
                                            onChange={e => {
                                                setValue("operation", e)
                                                setSelectedOperation(e)
                                            }}
                                        />
                                    )}
                                />{" "}

                            </div>
                                <div className="block z-20">

                                    <TextField
                                        required
                                        autoComplete="given-name"
                                        fullWidth
                                        size="small"
                                        type="number"
                                        id={name}
                                        label="Saisir le montant en $CA"
                                        {...register(name, { required: true })}
                                    />
                                    {responseError !== null && <Error text={responseError?.objectif} />}
                                </div></>
                        }
                    </>}



                </div>
                <div className="flex justify-end flex-col mt-8 md:flex-row gap-8 mb-8">
                    {/* <Button
                        type="reset"
                        className="text-blue-600 border-blue-600 capitalize"
                        variant="outlined"
                    >
                        Reinitialiser
                    </Button> */}

                    <Button
                        disabled={isSubmit}
                        type="submit"
                        className="bg-blue-600 capitalize text-white flex items-center justify-center gap-x-2"
                        variant="contained"
                    >
                        {isSubmit && <CircularIndeterminate />} <span>{data_srv === null ? 'Ajouter' : 'Modifier'}</span>
                    </Button>
                </div>

            </form>
        </div>
    );
};

export default AddDonPromesse;
