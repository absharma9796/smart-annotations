import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import Axios from 'axios';
import { ApiResponse, ExtendedRequest } from 'src/dataTypes/api.type';
import { SampleEmailPassMap, SampleUsers } from 'src/dataTypes/user.type';
import logger from '@utils/logger';
import { authenticationMiddleware } from 'src/middlewares/authentication.mw';
import { Dataset } from '@dataTypes/dataset.type';
import { readItems } from '@utils/crudApis';

/**
 * Server Side Request Handlers
 */
const handler = nc<ExtendedRequest, NextApiResponse>();
handler.use(authenticationMiddleware);
/**
 * /datasets GET endpoint - server side 
 *  Gives a list of datasets
 */
handler.get(async (req, res) => {
    let datasets = null;
    try {
        datasets = await readItems("datasets");
        if(datasets) {
            res.status(200).json({
                success: true,
                data: datasets
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
export const getDatasets__api: () => Promise<ApiResponse<Dataset[]>> = async () => {
    const url = '/api/datasets';
    let result: ApiResponse<Dataset[]> = {
        success: false,
    }
    await Axios.get(url).then(response => {
        result = {...result, ...response.data};
    }).catch(error => {
        result = {...result, message: error.message};
    })
    return result;
}