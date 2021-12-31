import { Project } from '@dataTypes/project.type';
import { CONSTANTS } from './index';

export const setProjects__action = (projects: Project[]) => {
    return {
        type: CONSTANTS.PROJECTS__SET_PROJECTS,
        payload: { projects }
    }
}