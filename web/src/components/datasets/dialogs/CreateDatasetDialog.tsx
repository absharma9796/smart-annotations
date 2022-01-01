import { AcceptableDatasetType } from '@dataTypes/dataset.type';
import { AbcRounded, AddCircleRounded, AudiotrackRounded, BubbleChartRounded, CloseRounded, GavelRounded, InfoRounded, LabelImportantRounded, PeopleAltRounded, PersonRounded, TipsAndUpdatesRounded } from '@mui/icons-material';
import { Button, Dialog, Slider, TextField, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from '@mui/material';
import logger from '@utils/logger';
import { getRandomColor } from '@utils/randomColorGenerator';
import React, { useState } from 'react';
import { createDataset__api } from 'src/pages/api/datasets/create';
import { createProject__api } from 'src/pages/api/projects/create';

type CreateProjectDialogProps = {
    isOpen: boolean;
    onClose: () => void;
}

type FormProps = {
    name: string;
    description: string;
    labels: string[];
    label_colors: string[];
    data_type: AcceptableDatasetType;
    maximum_voters: number;
    minimum_voters: number;
    minimum_consensus: number;
}

const CreateProjectDialog: React.FC<CreateProjectDialogProps> = ({
    isOpen,
    onClose
}) => {

    const [isCreating, setisCreating] = useState(false);
    const [labelInputValue, setlabelInputValue] = useState("");

    const [formFields, setformFields] = useState<FormProps>({
        name: '',
        description: '',
        maximum_voters: 2,
        minimum_voters: 2,
        minimum_consensus: 2,
        labels: [],
        label_colors: [],
        data_type: 'audio',
    });

    const handleFormChange = (e, field: string) => {
        const { value } = e.target;
        if(value === null) return;
        setformFields(prev => ({...prev, [field]: value}));
    }

    const handleCreateDataset = async () => {
        setisCreating(true);
        if(!formFields.name) {
            setisCreating(false);
            alert('Project name is required');
            return;
        }
        const { success, data } = await createDataset__api({
            ...formFields
        });
        if(success) {
            //TODO: Notify user
            alert('Dataset created successfully');
            onClose();
        }
        setisCreating(false);
    }

    const handleAddLabel = (e) => {
        if(e?.key?.toLowerCase() !== "enter") return;
        if(!labelInputValue.length) return;
        if(!formFields.labels.find(prev => prev.toLowerCase() === labelInputValue?.toLowerCase())) {
            setformFields(prev => ({...prev, labels: [...prev.labels, labelInputValue], label_colors: [...prev.label_colors, getRandomColor("light")]}));
            setlabelInputValue("");
        }
    }

    const handleRemoveLabel = (labelIndex?: number) => {
        setformFields((prev) => {
            let newLabels = prev.labels;
            let newLabelColors = prev.label_colors;
            newLabels.splice(labelIndex, 1);
            newLabelColors.splice(labelIndex, 1);
            return {...prev, labels: newLabels, label_colors: newLabelColors}
        });
    }

    return (
        <Dialog 
            open={isOpen}
            onClose={onClose}
            maxWidth={false}
            // fullWidth
        >
            <div 
                className="p-5 bg-amber-50 dark:bg-d-background"
                style={{
                    maxWidth: "50rem"
                }}
            >
                <Typography
                    variant='h5'
                    className='flex items-center'
                >
                    <BubbleChartRounded fontSize='inherit' className="mr-2 fill-current text-amber-400"/>
                    Add a new Dataset
                </Typography>
                <div
                    className='flex w-full items-center bg-amber-200 rounded-md p-2 mt-4 text-xs text-gray-600 shadow-sm'
                >
                    <TipsAndUpdatesRounded fontSize='small' className="m-2 fill-current text-green-500"/>
                    A Dataset is a set of data points which are to be annotated.
                    Admins can assign labels to a dataset, and users can annotate the data points.
                </div>
                <div className="flex w-full justify-between my-5 max-h-96 overflow-auto">
                    <div className="flex flex-col my-2">
                        <div className="flex flex-col my-2">
                            <label
                                className="text-gray-800 mb-3 text-xs font-medium"
                                htmlFor='project-name'
                            >
                                Name
                            </label>
                            <TextField 
                                size="small"
                                id="project-name"
                                className="w-80"
                                inputProps={{
                                    className: "bg-white text-sm"
                                }}
                                placeholder='e.g. Cats vs Dogs Dataset'
                                helperText="Give a name to your dataset"
                                value={formFields?.name}
                                onChange={(e) => handleFormChange(e, 'name')}
                            />
                        </div>
                        <div className="flex flex-col my-2">
                            <label
                                className="text-gray-800 mb-3 text-xs font-medium"
                                htmlFor="project-description"
                            >
                                Description
                            </label>
                            <textarea 
                                id="project-description"
                                className="w-80 bg-white outline-none rounded text-sm py-2 px-3 border border-gray-300 hover:border-black focus:border-2 focus:border-blue-600"
                                value={formFields?.description}
                                placeholder="e.g. This dataset contains audio clips of animal sounds"
                                onChange={(e) => handleFormChange(e, 'description')}
                            />
                        </div>
                        <div className="flex flex-col my-2">
                            <label
                                className="text-gray-800 mb-3 text-xs font-medium"
                                htmlFor="project-description"
                            >
                                Data Type
                            </label>
                            <ToggleButtonGroup
                                value={formFields.data_type}
                                exclusive
                                onChange={(e, newValue) => handleFormChange({...e, target: {value: newValue}}, "data_type")}
                                aria-label="text alignment"
                                className="bg-white"
                                size="small"
                            >
                                <ToggleButton value="audio" aria-label="centered" className="w-1/2">
                                    <AudiotrackRounded 
                                        className={`mr-2 fill-current ${formFields.data_type === "audio" ? "text-amber-500" : ""}`}
                                    /> Audio
                                </ToggleButton>
                                <ToggleButton value="text" aria-label="centered" className="w-1/2">
                                    <AbcRounded 
                                        className={`mr-2 fill-current ${formFields.data_type === "text" ? "text-amber-500" : ""}`}
                                    /> Text
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                    </div>
                    <div className="flex flex-col my-2 mr-4">
                        <div className="flex flex-col my-2">
                            <label
                                className="text-gray-800 mb-3 text-xs font-medium flex items-center"
                                htmlFor='project-name'
                            >
                                <LabelImportantRounded fontSize="small" className="mr-2 fill-current text-gray-400"/>
                                Labels
                            </label>
                            <div className="p-2 flex flex-col bg-white border border-gray-300 hover:border-black rounded shadow-inner resize-y">
                                <div className="flex items-center relative mb-1">
                                    <AddCircleRounded 
                                        className="absolute left-2 fill-current text-amber-400"
                                        fontSize="small"
                                    />
                                    <input 
                                        type="text"
                                        className='w-full outline-none px-10 text-amber-500 text-sm'
                                        placeholder='add label'
                                        value={labelInputValue}
                                        onChange={(e) => setlabelInputValue(e.target.value)}
                                        onKeyDown={(e) => handleAddLabel(e)}
                                    />
                                </div>
                                <div 
                                    className="grid grid-auto-cols-dense grid-cols-3 overflow-auto w-80"
                                    style={{
                                        maxHeight: '150px',
                                    }}
                                >
                                    {
                                        formFields?.labels.map((label, idx) => (
                                            <div 
                                                key={label} 
                                                className={`flex items-center m-1 p-0.5 rounded-lg`}
                                                style={{
                                                    backgroundColor: formFields.label_colors[idx]
                                                }}
                                            >
                                                <Tooltip
                                                    title={label}
                                                >
                                                    <span className='w-20 px-2 block truncate text-sm'>{label}</span>
                                                </Tooltip>
                                                <button
                                                    className='group border-2 border-transparent hover:border-red-500 focus:border-red-500 hover:bg-red-200 focus:bg-red-200 rounded-md outline-none'
                                                    onClick={() => handleRemoveLabel(idx)}
                                                >
                                                    <CloseRounded 
                                                        fontSize="small"
                                                        className='fill-current text-gray-400 group-focus:text-red-500 group-hover:text-red-500'
                                                    />
                                                </button>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col my-2">
                            <label
                                className="text-gray-800 mb-3 text-xs font-medium flex items-center"
                                htmlFor="project-maximum_voters"
                            >
                                <PeopleAltRounded fontSize="small" className="mr-2 fill-current text-gray-400"/>
                                Maximum Voters
                            </label>
                            <div className="flex items-center">
                                <Tooltip
                                    title={formFields.maximum_voters}
                                >
                                    <div 
                                        className="bg-white w-14 border border-gray-300 truncate grid place-items-center p-3 mr-2 rounded-lg"
                                    >
                                        {formFields.maximum_voters}
                                    </div>
                                </Tooltip>
                                <Slider
                                    size="small"
                                    value={formFields.maximum_voters}
                                    min={2}
                                    max={100}
                                    step={1}
                                    className="w-60"
                                    onChange={(e, newValue) => handleFormChange({...e, target: {value: newValue}}, "maximum_voters")}
                                    aria-label="Small"
                                    valueLabelDisplay="auto"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col my-2">
                            <label
                                className="text-gray-800 mb-3 text-xs font-medium flex items-center"
                                htmlFor="project-minimum_voters"
                            >
                                <PersonRounded fontSize="small" className="mr-1 fill-current text-gray-400"/>
                                Minimum Voters
                            </label>
                            <div className="flex items-center">
                                <Tooltip
                                    title={formFields.minimum_voters}
                                >
                                    <div className="bg-white w-14 border border-gray-300 truncate grid place-items-center p-3 mr-2 rounded-lg">
                                        {formFields.minimum_voters}
                                    </div>
                                </Tooltip>
                                <Slider
                                    size="small"
                                    value={formFields.minimum_voters}
                                    min={2}
                                    max={100}
                                    className="w-60"
                                    onChange={(e, newValue) => handleFormChange({...e, target: {value: newValue}}, "minimum_voters")}
                                    aria-label="Small"
                                    valueLabelDisplay="auto"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col my-2">
                            <label
                                className="text-gray-800 mb-3 text-xs font-medium flex items-center"
                                htmlFor="project-minimum_consensus"
                            >
                                <GavelRounded fontSize="small" className="mr-2 fill-current text-gray-400"/>
                                Minimum Consensus
                            </label>
                            <div className="flex items-center">
                                <Tooltip
                                    title={formFields.minimum_consensus}
                                >
                                    <div className="bg-white w-14 border border-gray-300 truncate grid place-items-center p-3 mr-2 rounded-lg">
                                        {formFields.minimum_consensus}
                                    </div>
                                </Tooltip>
                                <Slider
                                    size="small"
                                    value={formFields.minimum_consensus}
                                    min={2}
                                    max={100}
                                    step={1}
                                    className="w-60"
                                    onChange={(e, newValue) => handleFormChange({...e, target: {value: newValue}}, "minimum_consensus")}
                                    aria-label="Small"
                                    valueLabelDisplay="auto"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className='flex w-full items-center bg-gray-200 rounded-md mt-4 text-xs text-gray-600 shadow-sm'
                >
                    <InfoRounded fontSize='small' className="m-2 fill-current text-indigo-500"/>
                    Please ensure all required fields are filled and valid before submitting
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
                        onClick={handleCreateDataset}
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
