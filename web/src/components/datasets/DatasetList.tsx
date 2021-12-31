import React from 'react';
import { useReduxSelector } from '@redux/hooks';
import { projectList__selector } from '@redux/selectors/projects.selectors';
import logger from '@utils/logger';
import { motion } from 'framer-motion';
import { Typography } from '@mui/material';

const DatasetList = () => {

    const projects = useReduxSelector((state) => projectList__selector(state));
    logger.log('ProjectList', projects);

    return (
        <div className="p-3 flex justify-center">
            <div className="grid grid-flow-cols-dense grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-5  w-full">
                {
                    projects?.length ?
                    projects.map((project) => (
                        <motion.button
                            key={project.id}
                            style={{
                                height: 150
                            }}
                            className="cursor-pointer bg-white shadow relative flex flex-col p-3 rounded-md"
                            whileHover={{
                                scale: 1.05
                            }}
                            whileTap={{
                                scale: 0.9
                            }}
                        >
                            <Typography
                                className="text-gray-800 font-semibold text-lg"
                            >
                                {project?.name}
                            </Typography>
                            <Typography
                                className="my-3 text-gray-600"
                            >
                                {project?.description}
                            </Typography>
                        </motion.button>
                    ))
                        :
                    <div>
                        No Projects Found
                    </div>
                }
            </div>
        </div>
    )
}

export default DatasetList;
