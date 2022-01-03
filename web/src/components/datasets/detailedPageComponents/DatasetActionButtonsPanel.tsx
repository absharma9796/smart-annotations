import { AddRounded, CheckCircleRounded, DeleteRounded, LabelImportantRounded, RefreshRounded } from '@mui/icons-material';
import { Button, Tooltip } from '@mui/material';
import { setDatasets__action } from '@redux/actions';
import { useReduxDispatch, useReduxSelector } from '@redux/hooks';
import { datasetById__selector } from '@redux/selectors';
import { datapointsList__selector } from '@redux/selectors/datapoints.selector';
import logger from '@utils/logger';
import React, { useEffect, useState } from 'react';
import { getDatasetById__api } from 'src/pages/api/datasets/[dataset_id]';

type DatasetActionButtonsPanel = {
    onImportClick?: () => void;
    onRefreshClick?: () => void;
    onStartLabelingClick?: () => void;
    dataset_id: string | number;
    dataRefreshCounter?: number;
}

const DatasetActionButtonsPanel = ({
    onImportClick,
    onRefreshClick,
    onStartLabelingClick,
    dataset_id,
    dataRefreshCounter
}) => {
    
    // logger.debug('DatasetActionButtonsPanel: dataset_id:', dataset_id);
    const user = useReduxSelector(state => state.userState.user);
    const datasetMetadata = useReduxSelector(state => datasetById__selector(state, dataset_id));
    const datapointsForSelectedDataset = useReduxSelector(state => datapointsList__selector(state, dataset_id));

    const [labelingIsDisabled, setlabelingIsDisabled] = useState(datasetMetadata?.is_tagged);

    const dispatch = useReduxDispatch();

    useEffect(() => {
        setlabelingIsDisabled(datasetMetadata?.is_tagged);
    }, [datasetMetadata, dataset_id, dataRefreshCounter]);

    return (
        <div className="flex px-2 py-4">
            <Button
                size="small"
                variant="outlined"
                className="border border-gray-300 hover:border-gray-500 text-gray-800 capitalize mr-4"
                startIcon={<RefreshRounded fontSize="inherit"/>}
                onClick={onRefreshClick}
            >
                Refresh
            </Button>
            {
                labelingIsDisabled ?
                <Tooltip
                    title="Dataset is tagged"
                >
                    <div className="flex items-center px-3 border border-green-400 bg-green-100/80 text-green-600 rounded mr-4 text-sm">
                        <CheckCircleRounded fontSize='small' className="mr-2"/> Labelled
                    </div>
                </Tooltip>
                    :
                <Button
                    size="small"
                    variant="outlined"
                    className="border border-gray-300 hover:border-gray-500 text-gray-800 capitalize mr-4"
                    startIcon={
                        <LabelImportantRounded 
                            fontSize="inherit" 
                            className={`fill-current ${datapointsForSelectedDataset?.length && "text-amber-400"}`}/>
                        }
                    onClick={onStartLabelingClick}
                    disabled={!datapointsForSelectedDataset?.length}
                >
                    Start Labeling
                </Button>   
            }
            <Button
                size="small"
                variant="outlined"
                className="border border-gray-300 hover:border-gray-500 text-gray-800 capitalize mr-4"
                startIcon={<AddRounded fontSize="inherit" className=""/>}
                onClick={onImportClick}
                disabled={user?.role === "member"}
            >
                Add / Import Data
            </Button>
            <Button
                size="small"
                variant="outlined"
                color="error"
                className="capitalize mr-4"
                startIcon={<DeleteRounded fontSize="inherit" className=""/>}
                disabled={user?.role !== "admin"}
            >
                Delete Selected
            </Button>
        </div>
    )
}

export default DatasetActionButtonsPanel;
