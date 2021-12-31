import { CONSTANTS } from '../actions';
import produce from 'immer';
import { Project } from '@dataTypes/project.type';
import logger from '@utils/logger';

type InitialState = {
    projectsById: {
        [key: string]: Project
    }
}

const initialState: InitialState = {
    projectsById: {
        // '1': {
        //     id: '1',    
        //     name: 'Project 1',
        //     description: 'Project 1 description',
        //     created_at: '2020-01-01',
        //     created_by: '1
        //  }
    }
}

const projectsReducer = (state: InitialState = initialState, action) => 
produce(state, draft => {
    switch (action.type) {
        case CONSTANTS.PROJECTS__SET_PROJECTS: {
            const { projects }: {projects: Project[]} = action.payload;
            logger.info('projectsReducer: ', projects);

            if(!Array.isArray(projects)) {
                logger.error('projectsReducer: projects is not an array');
                break;
            }

            projects.forEach(project => {
                if(project?.id) {
                    draft.projectsById[project.id] = project;
                }
            })
            break;
        }
    
        default:
            break;
    }
});

export default projectsReducer;