import { AddRounded, DeleteRounded, RefreshRounded } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import React from 'react';

type DatasetActionButtonsPanel = {
    onImportClick?: () => void;
}

const DatasetActionButtonsPanel = ({
    onImportClick
}) => {
    return (
        <div className="flex px-2 py-4">
            <Button
                size="small"
                variant="outlined"
                className="border border-gray-300 hover:border-gray-500 text-gray-800 capitalize mr-4"
                startIcon={<RefreshRounded fontSize="inherit"/>}
            >
                Refresh
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
                color="warning"
                className="capitalize mr-4"
                startIcon={<DeleteRounded fontSize="inherit" className=""/>}
            >
                Delete Selected
            </Button>
        </div>
    )
}

export default DatasetActionButtonsPanel;
