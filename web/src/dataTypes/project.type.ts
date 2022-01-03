export const SampleProjectsList: Project[] = require('./projects.json');

export interface Project {
    id: number | string;
    name: string;
    description?: string;
    created_by: (number | string); // user id
    created_on: string;
}