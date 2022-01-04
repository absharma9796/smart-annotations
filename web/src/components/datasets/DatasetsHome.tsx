import { AddCircleRounded, BubbleChartRounded } from '@mui/icons-material';
import { Button, IconButton, Typography } from '@mui/material';
import { useReduxSelector } from '@redux/hooks';
import { motion } from 'framer-motion';
import React, { useState } from 'react'
import CreateDatasetDialog from './dialogs/CreateDatasetDialog';
import DatasetListContainer from './DatasetListContainer';

const DatasetsHome = () => {

    const user = useReduxSelector(state => state?.userState?.user);

    const [createDatasetDialogOpen, setcreateDatasetDialogOpen] = useState(false);
    const [refreshCounter, setrefreshCounter] = useState(0);

    return (
        <main className='flex flex-col w-full'>
            <div className="hero-section pt-10">
                <Typography
                    variant='h4'
                    className='text-gray-800 selection:bg-amber-300 selection:text-amber-900'
                >
                    Welcome 
                    <b
                        className="mx-2"
                    >
                        {user?.name}
                    </b>
                </Typography>
            </div>
            {
                user?.role === 'admin' &&
                <div className="actions-panel mt-5 p-4 bg-amber-100/50 shadow-inner">
                    <motion.div 
                        className="cursor-pointer flex flex-col justify-center text-gray-800 items-center w-32 h-32 bg-white hover:bg-gray-50 hover: p-4 rounded-lg"
                        whileHover={{
                            scale: 1.05
                        }}
                        whileTap={{
                            scale: 0.9
                        }}
                        onClick={() => setcreateDatasetDialogOpen(true)}
                    >
                        <IconButton>
                            <AddCircleRounded className="fill-current text-amber-400"/>
                        </IconButton>
                        <span>Add Dataset</span>
                    </motion.div>
                </div>
            }
            <hr 
                className="border-gray-300 my-2"
            />
            <div className="datasets-list">
                <div className="flex my-4">
                    <Typography
                        variant='h5'
                        className='flex items-center text-gray-800'
                    >
                        <BubbleChartRounded fontSize='inherit' className="mr-2 fill-current text-amber-400"/> Datasets
                    </Typography>
                </div>
                <DatasetListContainer 
                    refreshCounter={refreshCounter}
                    setrefreshCounter={setrefreshCounter}
                />
            </div>
            {
                createDatasetDialogOpen &&
                <CreateDatasetDialog 
                    isOpen={createDatasetDialogOpen}
                    onClose={() => {setcreateDatasetDialogOpen(false); setrefreshCounter(prev => prev + 1)}}
                />
            }
        </main>
    )
}

export default DatasetsHome;
