import { PlayArrowRounded } from '@mui/icons-material';
import { Button, Checkbox } from '@mui/material';
import { useReduxSelector } from '@redux/hooks';
import { datapointsList__selector } from '@redux/selectors/datapoints.selector';
import React, { useState } from 'react';

type DatapointsTableProps = {
    dataset_id?: string | number
}

const DatapointsTable: React.FC<DatapointsTableProps> = ({
    dataset_id
}) => {

    const datapointsForSelectedDataset = useReduxSelector(state => datapointsList__selector(state, dataset_id));

    const [audioFilesIsLoaded, setaudioFilesIsLoaded] = useState(Array(datapointsForSelectedDataset.length).fill(false));

    const handleLoadAudio = (index) => {
        setaudioFilesIsLoaded(prev => {
            let newArray = [...prev];
            newArray[index] = true;
            return newArray;
        })
    }

    return (
        <table className="block w-full overflow-hidden">
            <thead className='block'>
                <tr className='block w-full items-center'>
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
            <tbody  className='block'>
                {
                    datapointsForSelectedDataset?.length ?
                    datapointsForSelectedDataset.map((datapoint, idx) => (
                        <tr
                            className={`flex flex-shrink-0 items-center w-full text-left hover:bg-amber-50 ${idx % 2 === 0 ? 'bg-gray-50' : ''}`}
                            key={datapoint?.id}
                        >
                            <td className="p-4 text-left max-w-min">
                                <Checkbox 
                                    size="small"
                                    color="warning"
                                />
                            </td>
                            <td 
                                className="p-4 truncate text-left w-1/4"
                                title={`${datapoint?.id}`}
                            >
                                {datapoint?.id}
                            </td>
                            <td 
                                className="p-4 truncate text-left w-1/4"
                            >
                                {datapoint?.tagged_by}
                            </td>
                            <td 
                                className="p-4 truncate text-left w-1/4"
                                title={`${datapoint?.state}`}
                            >
                                {datapoint?.state}
                            </td>
                            <td 
                                className="p-4 truncate text-left w-1/4"
                                title={`${datapoint?.audio}`}
                            >
                                {
                                    audioFilesIsLoaded[idx] ?
                                    <audio 
                                        controls
                                        className="w-full"
                                    >
                                        <source src={datapoint?.audio} type="audio/mpeg" />
                                    </audio>
                                        :
                                    <Button
                                        className="capitalize"
                                        color="warning"
                                        startIcon={<PlayArrowRounded />}
                                        onClick={() => handleLoadAudio(idx)}
                                    >
                                        Click to load audio
                                    </Button>   
                                }
                                {/* {datapoint?.audio} */}
                            </td>
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
