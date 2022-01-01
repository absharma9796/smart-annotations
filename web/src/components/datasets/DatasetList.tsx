import React from 'react';
import { useReduxSelector } from '@redux/hooks';
import { datasetsList__selector } from '@redux/selectors/datasets.selector';
import logger from '@utils/logger';
import { motion } from 'framer-motion';
import { Tooltip, Typography } from '@mui/material';
import { AbcRounded, AudiotrackRounded, LabelImportantRounded } from '@mui/icons-material';
import { AcceptableDatasetType } from '@dataTypes/dataset.type';
import { useRouter } from 'next/router';

const DatasetList = () => {

    const router = useRouter();

    const datasets = useReduxSelector((state) => datasetsList__selector(state));
    logger.log('DatasetList', datasets);

    const dataTypeLogoMap = (dataType: AcceptableDatasetType , iconProps) => {
        switch (dataType) {
            case "audio": {
                return <AudiotrackRounded {...iconProps} />
            }

            case "text": {
                return <AbcRounded {...iconProps} />
            }
        
            default:
                break;
        }
    }

    return (
        <div className="p-3 flex justify-center">
            <div className="grid grid-flow-cols-dense grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5 w-full">
                {
                    datasets?.length ?
                    datasets.map((dataset) => (
                        <motion.button
                            key={dataset?.id}
                            style={{
                                height: 150
                            }}
                            className="cursor-pointer bg-white shadow relative flex flex-col justify-between p-3 rounded-md"
                            whileHover={{
                                scale: 1.05
                            }}
                            whileTap={{
                                scale: 0.9
                            }}
                            onClick={() => router.push(`/in/datasets/${dataset?.id}`)}
                        >
                            <Typography
                                className="text-gray-800 font-semibold text-lg flex items-center"
                            >
                                <div 
                                    className="grid place-items-center rounded-full w-8 h-8 border border-amber-500 bg-amber-100/50 mr-2"
                                    title={`Data Type: ${dataset?.data_type}`}
                                >
                                    {dataTypeLogoMap(dataset?.data_type, {
                                        className: "fill-current text-amber-500"
                                    })}
                                </div>
                                {dataset?.name}
                            </Typography>
                            <Typography
                                className="my-3 text-gray-600"
                            >
                                {dataset?.description}
                            </Typography>
                            <div className="flex items-center w-full overflow-hidden">
                                <LabelImportantRounded 
                                    fontSize="small"
                                    className='fill-current mr-2 text-gray-400'
                                />
                                {dataset?.labels.slice(0, 5).map((label, idx) => (
                                    <div 
                                        key={label} 
                                        className={`flex items-center m-1 p-0.5 rounded-lg`}
                                        style={{
                                            backgroundColor: dataset?.label_colors[idx]
                                        }}
                                    >
                                        <Tooltip
                                            title={label}
                                        >
                                            <span className='w-full px-2 block truncate text-sm'>{label}</span>
                                        </Tooltip>
                                    </div>
                                ))}
                                {
                                    !!(dataset?.labels?.length > 5) &&
                                    <div
                                        className="font-medium text-gray-600"
                                    >
                                        {`+${dataset?.labels?.length - 5}`}
                                    </div>
                                }
                            </div>
                        </motion.button>
                    ))
                        :
                    <div className='flex flex-col text-xl text-gray-500'>
                        No Datasets Found
                    </div>
                }
            </div>
        </div>
    )
}

export default DatasetList;
