import React from 'react'
import Head from "next/head";
import Link from 'next/link';
import axios from 'axios';
import HomeLayout from '@/components/core/home-layout'
import Barometer from '@/components/core/barometer'
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
                    <p className='text-2xl'>"Campagne 2024" Je fais ma part</p>

                </div>
                <Barometer/>
            </div>
        </HomeLayout>
    )
}

export default Campagne2024
