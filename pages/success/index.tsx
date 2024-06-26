import HomeLayout from '@/components/core/home-layout'
import Head from 'next/head'
import React from 'react'

const Page = () => {
    return (
        <HomeLayout>
            <Head>
                <title>Confirmation paiement paypal</title>
            </Head>
            <div className='flex items-center justify-center text-3xl mt-24 h-[70vh]'>Le paiement a été effectué avec succès!</div>
        </HomeLayout>
    )
}

export default Page
