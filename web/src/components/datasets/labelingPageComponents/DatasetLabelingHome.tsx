import { CheckCircleRounded, CloseRounded, ErrorRounded, KeyboardArrowLeftRounded, SkipNextRounded, TipsAndUpdatesRounded, TurnedInRounded } from '@mui/icons-material';
import { Button, Skeleton, Tooltip, Typography } from '@mui/material';
import { setDatapoints__action, setDatasets__action } from '@redux/actions';
import { useReduxSelector } from '@redux/hooks';
import { datasetById__selector } from '@redux/selectors';
import { datapointsList__selector } from '@redux/selectors/datapoints.selector';
import { checkConsensusState } from '@utils/checkConsensusState';
import { checkDatasetTagged } from '@utils/checkDatasetTagged';
import logger from '@utils/logger';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDataPoints__api } from 'src/pages/api/data';
import { updateDatapoint__api } from 'src/pages/api/data/[data_id]';
import { updateDataset__api } from 'src/pages/api/datasets/[dataset_id]';
const AudioGraph = dynamic(() => import('./AudioGraph'), { ssr: false });

type DatasetLabelingHomeProps = {
    dataset_id: string | number;
}

const DatasetLabelingHome: React.FC<DatasetLabelingHomeProps> = ({
    dataset_id,
}) => {

    const datapointsForSelectedDataset = useReduxSelector(state => datapointsList__selector(state, dataset_id));
    const datasetMetadata = useReduxSelector(state => datasetById__selector(state, dataset_id));
    const user = useReduxSelector(state => state.userState.user);

    const dispatch = useDispatch();

    const [dataLoading, setdataLoading] = useState(true);
    const [dataRefreshCounter, setdataRefreshCounter] = useState(0);
    const [audioIdx, setaudioIdx] = useState(0);
    const [isUpdatingLabels, setisUpdatingLabels] = useState(false);
    const [selectedLabels, setselectedLabels] = useState((datapointsForSelectedDataset[audioIdx]?.labels.filter(l => l?.user_id === user?.id)[0]?.label) || []);
    const hasPreviouslyLabelled = Boolean(datapointsForSelectedDataset[audioIdx]?.labels.filter(l => l?.user_id === user?.id)?.length);

    const handleAddLabel = (label) => {
        setselectedLabels(prev => {
            if(!prev.find((l) => l?.toLowerCase()! === label.toLowerCase())) {
                return [...prev, label];
            }
            return prev;
        });
    }

    const handleRemoveLabel = (labelIndex) => {
        setselectedLabels(prev => {
            return [...prev.slice(0, labelIndex), ...prev.slice(labelIndex + 1)];
        });
    }

    const handlePreviousAudio = () => {
        if(audioIdx === 0) return;
        setselectedLabels((datapointsForSelectedDataset[audioIdx - 1]?.labels.filter(l => l?.user_id === user?.id)[0]?.label) || []);
        setaudioIdx(prev => prev - 1);
    }

    const handleSkipAudio = () => {
        if(audioIdx === datapointsForSelectedDataset.length - 1) return;
        setselectedLabels((datapointsForSelectedDataset[audioIdx + 1]?.labels.filter(l => l?.user_id === user?.id)[0]?.label) || []);
        setaudioIdx(prev => prev + 1);
    }

    const handleSumbitLabelsForCurrentAudio = async () => {
        //TODO Call API to update labels
        setisUpdatingLabels(true);
        let newLabels = datapointsForSelectedDataset[audioIdx]?.labels?.slice();
        let newReviewerLabel = datapointsForSelectedDataset[audioIdx]?.reviewer_labels;
        let newState = datapointsForSelectedDataset[audioIdx]?.state;
        const userLabelIndex = datapointsForSelectedDataset[audioIdx]?.labels.findIndex(l => l?.user_id === user?.id);

        if(datapointsForSelectedDataset[audioIdx]?.state !== "PENDING") {
            return;
        }

        if(datapointsForSelectedDataset[audioIdx]?.labels.length < datasetMetadata?.maximum_voters) {
            if(userLabelIndex > -1) {
                newLabels[userLabelIndex] = {
                    user_id: user?.id,
                    label: selectedLabels,
                }
            } else {
                // logger.info(`Adding new label for user ${user?.id}`, newLabels);
                newLabels.push({
                    user_id: user?.id,
                    label: selectedLabels,
                })
            }
        }

        // Checks if consensus achieved or not for the current datapoint
        const consensusStatus = checkConsensusState(
            newLabels,
            datasetMetadata?.minimum_consensus,
            datasetMetadata?.maximum_voters
        );

        newState = consensusStatus.state;
        
        // If consensus achieved, reward the user
        if(consensusStatus?.winners?.length) {
            //TODO: Call API to update user score
            consensusStatus.winners.forEach((user_id) => {
                
            })
        }
        
        
        // Checks if after adding the new label, if the dataset
        // should be marked as tagged
        const updatedDatapoint = [...datapointsForSelectedDataset];
        updatedDatapoint[audioIdx] = {
            ...datapointsForSelectedDataset[audioIdx],
            state: newState,
        }
        const isDatasetTagged = checkDatasetTagged(updatedDatapoint);
        if(isDatasetTagged) {
            updateDataset__api({
                dataset_id,
                data: {
                    ...datasetMetadata,
                    is_tagged: true
                }
            });
        }

        if(!newReviewerLabel?.user_id && (user?.role === "admin" || user?.role === "reviewer")) {
            newReviewerLabel = {
                user_id: user?.id,
                label: selectedLabels
            };
        }
        const { success, data } = await updateDatapoint__api({
            dataset_id,
            data_id: datapointsForSelectedDataset[audioIdx]?.id,
            data: {
                ...datapointsForSelectedDataset[audioIdx],
                labels: newLabels,
                state: newState,
                reviewer_labels: newReviewerLabel,
                tagged_by: newLabels.length
            }
        })
        if(success) {
            dispatch(setDatapoints__action([data]));
            handleSkipAudio();
        } else {
            alert('Failed to update labels');
        }
        setisUpdatingLabels(false);
    }
    
    useEffect(() => {
        //TODO: fetch dataset metadata if not present and also data points
        (async function loadDataPoints() {
            setdataLoading(true);
            const { success, data } = await getDataPoints__api({
                dataset_id
            });
            if(success) {
                dispatch(setDatapoints__action(data));
            }
            setdataLoading(false);
        })();
        return () => {}
    }, [dataRefreshCounter]);

    if(dataLoading || !datapointsForSelectedDataset?.length) {
        return (
            <Skeleton 
                width="100%"
                height={200}
            />
        )
    }

    return (
        <div>
            <div className="flex items-center my-1">
                <span className="mx-2 text-gray-600">
                    ID: <b>{datapointsForSelectedDataset[audioIdx]?.id}</b>
                </span>
            </div>
            <AudioGraph 
                audioUrl={datapointsForSelectedDataset[audioIdx]?.audio}
            />
            <div
                className='flex w-full items-center bg-amber-200/50 rounded-md p-1 text-xs text-gray-600 shadow-sm'
            >
                {
                    hasPreviouslyLabelled ?
                    <>
                        <CheckCircleRounded fontSize="small" className="mx-2 my-1 fill-current text-green-500"/>
                        You have already labelled this data point
                    </>
                        :
                    <>
                        <TipsAndUpdatesRounded fontSize="small" className="mx-2 my-1 fill-current text-green-500"/>
                        Select all labels that apply to this audio clip
                    </>
                }
            </div>
            <div className="flex flex-col md:flex-row my-5">
                <div className="flex flex-col w-full md:w-1/2 h-40 bg-amber-50 rounded-lg m-2 px-4 py-2">
                    <Typography
                        className="font-medium text-amber-600"
                    >
                        Available Labels
                    </Typography>
                    <div 
                        className="grid grid-auto-cols-dense grid-cols-4 overflow-auto w-full my-2"
                        style={{
                            maxHeight: '150px',
                        }}
                    >
                        {
                            datasetMetadata?.labels?.map((label, idx) => (
                                <button 
                                    key={label} 
                                    className={`group flex cursor-pointer m-1 p-2 rounded-lg bg-opacity-50 hover:bg-opacity-100 border-2 hover:border-gray-500 ${selectedLabels.includes(label) ? 'border-amber-500 shadow-sm' : 'border-transparent'}`}
                                    style={{
                                        backgroundColor: datasetMetadata?.label_colors[idx],
                                    }}
                                    onClick={() => handleAddLabel(label)}
                                >
                                    <Tooltip
                                        title={label}
                                    >
                                        <span className='w-full text-center block truncate text-base'>{label}</span>
                                    </Tooltip>
                                </button>
                            ))
                        }
                    </div>
                </div>
                <div className="flex flex-col w-full md:w-1/2 h-40 bg-green-100 rounded-lg m-2 px-4 py-2">
                    <Typography
                        className="font-medium text-green-600"
                    >
                        Selected Labels
                    </Typography>
                    <div 
                        className="grid grid-auto-cols-dense grid-cols-4 overflow-auto w-full my-2"
                        style={{
                            maxHeight: '150px',
                        }}
                    >
                        {
                            selectedLabels?.length ?
                            selectedLabels?.map((label, idx) => (
                                <div 
                                    key={`${label}`} 
                                    className={`group flex cursor-pointer m-1 p-2 rounded-lg bg-opacity-50 hover:bg-opacity-100`}
                                    style={{
                                        backgroundColor: datasetMetadata?.label_colors[idx],
                                    }}
                                >
                                    <Tooltip
                                        title={label}
                                    >
                                        <span className='w-full text-center block truncate text-base'>{label}</span>
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
                                :
                            <div className="flex items-center justify-center w-full h-full col-span-3 text-green-500/80">
                                Click on a label from Available Labels to add it to Selected Labels
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="flex w-full justify-center">
                <div 
                    className="grid place-items-center rounded px-4 py-2 font-medium text-amber-500 border border-amber-500 bg-amber-100/50"
                    title={`File ${audioIdx + 1} of ${datapointsForSelectedDataset.length}`}
                >
                    {audioIdx + 1} / {datapointsForSelectedDataset.length}
                </div>
            </div>
            <div className="action-btns flex justify-center p-4 my-4">
                <Button
                    size="large"
                    className="capitalize mx-10"
                    startIcon={<KeyboardArrowLeftRounded />}
                    disabled={audioIdx === 0}
                    onClick={handlePreviousAudio}
                >
                    Previous Audio
                </Button>
                {
                    datapointsForSelectedDataset[audioIdx]?.state !== "PENDING" ?
                    <Tooltip
                        title={`Datapoint is labelled with Status ${datapointsForSelectedDataset[audioIdx]?.state}`}
                    >
                        {
                            datapointsForSelectedDataset[audioIdx]?.state === "COMPLETE" ?
                            <div className="flex items-center px-3 border border-green-400 bg-green-100/80 text-green-600 rounded mr-4 text-sm">
                                <CheckCircleRounded fontSize='small' className="mr-2"/> 
                                {datapointsForSelectedDataset[audioIdx]?.state}
                            </div>
                                    :
                            <div className="flex items-center px-3 border border-red-400 bg-red-100/80 text-red-600 rounded mr-4 text-sm">
                                <ErrorRounded fontSize='small' className="mr-2"/>
                                {datapointsForSelectedDataset[audioIdx]?.state}
                            </div>
                        }
                    </Tooltip>
                        :
                    <Button
                        size="large"
                        className="capitalize mx-10 bg-amber-500 hover:bg-amber-600"
                        variant="contained"
                        startIcon={<TurnedInRounded />}
                        disabled={!selectedLabels.length || isUpdatingLabels}
                        onClick={handleSumbitLabelsForCurrentAudio}
                    >
                        {isUpdatingLabels ? "Submitting" :"Submit Labels"}
                    </Button>   
                }
                <Button
                    size="large"
                    className="capitalize mx-10"
                    endIcon={<SkipNextRounded />}
                    disabled={audioIdx === datapointsForSelectedDataset.length - 1}
                    onClick={handleSkipAudio}
                >
                    Skip Audio
                </Button>
            </div>
        </div>
    )
}

export default DatasetLabelingHome;
