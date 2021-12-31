import { TipsAndUpdatesRounded, WorkspacePremiumRounded } from '@mui/icons-material';
import { Button, Dialog, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { createProject__api } from 'src/pages/api/projects/create';

type CreateProjectDialogProps = {
    isOpen: boolean;
    onClose: () => void;
}

const CreateProjectDialog: React.FC<CreateProjectDialogProps> = ({
    isOpen,
    onClose
}) => {

    const [isCreating, setisCreating] = useState(false);

    const [formFields, setformFields] = useState({
        name: '',
        description: '',
    });

    const handleFormChange = (e, field: string) => {
        const { value } = e.target;
        setformFields(prev => ({...prev, [field]: value}));
    }

    const handleCreateProject = async () => {
        setisCreating(true);
        if(!formFields.name) {
            setisCreating(false);
            alert('Project name is required');
            return;
        }
        const { success, data } = await createProject__api({
            name: formFields.name,
            description: formFields.description
        });
        if(success) {
            //TODO: Notify user
            alert('Project created successfully');
            onClose();
        }
        setisCreating(false);
    }

    return (
        <Dialog 
            open={isOpen}
            onClose={onClose}
            maxWidth="md"
            // fullWidth
        >
            <div className="p-5 bg-amber-50 dark:bg-d-background">
                <Typography
                    variant='h5'
                    className='flex items-center'
                >
                    <WorkspacePremiumRounded fontSize='inherit' className="mr-2 fill-current text-amber-400"/>
                    Add a new Dataset
                </Typography>
                <div
                    className='flex w-96 items-center bg-amber-200 rounded-md p-2 mt-4 text-xs text-gray-600 shadow-sm'
                >
                    <TipsAndUpdatesRounded fontSize='small' className="m-2 fill-current text-green-500"/>
                    A Dataset is a set of data points which are to be annotated.
                    Admins can assign labels to a dataset, and users can annotate the data points.
                </div>
                <div className="my-5">
                    <div className="flex flex-col my-2">
                        <label
                            className="text-gray-800 mb-3 text-xl font-medium"
                            htmlFor='project-name'
                        >
                            Name
                        </label>
                        <TextField 
                            id="project-name"
                            className="w-96"
                            helperText="Enter a name for your project"
                            value={formFields?.name}
                            onChange={(e) => handleFormChange(e, 'name')}
                        />
                    </div>
                    <div className="flex flex-col my-2">
                        <label
                            className="text-gray-800 mb-3 text-xl font-medium"
                            htmlFor="project-description"
                        >
                            Description
                        </label>
                        <TextField 
                            id="project-description"
                            className="w-96"
                            helperText="You can give a description as well"
                            value={formFields?.description}
                            onChange={(e) => handleFormChange(e, 'description')}
                        />
                    </div>
                </div>
                <div className="my-4 px-3 flex justify-end">
                    <Button
                        className="mr-6"
                        onClick={onClose}
                        color="error"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleCreateProject}
                        className="bg-amber-500 hover:bg-amber-600"
                        disabled={isCreating}
                    >
                        {isCreating ? 'Creating...' : 'Create'}
                    </Button>
                </div>
            </div>
        </Dialog>
    )
}

export default CreateProjectDialog
