import { Skeleton } from '@mui/material';
import { setDatapoints__action, setDatasets__action } from '@redux/actions';
import { useReduxDispatch, useReduxSelector } from '@redux/hooks';
import { datapointsList__selector } from '@redux/selectors/datapoints.selector';
import React, { useEffect, useState } from 'react'
import { getDataPoints__api } from 'src/pages/api/data';
import { getDatasetById__api } from 'src/pages/api/datasets/[dataset_id]';
import DatapointsTable from './DatapointsTable';

type DatapointsTableContainerProps = {
    dataset_id: string | number;
    dataRefreshCounter: number;
}

const DatapointsTableContainer: React.FC<DatapointsTableContainerProps> = ({
    dataset_id,
    dataRefreshCounter
}) => {

    const dispatch = useReduxDispatch();

    const [dataLoading, setdataLoading] = useState(false);

    useEffect(() => {
        //TODO: fetch dataset metadata if not present and also data points
        (async function loadDataPoints() {
            setdataLoading(true);
            const { success, data } = await getDataPoints__api({
                dataset_id
            });
            if(success) {
                dispatch(setDatapoints__action(data));
            }
            setdataLoading(false);
        })();
        return () => {}
    }, [dataRefreshCounter]);

    useEffect(() => {
        (async function loadDatasetMetadata() {
            const { success, data } = await getDatasetById__api(dataset_id)
            if(success) {
                dispatch(setDatasets__action([data]));
            }
        })();   
    }, [dataRefreshCounter]);

    if(dataLoading) {
        return(
            <div className="block">
                <div className="flex flex-col">
                    <Skeleton 
                        width="100%"
                        height={64}
                    />
                    <Skeleton 
                        width="100%"
                        height={64}
                    />
                    <Skeleton 
                        width="100%"
                        height={64}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className="block">
            <DatapointsTable 
                dataset_id={dataset_id}
            />
        </div>
    )
}

export default DatapointsTableContainer;
