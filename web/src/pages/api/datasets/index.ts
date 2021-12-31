import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import Axios from 'axios';
import { ApiResponse, ExtendedRequest } from 'src/dataTypes/api.type';
import { SampleEmailPassMap, SampleUsers } from 'src/dataTypes/user.type';
import logger from '@utils/logger';
import { authenticationMiddleware } from 'src/middlewares/authentication.mw';
import { Project } from '@dataTypes/project.type';
import { readItems } from '@utils/crudApis';

/**
 * Server Side Request Handlers
 */
const handler = nc<ExtendedRequest, NextApiResponse>();
handler.use(authenticationMiddleware);
/**
 * /projects GET endpoint - server side 
 *  Gives a list of projects
 */
handler.get(async (req, res) => {
    let projects = null;
    try {
        projects = await readItems("projects");
        if(projects) {
            res.status(200).json({
                success: true,
                data: projects
            });
            return;
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
    return;
})

export default handler;

/**
 * Client Side Request Handlers
 */
export const getProjects__api: () => Promise<ApiResponse<Project[]>> = async () => {
    const url = '/api/projects';
    let result: ApiResponse<Project[]> = {
        success: false,
    }
    await Axios.get(url).then(response => {
        result = {...result, ...response.data};
    }).catch(error => {
        result = {...result, message: error.message};
    })
    return result;
}