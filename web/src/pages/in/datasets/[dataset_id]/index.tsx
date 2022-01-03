import DatapointsTableContainer from '@components/datasets/detailedPageComponents/datapointComponents/DatapointsTableContainer';
import DatasetActionButtonsPanel from '@components/datasets/detailedPageComponents/DatasetActionButtonsPanel';
import DatasetDetailsLayout from '@components/datasets/detailedPageComponents/DatasetDetailsLayout';
import ImportDataDialog from '@components/datasets/detailedPageComponents/dialogs/ImportDataDialog';
import ProtectedLayout from '@components/layouts/ProtectedLayout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const DatasetDetailsPage = () => {

    const router = useRouter();

    const dataset_id = router?.query?.dataset_id as string;

    const [importDialogOpen, setimportDialogOpen] = useState(false);
    const [dataRefreshCounter, setdataRefreshCounter] = useState(0);

    return (
        <ProtectedLayout>
            <Head>
                <title>Dataset - {dataset_id} | Smart Annotations Interface</title>
            </Head>
            <DatasetDetailsLayout 
                dataset_id={dataset_id}
            >
                <DatasetActionButtonsPanel 
                    onImportClick={() => setimportDialogOpen(true)}
                    onRefreshClick={() => setdataRefreshCounter(prev => prev + 1)}
                    onStartLabelingClick={() => router.push(`/in/datasets/${dataset_id}/label`)}
            />
                <hr />
                <DatapointsTableContainer 
                    dataset_id={dataset_id}
                    dataRefreshCounter={dataRefreshCounter}
                />
                {
                    importDialogOpen &&
                    <ImportDataDialog 
                        isOpen={importDialogOpen}
                        onClose={() => {setimportDialogOpen(false); setdataRefreshCounter(prev => prev + 1);}}
                        dataset_id={dataset_id}
                    />
                }
            </DatasetDetailsLayout>
        </ProtectedLayout>
    )
}

export default DatasetDetailsPage;
