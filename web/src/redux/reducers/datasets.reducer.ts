import { CONSTANTS } from '../actions';
import produce from 'immer';
import { Dataset } from '@dataTypes/dataset.type';
import logger from '@utils/logger';

type InitialState = {
    datasetsById: {
        [key: string]: Dataset
    }
}

const initialState: InitialState = {
    datasetsById: {

    }
}

const datasetsReducer = (state: InitialState = initialState, action) => 
produce(state, draft => {
    switch (action.type) {
        case CONSTANTS.DATASETS__SET_DATASETS: {
            const { datasets }: {datasets: Dataset[]} = action.payload;
            logger.info('datasetsReducer: ', datasets);

            if(!Array.isArray(datasets)) {
                logger.error('datasetsReducer: datasets is not an array');
                break;
            }

            datasets.forEach(dataset => {
                if(dataset?.id) {
                    draft.datasetsById[dataset.id] = dataset;
                }
            })
            break;
        }
    
        default:
            break;
    }
});

export default datasetsReducer;