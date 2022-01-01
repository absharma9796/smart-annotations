import { RootState } from "@redux/reducers";
import logger from "@utils/logger";
import { createSelector } from "reselect";

const datapointsListSlice = (state: RootState, _) => state.datapointsState.datapointsById;
const dataset_id_input = (_, dataset_id: string | number) => dataset_id_input;

export const datapointsList__selector = createSelector(
    [datapointsListSlice, dataset_id_input],
    (datapointsById, dataset_id) => {
        return Object.values(datapointsById).filter(data => data?.dataset_id === dataset_id);
    }
);

const datapointByIdSlice = (state: RootState, datapointId: number) => state.datapointsState.datapointsById[datapointId];
export const datapointById__selector = createSelector(
    [datapointByIdSlice],
    (datapoint) => {
        return datapoint;
    }
)