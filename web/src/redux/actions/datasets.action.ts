import { Dataset } from '@dataTypes/dataset.type';
import { CONSTANTS } from './index';

export const setDatasets__action = (datasets: Dataset[]) => {
    return {
        type: CONSTANTS.DATASETS__SET_DATASETS,
        payload: { datasets }
    }
}