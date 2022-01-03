import { AddRounded, DeleteRounded, LabelImportantRounded, RefreshRounded } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';

type DatasetActionButtonsPanel = {
    onImportClick?: () => void;
    onRefreshClick?: () => void;
    onStartLabelingClick?: () => void;
}

const DatasetActionButtonsPanel = ({
    onImportClick,
    onRefreshClick,
    onStartLabelingClick
}) => {

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
            <Button
                size="small"
                variant="outlined"
                className="border border-gray-300 hover:border-gray-500 text-gray-800 capitalize mr-4"
                startIcon={<LabelImportantRounded fontSize="inherit" className="fill-current text-amber-400"/>}
                onClick={onStartLabelingClick}
            >
                Start Labeling
            </Button>
            <Button
                size="small"
                variant="outlined"
                className="border border-gray-300 hover:border-gray-500 text-gray-800 capitalize mr-4"
                startIcon={<AddRounded fontSize="inherit" className=""/>}
                onClick={onImportClick}
            >
                Add / Import Data
            </Button>
            <Button
                size="small"
                variant="outlined"
                color="error"
                className="capitalize mr-4"
                startIcon={<DeleteRounded fontSize="inherit" className=""/>}
            >
                Delete Selected
            </Button>
        </div>
    )
}

export default DatasetActionButtonsPanel;
