import { RootState } from "@redux/reducers";
import logger from "@utils/logger";
import { createSelector } from "reselect";

const datasetsListSlice = (state: RootState) => state.datasetsState.datasetsById;
const searchQueryInput = (_, searchQuery?: string) => searchQuery;

export const datasetsList__selector = createSelector(
    [datasetsListSlice, searchQueryInput],
    (datasetsById, searchQuery) => {
        if(!searchQuery?.length) {
            return Object.values(datasetsById);
        }
        return Object.values(datasetsById).filter(dataset => {
            return dataset.name.toLowerCase().includes(searchQuery.toLowerCase());
        });
    }
);

const datasetByIdSlice = (state: RootState, datasetId: string | number) => state.datasetsState.datasetsById[datasetId];
export const datasetById__selector = createSelector(
    [datasetByIdSlice],
    (dataset) => {
        return dataset;
    }
)