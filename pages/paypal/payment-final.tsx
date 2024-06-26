import React from 'react'
import { Button } from '@mui/material'
import axios from 'axios'
type Props = {
    amount: number;
    data:any
}
const PaymentFinal: React.FC<Props> = ({ amount, data }) => {
    const handlePayment = async (e: any) => {
        console.log('hello')
        let res = await axios.post('/api/paypal', { amount , data})
        console.log(res)
        if (res && res.data) {
            let link = res.data.links[1].href
            window.location.href = link;
        }
        // e.preventDefault()

    }
    return (
        <div className='flex items-center justify-center'> <Button className='bg-blue-600 text-white' color='primary' onClick={handlePayment}>Payer Maintenant</Button></div>
    )
}

export default PaymentFinal
