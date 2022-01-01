import { Checkbox } from '@mui/material';
import { useReduxSelector } from '@redux/hooks';
import { datapointsList__selector } from '@redux/selectors/datapoints.selector';
import React from 'react';

type DatapointsTableProps = {
    dataset_id?: string | number
}

const DatapointsTable: React.FC<DatapointsTableProps> = ({
    dataset_id
}) => {

    const datapointsForSelectedDataset = useReduxSelector(state => datapointsList__selector(state, dataset_id));

    return (
        <table className="table w-full">
            <thead>
                <tr className='flex flex-shrink-0 w-full items-center'>
                    <th
                        className="p-4 text-left max-w-min"
                    >
                        <Checkbox 
                            size="small"
                            color="warning"
                        />
                    </th>
                    <th
                        className="p-4 font-medium truncate text-left w-1/4"
                    >
                        ID
                    </th>
                    <th
                        className="p-4 font-medium truncate text-left w-1/4"
                    >
                        Tagged by
                    </th>
                    <th
                        className="p-4 font-medium truncate text-left w-1/4"
                    >
                        State
                    </th>
                    <th
                        className="p-4 font-medium truncate text-left w-1/4"
                    >
                        Audio
                    </th>
                </tr>
                <hr />
            </thead>
            <tbody>
                {
                    datapointsForSelectedDataset?.length ?
                    datapointsForSelectedDataset.map(datapoint => (
                        <tr
                            className="text-left hover:bg-gray-50"
                        >
                            <th>
                                <Checkbox 
                                    size="small"
                                    color="warning"
                                />
                            </th>
                            <th>
                                {datapoint?.id}
                            </th>
                            <th>
                                {datapoint?.tagged_by}
                            </th>
                            <th>
                                {datapoint?.state}
                            </th>
                        </tr>
                    ))
                        :
                    <tr
                        className="flex justify-center text-center bg-gray-50 p-4 text-gray-500"
                    >
                        No datapoins have been added yet,<br />
                        Click on Add / Import Data to add a new Data point.
                    </tr>
                }
            </tbody>
        </table>
    )
}

export default DatapointsTable;
