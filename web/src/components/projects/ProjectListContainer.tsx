import { RefreshRounded, SearchRounded } from '@mui/icons-material';
import { IconButton, Skeleton, TextField, Tooltip } from '@mui/material';
import { setProjects__action } from '@redux/actions';
import { useReduxDispatch } from '@redux/hooks';
import React, { useEffect, useState } from 'react'
import { getProjects__api } from 'src/pages/api/projects';
import ProjectList from './ProjectList';

const ProjectListContainer = () => {

    const dispatch = useReduxDispatch();

    const [loading, setloading] = useState(true);
    const [refreshCounter, setrefreshCounter] = useState(0);

    useEffect(() => {
        //TODO: call Projects api
        (async function loadProjects() {
            setloading(true);
            const { success, data } = await getProjects__api();
            if(success) {
                dispatch(setProjects__action(data));
            }
            setTimeout(() => setloading(false), 2000);
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
                <div className="p-3 grid grid-flow-cols-dense grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-0  w-full">
                    <Skeleton 
                        width={"100%"}
                        height={200}
                    />
                    <Skeleton 
                        width={"100%"}
                        height={200}
                    />
                    <Skeleton 
                        width={"100%"}
                        height={200}
                    />
                </div>
                    :
                <ProjectList />
            }
            <div className="block py-10"></div>
        </div>
    )
}

export default ProjectListContainer;
