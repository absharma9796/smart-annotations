import { RefreshRounded, SearchRounded } from '@mui/icons-material';
import { IconButton, Skeleton, TextField, Tooltip } from '@mui/material';
import { setDatasets__action } from '@redux/actions';
import { useReduxDispatch } from '@redux/hooks';
import React, { useEffect, useState } from 'react'
import { getDatasets__api } from 'src/pages/api/datasets';
import DatasetList from './DatasetList';

type DatasetListContainerProps = {
    refreshCounter: number;
    setrefreshCounter: React.Dispatch<React.SetStateAction<number>>;
}

const DatasetListContainer: React.FC<DatasetListContainerProps> = ({
    refreshCounter,
    setrefreshCounter
}) => {

    const dispatch = useReduxDispatch();

    const [loading, setloading] = useState(true);
    const [searchQuery, setsearchQuery] = useState("");

    useEffect(() => {
        //TODO: call Datasets api
        (async function loadDatasets() {
            setloading(true);
            const { success, data } = await getDatasets__api();
            if(success) {
                dispatch(setDatasets__action(data));
            }
            setTimeout(() => setloading(false), 500);
        })();
        return () => {};
    }, [refreshCounter]);

    return (
        <div className="flex flex-col">
            <div className="search-bar">
                <TextField 
                    InputProps={{
                        startAdornment: <SearchRounded className='fill-current text-gray-600 mr-2'/>
                    }}
                    size='small'
                    className="focus-within:border-amber-300 focus-within:text-amber-900"
                    placeholder='Search'
                    value={searchQuery}
                    onChange={(e) => setsearchQuery(e.target.value)}
                />
                <Tooltip title='Refresh'>
                    <IconButton
                        onClick={() => setrefreshCounter(prev => prev + 1)}
                        className="mx-3"
                    >
                        <RefreshRounded className='fill-current text-gray-600'/>
                    </IconButton>
                </Tooltip>
            </div>
            {
                loading ? 
                <div className="grid grid-flow-cols-dense grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-0 w-full">
                    <Skeleton 
                        width={"100%"}
                        height={250}
                    />
                    <Skeleton 
                        width={"100%"}
                        height={250}
                    />
                </div>
                    :
                <DatasetList 
                    searchQuery={searchQuery}
                />
            }
            <div className="block py-10"></div>
        </div>
    )
}

export default DatasetListContainer;
