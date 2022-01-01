import { AcceptableDatasetType } from '@dataTypes/dataset.type';
import { AbcRounded, AudiotrackRounded, KeyboardArrowLeftRounded } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { useReduxSelector } from '@redux/hooks';
import { datasetById__selector } from '@redux/selectors';
import React from 'react';
import Link from "next/link";

type DatesetMetadataPanelProps = {
    dataset_id: string | number;
}

const DatasetMetadataPanel = ({
    dataset_id
}) => {

    const datasetMetadata = useReduxSelector(state => datasetById__selector(state, dataset_id));

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
        <div className='flex flex-col w-full relative'>
            <div className="flex items-center">
                <Typography
                    className="text-gray-800 font-semibold text-lg flex items-center"
                >
                    <div 
                        className="grid place-items-center rounded-full w-8 h-8 border border-amber-500 bg-amber-100/50 mr-2"
                        title={`Data Type: ${datasetMetadata?.data_type}`}
                    >
                        {dataTypeLogoMap(datasetMetadata?.data_type, {
                            className: "fill-current text-amber-500"
                        })}
                    </div>
                    {datasetMetadata?.name}
                </Typography>
            </div>
            <div className="flex">
                <Typography
                    className="my-3 text-gray-600"
                >
                    {datasetMetadata?.description}
                </Typography>
            </div>
            <div className="absolute right-0">
                <Link
                    href="/in/datasets"
                >
                    <Button
                        startIcon={<KeyboardArrowLeftRounded />}
                        variant="outlined"
                        color="error"
                        className="capitalize"
                    >
                        Go Back
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default DatasetMetadataPanel;
