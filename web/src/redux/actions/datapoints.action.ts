import { DataPoint } from '@dataTypes/datapoint.type';
import { CONSTANTS } from './index';

export const setDatapoints__action = (datapoints: DataPoint[]) => {
    return {
        type: CONSTANTS.DATAPOINTS__SET_DATAPOINTS,
        payload: { datapoints }
    }
}