import { CONSTANTS } from '../actions';
import produce from 'immer';
import { DataPoint } from '@dataTypes/datapoint.type';
import logger from '@utils/logger';

type InitialState = {
    datapointsById: {
        [key: string]: DataPoint
    }
}

const initialState: InitialState = {
    datapointsById: {

    }
}

const datapointsReducer = (state: InitialState = initialState, action) => 
produce(state, draft => {
    switch (action.type) {
        case CONSTANTS.DATAPOINTS__SET_DATAPOINTS: {
            const { datapoints }: {datapoints: DataPoint[]} = action.payload;
            logger.info('datapointsReducer: ', datapoints);

            if(!Array.isArray(datapoints)) {
                logger.error('datapointsReducer: datapoints is not an array');
                break;
            }

            datapoints.forEach(datapoint => {
                if(datapoint?.id) {
                    draft.datapointsById[datapoint.id] = datapoint;
                }
            })
            break;
        }
    
        default:
            break;
    }
});

export default datapointsReducer;