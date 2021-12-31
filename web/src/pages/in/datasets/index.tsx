import ProtectedLayout from '@components/layouts/ProtectedLayout';
import DatasetsHome from '@components/datasets/DatasetsHome';
import Head from 'next/head';
import React from 'react'

const DatasetsPage = () => {
    return (
        <ProtectedLayout>
            <Head>
                <title>Datasets | Smart Annotations Interface</title>
            </Head>
            <DatasetsHome />
        </ProtectedLayout>
    )
}

export default DatasetsPage;
