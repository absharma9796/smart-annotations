import { Skeleton } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import DatapointsTableContainer from './datapointComponents/DatapointsTableContainer';
import DatasetActionButtonsPanel from './DatasetActionButtonsPanel';
import DatasetMetadataPanel from './DatasetMetadataPanel';
import ImportDataDialog from './dialogs/ImportDataDialog';

type DatasetDetailsHomeProps = {
    dataset_id?: string | number;
}

const DatasetDetailsHome: React.FC<DatasetDetailsHomeProps> = ({
    dataset_id,
    ...props
}) => {

    if(!dataset_id) {
        return (
            <main className='flex flex-col w-full'>
                <Skeleton 
                    width={"100%"}
                    height={200}
                />
            </main>
        )
    }

    return (
        <main className='flex flex-col w-full'>
            <div className="hero-section mt-5">
                <DatasetMetadataPanel 
                    dataset_id={dataset_id}
                />
                <hr />
            </div>
            {props?.children}
        </main>
    )
}

export default DatasetDetailsHome;
