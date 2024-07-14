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
    details?: any
}
type Inputs = {
    montant_du: number;
    montant_paye: number;
    don: number;
    id_statut: option | string | any;
    id_devise: option | string | any;
    id_event: option | string | any;
    id_participant: option | string | any;
    mode_paiement: option | string | any;
};
type Props = {
    data_props: any | null;
    devises: any;
    statuts: any;
    participants: any;
    event?: any;
}
type optionEvent = {
    label: string;
    value: string;
    participant: option[] | any;
}
type detailMontant = {
    for_me?: number;
    for_me_and_other?: number;
    for_other?: number;
    nb_incrits?: number;
    devise?: string
}
const modePaimentOption: option[] = [
    {
        label: "DIFFERE",
        value: "DIFFERE",
    },
    {
        label: 'IMMEDIAT',
        value: 'IMMEDIAT'

    }
]
const AddPaiement: React.FC<Props> = ({ data_props, devises, statuts, event, participants }) => {
    const router = useRouter()
    const { register, handleSubmit, watch, reset, setValue, control, formState: { errors } } = useForm<Inputs>();
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [responseError, setResponseError] = useState<any>(null);
    const [options, setOptions] = useState<option[] | null | any>();
    const [optionDevises, setOptionDevises] = useState<option[] | null | any>();
    const [optionStatuts, setOptionStatuts] = useState<option[] | null | any>();
    const [errorMontant, setErrorMontant] = useState<boolean>(false);
    const [selectedEvent, setSelectedEvent] = useState<optionEvent | any>(null);
    const [selectedParticipant, setSelectedParticipant] = useState<option | null>(null)
    const [isRequired, setIsRequired] = useState<boolean>(false);
    const [optionEvent, setOptionEvent] = useState<optionEvent[] | null | any>();
    const [details, setDetails] = useState<detailMontant | any>(null)

    useEffect(() => {

        if (data_props !== null) {
            setValue('montant_du', data_props?.montant_du);
            setValue('montant_paye', data_props?.montant_paye);
            // setValue('id_pays', {label: data_props?.libellePays, value:data_props?.paysId})

        }
    }, [])
    const resetData = ()=>{
        reset();
        setSelectedEvent(null)
        setSelectedParticipant(null)
        setDetails(null)
    }
    useEffect(() => {
        if (selectedParticipant !== null) {
            const montant_du: number = selectedParticipant.details.montant_participation;
            const devise: string = selectedParticipant.details.devise
            const username: string = selectedParticipant.details.username
            const result = selectedEvent?.participant?.filter((p: any) => p.details.username === username);
            let s: number = 0;

            if (result.lenght > 0) {
                result.forEach((p: any) => {
                    if (p?.montant_participation !== null && p?.montant_participation > 0) {
                        s += p.montant_participation
                    }
                })
            }
            setIsRequired(montant_du + s > 0)

            setDetails({
                for_me: montant_du,
                for_me_and_other: montant_du + s,
                for_other: s,
                nb_incrits: result.lenght,
                devise
            })
        }
    }, [selectedParticipant, selectedEvent])
    console.log(selectedParticipant)
    useEffect(() => {
        const tableOptions: option[] = [];
        devises?.sort((a: any, b: any) => {
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
        devises?.forEach((p: any) => {
            tableOptions.push({
                label: p.devise,
                value: p.id_devise
            })
        })

        setOptionDevises(tableOptions);
        const tableOptionStatuts: option[] = [];
        statuts?.sort((a: any, b: any) => {
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
        statuts?.forEach((p: any) => {
            tableOptionStatuts.push({
                label: p.libelle,
                value: p.id_statut
            })
        })

        setOptionStatuts(tableOptionStatuts);
        const tableOptionParticipants: option[] = [];
        // participants?.sort((a: any, b: any) => {
        //     let fa = a.prenom.toLowerCase(),
        //         fb = b.prenom.toLowerCase();

        //     if (fa < fb) {
        //         return -1;
        //     }
        //     if (fa > fb) {
        //         return 1;
        //     }
        //     return 0;
        // });
        // participants?.forEach((p: any) => {
        //     tableOptionParticipants.push({
        //         label: `${p.prenom} ${p.nom} ${p.email}`,
        //         value: p.id_participant
        //     })
        // })

        // setOptions(tableOptionParticipants);

        const tableOptionEvent: optionEvent[] = []
        event?.forEach((e: any) => {
            const participant_list = participants?.filter((p: any) => p.idEvent === e.id_event && p.mode_participation	!=="DISTANCIEL" && p.paiementRepas.length==0)
            participant_list?.forEach((p: any) => {
                // console.log(p.paiementRepas.length)
                tableOptionParticipants.push({
                    label: `${p.prenom} ${p.nom} ${p.email}`,
                    value: p.id_participant,
                    details: p
                })
            })
            tableOptionParticipants.sort((a: any, b: any) => {
                let fa = a.label,
                    fb = b.label;

                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            });
            // console.log(tableOptionParticipants)
            tableOptionEvent.push({
                value: e.id_event,
                label: `${e.eventType}-${e.date_fin.split('-')[0]}`,
                participant: tableOptionParticipants
            })
        })
        // console.log(tableOptionEvent)
        setOptionEvent(tableOptionEvent)

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
                resetData();
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
    const Span: React.FC<{ name: string, value: string }> = ({ name, value }) => {
        return <div className="grid grid-cols-2 gap-1">
            <span className="font-semibold">{name}:</span><span>{value}</span>
        </div>
    }
    const onSubmit: SubmitHandler<Inputs> = data => {
        // console.log(data)

        setIsSubmit(true);
        data.id_devise = data.id_devise?.value
        data.id_participant = data.id_participant?.value
        data.id_statut = data.id_statut?.value
        data.mode_paiement = data.mode_paiement?.value
        data.montant_du = details?.for_me_and_other
        if (data.montant_paye > details?.for_me_and_other) {
            setErrorMontant(true);
        } else {

            if (data_props === null) {
                createPaiement(data);
            } else {
                updatePaiement(data)
            }
            setErrorMontant(false);
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
                            htmlFor={`id_event`}
                        >
                            {" "}
                            Evenement<Star />{" "}
                        </label>
                        <Controller
                            name={`id_event`}
                            control={control}
                            rules={{
                                required: true,
                            }}

                            render={({ field }) => (
                                <Select
                                    {...field}
                                    placeholder={
                                        "Choisir l'evenement..."
                                    }
                                    isClearable
                                    options={optionEvent}
                                    value={selectedEvent}
                                    onChange={e => {
                                        setSelectedEvent(e);
                                        setValue('id_event', e)
                                        if (e === null) {
                                            setSelectedParticipant(null)
                                            setDetails(null)
                                        }

                                            // register('id_event').onChange(e)
                                    }}
                                />
                            )}
                        />{" "}

                    </div>
                    {selectedEvent && <>
                        <div className="flex-col flex z-50">
                            <label
                                className="mb-2"
                                htmlFor={`id_participant`}
                            >
                                {" "}
                                Participant<Star />{" "}
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
                                        options={selectedEvent.participant}
                                        value={selectedParticipant}
                                        onChange={e => {
                                            // console.log(e)
                                            setSelectedParticipant(e);
                                            // register('id_participant').onChange(e)
                                            setValue('id_participant', e)
                                        }}
                                    />
                                )}
                            />{" "}

                        </div>
                        {selectedParticipant && <>
                            <div className="md:col-span-2">
                                <h3 className="text-center font-semibold text-2xl mb-4">Détails sur le participant</h3>
                                <hr />
                                <div className="grid gap-8 md:grid-cols-4 grid-cols-1">
                                    <Span name="Prénom" value={selectedParticipant?.details?.prenom} />
                                    <Span name="Nom" value={selectedParticipant?.details?.nom} />
                                    {/* <Span name="Email" value={selectedParticipant?.details?.email} /> */}
                                    {details && <>
                                        <Span name="NB pers. inscrit" value={details?.nb_inscrit} />
                                        <Span name="Montant dû" value={`${details?.for_me} ${details?.devise}`} />
                                    </>}

                                </div>
                                <h3 className="text-center font-semibold text-2xl mb-4">Information du paiement</h3>
                                <hr />
                            </div>
                            <div className="flex-col flex z-40">
                                <label
                                    className="mb-2"
                                    htmlFor={`id_statut`}
                                >
                                    {" "}
                                    Statut<Star />{" "}
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
                                    Devise<Star />{" "}
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
                            <div className="flex-col flex z-30">
                                <label
                                    className="mb-2"
                                    htmlFor={`mode_paiement`}
                                >
                                    {" "}
                                    Mode paiement<Star />{" "}
                                </label>
                                <Controller
                                    name={`mode_paiement`}
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}

                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            placeholder={
                                                "Choisir le mode de paiement..."
                                            }
                                            isClearable
                                            options={modePaimentOption}
                                        />
                                    )}
                                />{" "}

                            </div>
                            <div className="block md:mt-8">

                                <TextField
                                    required={isRequired}
                                    autoComplete="given-name"
                                    fullWidth
                                    size="small"
                                    id="montant_paye"
                                    label="Montant payé"
                                    {...register("montant_paye", { required: true })}
                                />
                                {responseError !== null && <Error text={responseError?.montant_paye} />}
                            </div>
                            <div className="block">

                                <TextField
                                    autoComplete="given-name"
                                    fullWidth
                                    size="small"
                                    id="don"
                                    label="Don"
                                    {...register("don", { required: false })}
                                />
                                {responseError !== null && <Error text={responseError?.don} />}
                            </div>
                        </>}
                    </>}



                </div>
                {selectedEvent && selectedParticipant && <div className="flex justify-end flex-col mt-8 md:flex-row gap-8 mb-8">
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
                </div>}


            </form>
        </div>
    );
};

export default AddPaiement;
