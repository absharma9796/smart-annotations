import DatasetDetailsHome from '@components/datasets/detailedPageComponents/DatasetDetailsHome';
import ProtectedLayout from '@components/layouts/ProtectedLayout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

const DatasetDetailsPage = () => {

    const router = useRouter();

    const dataset_id = router?.query?.dataset_id as string;

    return (
        <div>
            <ProtectedLayout>
                <Head>
                    <title>Dataset - {dataset_id} | Smart Annotations Interface</title>
                </Head>
                <DatasetDetailsHome 
                    dataset_id={dataset_id}
                />
            </ProtectedLayout>
        </div>
    )
}

export default DatasetDetailsPage;
