import React from 'react'
import Head from "next/head";
import Link from 'next/link';
import axios from 'axios';
import HomeLayout from '@/components/core/home-layout'
import Barometer from '@/components/core/barometer'
import Button from "@mui/material/Button";
type Props = {
    data: any
}
const Campagne2024:React.FC<Props> = ({data}) => {
    return (
        <HomeLayout>
            <Head>
                <title>Campagne 2024</title>
            </Head>
            <div className="px-8 md:px-32 mx-auto md:mt-32 mt-16 mb-32">
                <div className='text-center mb-8 mt-40'>
                    <p className='font-bold text-md md:text-2xl capitalize text-center text-blue-500'>"Campagne 2024" Je fais ma part</p>

<div className="flex flex-col space-y-8 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
     <a  href={'https://www.zeffy.com/donation-form/56c2d8e2-95e7-4776-835c-7fed3405bd11 '} target="_blank" className="w-full">
                                <Button className="bg-blue-500 capitalize w-full" variant="contained">Faire un don</Button>
                            </a>
     <a  href={'https://foof90mb.forms.app/jefaismapart2024 '} target="_blank" className="w-full">
                                <Button className="bg-blue-500 capitalize w-full" variant="contained">Faire une promesse de don</Button>
                            </a>
</div>
                </div>
                <Barometer/>
            </div>
        </HomeLayout>
    )
}

export default Campagne2024
