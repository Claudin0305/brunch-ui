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

type option = {
    label: string;
    value: string;
}
type Inputs = {
    montant_du: number;
    montant_paye: string;
    id_statut: option | string | any;
    id_devise: option | string | any;
    id_participant: option | string | any;
};
type Props = {
    data_props: any | null;
    devises: any;
    statuts: any;
    participants: any;
}


const AddPaiement: React.FC<Props> = ({ data_props, devises, statuts, participants }) => {
    const router = useRouter()
    const { register, handleSubmit, watch, reset, setValue, control, formState: { errors } } = useForm<Inputs>();
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [responseError, setResponseError] = useState<any>(null);
    const [options, setOptions] = useState<option[] | null | any>();
    const [optionDevises, setOptionDevises] = useState<option[] | null | any>();
    const [optionStatuts, setOptionStatuts] = useState<option[] | null | any>();

    useEffect(() => {

        if (data_props !== null) {
            setValue('montant_du', data_props?.montant_du);
            setValue('montant_paye', data_props?.montant_paye);
            // setValue('id_pays', {label: data_props?.libellePays, value:data_props?.paysId})

        }
    }, [])

    useEffect(() => {
        const tableOptions: option[] = [];
        devises?.sort((a:any, b:any) => {
            let fa = a.devise.toLowerCase(),
                fb = b.devise.toLowerCase();

            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        });
        devises?.forEach((p:any )=> {
            tableOptions.push({
                label: p.devise,
                value: p.id_devise
            })
        })

        setOptionDevises(tableOptions);
        const tableOptionStatuts: option[] = [];
        statuts?.sort((a:any, b:any) => {
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
        statuts?.forEach((p:any )=> {
            tableOptions.push({
                label: p.libelle,
                value: p.id_statut
            })
        })

        setOptionStatuts(tableOptionStatuts);
        const tableOptionParticipants: option[] = [];
        participants?.sort((a:any, b:any) => {
            let fa = a.prenom.toLowerCase(),
                fb = b.prenom.toLowerCase();

            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        });
        participants?.forEach((p:any )=> {
            tableOptionParticipants.push({
                label: `${p.prenom} ${p.nom} ${p.email}`,
                value: p.id_participant
            })
        })

        setOptions(tableOptionParticipants);
    }, []);



    const updatePaiement = (data: Inputs) => {
        axios
            .put(`/api/paiement-repas/${data_props.paiement}`, data)
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
                    router.push('/paiement-repas')
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
    const createPaiement = (data: Inputs) => {

        axios.post(`/api/paiement-repas`, data).then(response => {
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
                setValue('id_devise', null)
                setValue('id_participant', null)
                setValue('id_statut', null)
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
        data.id_devise = data.id_devise?.value
        data.id_participant = data.id_participant?.value
        data.id_statut = data.id_statut?.value
        if (data_props === null) {
            createPaiement(data);
        } else {
            updatePaiement(data)
        }

    };

    return (
        <div className="container">
            <h1 className="font-bold text-sm md:text-lg capitalize mb-8">
                {data_props === null ? 'Ajouter' : 'Modifier'} Paiement
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="center">
                {/* register your input into the hook by invoking the "register" function */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex-col flex z-50">
                        <label
                            className="mb-2"
                            htmlFor={`id_participant`}
                        >
                            {" "}
                            Participant<Star/>{" "}
                        </label>
                        <Controller
                            name={`id_participant`}
                            control={control}
                            rules={{
                                required: true,
                            }}

                            render={({ field }) => (
                                <Select
                                    {...field}
                                    placeholder={
                                        "Choisir le participant..."
                                    }
                                    isClearable
                                    options={options}
                                />
                            )}
                        />{" "}

                    </div>
                    <div className="flex-col flex z-40">
                        <label
                            className="mb-2"
                            htmlFor={`id_statut`}
                        >
                            {" "}
                            Statut<Star/>{" "}
                        </label>
                        <Controller
                            name={`id_statut`}
                            control={control}
                            rules={{
                                required: true,
                            }}

                            render={({ field }) => (
                                <Select
                                    {...field}
                                    placeholder={
                                        "Choisir le statut..."
                                    }
                                    isClearable
                                    options={optionStatuts}
                                />
                            )}
                        />{" "}

                    </div>
                    <div className="flex-col flex z-30">
                        <label
                            className="mb-2"
                            htmlFor={`id_devise`}
                        >
                            {" "}
                            Devise<Star/>{" "}
                        </label>
                        <Controller
                            name={`id_devise`}
                            control={control}
                            rules={{
                                required: true,
                            }}

                            render={({ field }) => (
                                <Select
                                    {...field}
                                    placeholder={
                                        "Choisir la devise..."
                                    }
                                    isClearable
                                    options={optionDevises}
                                />
                            )}
                        />{" "}

                    </div>
                    <div className="block md:mt-8 z-20">

                        <TextField
                            required
                            autoComplete="given-name"
                            fullWidth
                            size="small"
                            id="libelle"
                            label="Montant dû"
                            {...register("montant_du", { required: true })}
                        />
                        {responseError !== null && <Error text={responseError?.montant_du} />}
                    </div>
                    <div className="block">

                        <TextField
                            required
                            autoComplete="given-name"
                            fullWidth
                            size="small"
                            id="libelle"
                            label="Montant payer"
                            {...register("montant_paye", { required: true })}
                        />
                        {responseError !== null && <Error text={responseError?.montant_paye} />}
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

export default AddPaiement;
