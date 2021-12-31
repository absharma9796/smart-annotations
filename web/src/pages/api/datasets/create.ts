import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import Axios from 'axios';
import { ApiResponse, ExtendedRequest } from 'src/dataTypes/api.type';
import { SampleEmailPassMap, SampleUsers } from 'src/dataTypes/user.type';
import logger from '@utils/logger';
import { authenticationMiddleware } from 'src/middlewares/authentication.mw';
import { Dataset } from '@dataTypes/dataset.type';
import { addItem, readItems } from '@utils/crudApis';
import crypto from 'crypto';
/**
 * Server Side Request Handlers
 */
const handler = nc<ExtendedRequest, NextApiResponse>();
handler.use(authenticationMiddleware);
/**
 * /datasets/create POST endpoint - server side
 *  Creates a new dataset
 */
handler.post(async (req, res) => {
    
    const { name, description, maximum_voters, minimum_voters, minimum_consensus, labels } = req.body;
    if(!name) {
        res.status(400).json({
            success: false,
            message: 'Dataset Name is required'
        });
        return;
    }
    logger.info('Creating new dataset', name);
    //TODO: Update According to dataset type
    const dataset: Dataset = {
        description,
        id: crypto.randomUUID(),
        source: req?.projectid,
        created_on: new Date().toISOString(),
        modified_on: new Date().toISOString(),
        maximum_voters: maximum_voters || 2,
        minimum_voters: minimum_voters || 2,
        is_delete: false,
        is_tagged: false,
        minimum_consensus: minimum_consensus || 2,
        labels,
        type: [1],
    }

    addItem('datasets', dataset).then(() => {
        res.status(200).json({
            success: true,
            data: dataset
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
type createDatasetApiProps = {
    name: string;
    description: string;
}
export const createDataset__api: (args: createDatasetApiProps) => Promise<ApiResponse> = async ({
    name,
    description
}) => {
    const url = '/api/datasets/create';
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