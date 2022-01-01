import { Skeleton } from '@mui/material';
import { setDatapoints__action } from '@redux/actions';
import { useReduxDispatch, useReduxSelector } from '@redux/hooks';
import { datapointsList__selector } from '@redux/selectors/datapoints.selector';
import React, { useEffect, useState } from 'react'
import { getDataPoints__api } from 'src/pages/api/data';
import DatapointsTable from './DatapointsTable';

type DatapointsTableContainerProps = {
    dataset_id: string | number;
}

const DatapointsTableContainer: React.FC<DatapointsTableContainerProps> = ({
    dataset_id
}) => {

    const dispatch = useReduxDispatch();

    const [dataLoading, setdataLoading] = useState(false);

    useEffect(() => {
        //TODO: fetch dataset metadata if not present and also data points
        (async function loadDataPoints() {
            const { success, data } = await getDataPoints__api({
                dataset_id
            });
            if(success) {
                dispatch(setDatapoints__action(data));
            }
        })();
        return () => {}
    }, []);

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
            <DatapointsTable />
        </div>
    )
}

export default DatapointsTableContainer;