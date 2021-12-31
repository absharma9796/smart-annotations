import { RootState } from "@redux/reducers";
import logger from "@utils/logger";
import { createSelector } from "reselect";

const projectsListSlice = (state: RootState) => state.projectsState.projectsById;

export const projectList__selector = createSelector(
    [projectsListSlice],
    (projectsById) => {
        return Object.values(projectsById);
    }
);

const projectByIdSlice = (state: RootState, projectId: number) => state.projectsState.projectsById[projectId];
export const projectById__selector = createSelector(
    [projectByIdSlice],
    (project) => {
        return project;
    }
)