import React, { useState } from 'react'
import { Button } from '@mui/material'
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Select from 'react-select';
import axios from 'axios'
type Props = {
    amount: number;
    data: any
}
type Inputs = {
    don: option | any
}
type option = {
    label: string;
    value: number;
}
const PaymentFinal: React.FC<Props> = ({ amount, data }) => {
    // console.log(amount)
    const { register, handleSubmit, watch, reset, setValue, getValues, control, formState: { errors } } = useForm<Inputs>();
    const [montantDon, setMontantDon] = useState<number>(0);
    const [seletedOption, setSelectedOption] = useState<any | option>(null)
    const options: option[] = [
        {
            label: "10",
            value: 10
        },
        {
            label: "20",
            value: 20
        },
        {
            label: "50",
            value: 50
        },
        {
            label: "100",
            value: 100
        },
    ]
    const handlePayment = async (e: any) => {
        // console.log('hello')
        // console.log(+(amount) + montantDon)
        let res = await axios.post('/api/paypal', { amount:( +(amount) + montantDon), data })
        if (res && res.data) {
            let link = res.data.links[1].href
            window.location.href = link;
        }
        // e.preventDefault()

    }
    return (
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
            <div className="block">
                <label
                    className="mb"
                    htmlFor={`don`}
                >
                    {" "}
                    Faire un don (en $ USD et optionnel)
                </label>


                <div className="flex-col mt-4">

                    <Controller
                        name={`don`}
                        control={control}

                        render={({ field }) => (
                            <Select
                                {...field}
                                placeholder={
                                    "Choisir le montant..."
                                }
                                isClearable
                                options={options}
                                value={seletedOption}
                                onChange={e => {
                                    setSelectedOption(e)
                                    // console.log(e)
                                    if (e !== null) {
                                        setMontantDon(parseFloat(e.value))
                                    } else {
                                        setMontantDon(0)
                                    }
                                    setValue('don', e)
                                }}
                            />
                        )}
                    />{" "}

                </div>
            </div>
            <div className="block md:mt-10">

                <Button className='bg-blue-600 text-white' color='primary' onClick={handlePayment}>Payer Maintenant</Button></div>
        </div>
    )
}

export default PaymentFinal
