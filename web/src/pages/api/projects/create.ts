import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import Axios from 'axios';
import { ApiResponse, ExtendedRequest } from 'src/dataTypes/api.type';
import { SampleEmailPassMap, SampleUsers } from 'src/dataTypes/user.type';
import logger from '@utils/logger';
import { authenticationMiddleware } from 'src/middlewares/authentication.mw';
import { Project } from '@dataTypes/project.type';
import { addItem, readItems } from '@utils/crudApis';
import crypto from 'crypto';
/**
 * Server Side Request Handlers
 */
const handler = nc<ExtendedRequest, NextApiResponse>();
handler.use(authenticationMiddleware);
/**
 * /projects/create POST endpoint - server side
 *  Creates a new project
 */
handler.post(async (req, res) => {
    
    const { name, description } = req.body;
    if(!name) {
        res.status(400).json({
            success: false,
            message: 'Project Name is required'
        });
        return;
    }
    logger.info('Creating new project', name);
    const project: Project = {
        name,
        description,
        id: crypto.randomUUID(),
        created_by: req.userid,
        created_on: new Date().toISOString()
    }

    addItem('projects', project).then(() => {
        res.status(200).json({
            success: true,
            data: project
        });
    }).catch(error => {
        res.status(500).json({
            success: false,
            message: error.message
        });
    });
    return;
})

export default handler;

/**
 * Client Side Request Handlers
 */
type createProjectApiProps = {
    name: string;
    description: string;
}
export const createProject__api: (args: createProjectApiProps) => Promise<ApiResponse> = async ({
    name,
    description
}) => {
    const url = '/api/projects/create';
    let result: ApiResponse = {
        success: false,
    }
    await Axios.post(url, {
        name,
        description
    }).then(response => {
        result = {...result, ...response.data};
    }).catch(error => {
        result = {...result, message: error.message};
    })
    return result;
}