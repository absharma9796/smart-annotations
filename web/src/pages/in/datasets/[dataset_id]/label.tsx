import Head from 'next/head';
import React from 'react';
import ProtectedLayout from '@components/layouts/ProtectedLayout';
import DatasetDetailsLayout from '@components/datasets/detailedPageComponents/DatasetDetailsLayout';
import { useRouter } from 'next/router';
import DatasetLabelingHome from '@components/datasets/labelingPageComponents/DatasetLabelingHome';

const DataLabellingPage = () => {

    const router = useRouter();

    const dataset_id = router?.query?.dataset_id as string;


    return (
        <ProtectedLayout>
            <Head>
                <title>Label Dataset - {dataset_id} | Smart Annotations Interface</title>
            </Head>
            <DatasetDetailsLayout 
                dataset_id={dataset_id}
            >
                <DatasetLabelingHome 
                    dataset_id={dataset_id}
                />
            </DatasetDetailsLayout>
        </ProtectedLayout>
    )
}

export default DataLabellingPage;
