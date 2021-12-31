import { AddCircleRounded, WorkspacePremiumRounded } from '@mui/icons-material';
import { Button, IconButton, Typography } from '@mui/material';
import { useReduxSelector } from '@redux/hooks';
import { motion } from 'framer-motion';
import React, { useState } from 'react'
import CreateProjectDialog from './dialogs/CreateProjectDialog';
import ProjectListContainer from './ProjectListContainer';

const ProjectsHome = () => {

    const user = useReduxSelector(state => state?.userState?.user);

    const [createProjectDialogOpen, setcreateProjectDialogOpen] = useState(false);

    return (
        <main className='flex flex-col'>
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
            <div className="actions-panel mt-5 p-4 bg-amber-100 shadow-inner">
                <motion.div 
                    className="cursor-pointer flex flex-col justify-center text-gray-800 items-center w-32 h-32 bg-white hover:bg-gray-50 hover: p-4 rounded-lg"
                    whileHover={{
                        scale: 1.05
                    }}
                    whileTap={{
                        scale: 0.9
                    }}
                    onClick={() => setcreateProjectDialogOpen(true)}
                >
                    <IconButton>
                        <AddCircleRounded className="fill-current text-amber-400"/>
                    </IconButton>
                    <span>New Project</span>
                </motion.div>
            </div>
            <hr 
                className="border-gray-300 my-2"
            />
            <div className="projects-list">
                <div className="flex my-4">
                    <Typography
                        variant='h5'
                        className='flex items-center text-gray-800'
                    >
                        <WorkspacePremiumRounded fontSize='inherit' className="mr-2 fill-current text-amber-400"/> Projects
                    </Typography>
                </div>
                <ProjectListContainer />
            </div>
            {
                createProjectDialogOpen &&
                <CreateProjectDialog 
                    isOpen={createProjectDialogOpen}
                    onClose={() => setcreateProjectDialogOpen(false)}
                />
            }
        </main>
    )
}

export default ProjectsHome;
