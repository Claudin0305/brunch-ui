
import Head from "next/head";
import React from "react";
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Button from '@mui/material/Button';
import HomeLayout from '@/components/core/home-layout'
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import Error from "@/components/core/error";
import axios from "axios";
import Star from "@/components/core/star";
import PaymentButton from './payment';
import PaymentFinal from "./payment-final";
type Inputs = {
    info: any,
    montant: any
};

const Page: React.FC = () => {
    const steps = ['Informations participants', 'Fecapitulatif montant', 'Paiement'];
    const [activeStep, setActiveStep] = React.useState(0);
    const [errorRes, setErrorRes] = React.useState<any>(null)
    const [errorRequired, setErrorRequired] = React.useState<boolean>(false);
    const [errorRequired2, setErrorRequired2] = React.useState<boolean>(false);
    const [errorNotFound, setErrorNotFound] = React.useState<boolean>(false);
    const [montant, setMontant] = React.useState<number>(0);
    const [data, setData] = React.useState<any>();
    const getData = async (info: string) => {
        return axios.get(`${process.env.base_route}/participants/find/${info}`)

    }
    const resetData = () => {
        reset();
        setActiveStep(0)
        setMontant(0)
        setErrorNotFound(false);
        setErrorRequired(false);
        setErrorRequired2(false);
        setErrorRes(null)
    }
    const handleNext = async () => {
        if (activeStep === 0) {
            const info = getValues('info')

            if (info !== "") {
                setErrorRequired(false)
                try {
                    const response = await getData(info)
                    if (response.status === 200) {
                        setData(response.data)
                        setMontant(response.data?.participant?.montant_participation)
                        console.log(data)
                        setErrorNotFound(false)
                        console.log(response.data)
                        setActiveStep(activeStep + 1)
                    }

                } catch (error: any) {
                    if (error?.response?.status === 404) {
                        setErrorNotFound(true)
                    }
                    if (error?.response?.status === 400) {
                        setErrorRes(error?.response?.data)
                        // console.log(error)
                        // setErrorNotFound(true)
                    }
                    console.log(error)
                }

            } else {
                setErrorRequired(true)
                setErrorNotFound(false)
            }
        } else if (activeStep === 1) {
            const sold = getValues('montant')
            console.log(sold)
            if (sold !== null) {
                setMontant(sold)
                setActiveStep(activeStep + 1)
            } else {
                setErrorRequired2(true)
            }
        } else {
            setActiveStep(activeStep + 1)
        }
    };
    const handleBack = () => setActiveStep(activeStep - 1);
    const { register, handleSubmit, watch, reset, setValue, getValues, control, formState: { errors } } = useForm<Inputs>();
    const StepOne: React.FC = () => {
        return (

            <div className="block">
                <TextField
                    required
                    autoComplete="given-name"
                    fullWidth
                    id="info"
                    size="small"
                    type="text"
                    label="Email, ou username, ou téléphone"
                    {...register("info")}
                    className=""

                />
                {errorRequired && <Error text={'Ce champ est obligatoire!'} />}
                {errorNotFound && <Error text={'Participant introuvable!'} />}
                {errorRes && <Error text={errorRes.participant} />}
            </div>
        )
    }
    const StepTwo: React.FC = () => {
        return (
            <div className="block">
                <p className="mb-4">Pour qui voulez-vous payer? <Star /></p>
                <input {...register("montant")} type="radio" value={montant} id="me" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-2" />
                <label htmlFor="me" className="mb-1 mt-8">Pour moi <span className="font-semibold">({montant} {data?.participant?.devise})</span></label>
                {errorRequired2 && <div className="block">
                    <Error text={'Ce champ est obligatoire!'} />
                </div>}
            </div>
        )
    }
    const StepThree: React.FC = () => {
        return (
            <div>
                {/* <PaymentButton amount={montant} /> */}
                <PaymentFinal amount={montant} data={data} />
            </div>
        )
    }
    return (
        <HomeLayout>
            <Head>
                <title>Effectuer un paiement via PayPal</title>
            </Head>
            <div className="px-4 md:px-32 mx-auto md:mt-32 mt-16 mb-32">
                <h1 className="font-bold text-sm md:text-lg capitalize mb-4">
                    Effectuer un paiement via paypal
                </h1>
                <div className="">
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <div className="block p-8">
                        <form className="center">

                            {activeStep === 0 && <StepOne />}
                            {activeStep === 1 && <StepTwo />}
                            {activeStep === 2 && <StepThree />}
                        </form>
                        <div className="flex items-center justify-start mt-8">
                            <Button variant="contained" onClick={resetData} className={`bg-red-600 text-white `}>Reinitialiser</Button>
                        </div>
                    </div>
                    <div className="flex justify-between mt-16">
                        <Button variant="contained" className={`bg-blue-500 ${activeStep === 0 ? "bg-gray-200 text-gray-900" : "text-white"} `} disabled={activeStep === 0} onClick={handleBack}>
                            Retour
                        </Button>
                        {activeStep !== steps.length - 1 && (
                            <Button variant="contained" className="text-white bg-blue-500" onClick={handleNext}>
                                Suivant
                            </Button>
                        )}
                    </div>
                </div>

            </div>


        </HomeLayout>
    );
};


export default Page;
