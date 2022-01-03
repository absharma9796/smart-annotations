import { RootState } from "@redux/reducers";
import logger from "@utils/logger";
import { createSelector } from "reselect";

const datasetsListSlice = (state: RootState) => state.datasetsState.datasetsById;

export const datasetsList__selector = createSelector(
    [datasetsListSlice],
    (datasetsById) => {
        return Object.values(datasetsById);
    }
);

const datasetByIdSlice = (state: RootState, datasetId: string | number) => state.datasetsState.datasetsById[datasetId];
export const datasetById__selector = createSelector(
    [datasetByIdSlice],
    (dataset) => {
        return dataset;
    }
)