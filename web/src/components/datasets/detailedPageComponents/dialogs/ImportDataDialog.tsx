import { CloseRounded, InsertDriveFileRounded, TipsAndUpdatesRounded, UploadFile, UploadFileRounded } from '@mui/icons-material';
import { Button, Dialog, Tooltip, Typography } from '@mui/material';
import logger from '@utils/logger';
import React, { useState } from 'react';
import { uploadDataPoints__api } from 'src/pages/api/data';

type ImportDataDialogProps = {
    isOpen: boolean;
    onClose: () => void;
    dataset_id: string | number;
}

const ImportDataDialog: React.FC<ImportDataDialogProps> = ({
    isOpen,
    onClose,
    dataset_id
}) => {

    const [isImporting, setisImporting] = useState(false);

    const [formFields, setformFields] = useState({
        audioFiles: []
    });

    const handleFileInputChange = (e) => {
        if(!e.target?.files) return;
        const file = e?.target?.files[0];
        logger.log({file})
        setformFields(prev => ({
            ...prev,
            audioFiles: [...prev.audioFiles, file]
        }));
    }

    const handleRemoveFile = (fileIndex) => {
        setformFields(prev => {
            let newFilesArray = prev.audioFiles;
            newFilesArray.splice(fileIndex, 1);
            return {...prev, audioFiles: newFilesArray};
        })
    }

    const handleImport = async () => {
        //TODO
        const { success, data } = await uploadDataPoints__api({
            dataset_id,
            files: formFields.audioFiles
        });
    }

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >
            <div 
                className="p-5 bg-amber-50 dark:bg-d-background"
            >
                <Typography
                    variant='h5'
                    className='flex items-center'
                >
                    Import Data
                </Typography>
                <div className="flex flex-col w-full justify-between my-5 h-96 max-h-96 overflow-auto">
                    <div className="flex w-full justify-between">
                        <Button
                            startIcon={<UploadFileRounded />}
                            variant="outlined"
                            color="warning"
                            className="capitalize relative"
                        >
                            <label
                                htmlFor='file-input'
                                className="w-full h-full cursor-pointer absolute z-10 inset-0"
                            />
                            {formFields.audioFiles?.length ? "Upload Another File" : "Upload File"}
                        </Button>
                        {
                            !!formFields.audioFiles?.length &&
                            <div className="text-amber-500">
                                {formFields.audioFiles?.length} Files Selected
                            </div>
                        }
                    </div>
                    <input 
                        id="file-input"
                        type="file"
                        accept="audio/mp3,audio/wav,audio/flac"
                        aria-hidden={true}
                        onChange={handleFileInputChange}
                        onClick={(event: any) => { 
                            event.target.value = null
                        }}
                        hidden
                    />
                    {
                        !formFields?.audioFiles?.length ?
                        <label 
                            className="cursor-pointer grid place-items-center text-2xl text-amber-400 font-medium w-full h-80 bg-amber-100/80 hover:bg-amber-200/50 rounded-lg"
                            htmlFor="file-input"
                        >
                            <div className="flex flex-col">
                                <div className="flex justify-center m-2 text-6xl">
                                    <UploadFileRounded fontSize="inherit"/>
                                </div>
                                Click to Browse Files
                                <div className="flex flex-col text-sm font-normal text-amber-500 mt-4">
                                    <div className="flex">
                                        <span className='w-20'>Audio</span>
                                        <span className='font-medium text-amber-700'>flac, mp3, wav</span>
                                    </div>
                                    <div className="flex">
                                        <span className='w-20'>Text</span>
                                        <span className='font-medium text-amber-700'>txt</span>
                                    </div>
                                </div>
                            </div>
                        </label>
                            :
                        <div className="flex flex-col w-full h-80 bg-amber-100/80 rounded-lg overflow-auto p-4">
                            {
                                formFields?.audioFiles?.map((audioFile, idx) => (
                                    <div className="flex items-center bg-gray-50 p-2 rounded-lg my-1">
                                        <InsertDriveFileRounded className="fill-current text-amber-400 mr-4"/>
                                        <span 
                                            className='w-full truncate'
                                            title={audioFile?.name}
                                        >
                                            datafile/{idx+1}/{audioFile?.name}
                                        </span>
                                        <Tooltip
                                            title="Remove File"
                                        >
                                            <button
                                                className='group border-2 border-transparent hover:border-red-500 focus:border-red-500 hover:bg-red-200 focus:bg-red-200 rounded-md outline-none'
                                                onClick={() => handleRemoveFile(idx)}
                                            >
                                                <CloseRounded 
                                                    fontSize="small"
                                                    className='fill-current text-gray-400 group-focus:text-red-500 group-hover:text-red-500'
                                                />
                                            </button>
                                        </Tooltip>
                                    </div>
                                ))
                            }
                        </div>
                    }
                </div>
                <div className="my-4 px-3 flex justify-end">
                    <Button
                        className="mr-6 capitalize"
                        onClick={onClose}
                        color="error"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleImport}
                        className="bg-amber-500 hover:bg-amber-600 capitalize"
                        disabled={isImporting}
                    >
                        {isImporting ? 'Importing...' : 'Import'}
                    </Button>
                </div>
            </div>
        </Dialog>
    )
}

export default ImportDataDialog;
