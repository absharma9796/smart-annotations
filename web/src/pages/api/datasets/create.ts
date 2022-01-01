import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import Axios from 'axios';
import { ApiResponse, ExtendedRequest } from 'src/dataTypes/api.type';
import { SampleEmailPassMap, SampleUsers } from 'src/dataTypes/user.type';
import logger from '@utils/logger';
import { authenticationMiddleware } from 'src/middlewares/authentication.mw';
import { AcceptableDatasetType, Dataset } from '@dataTypes/dataset.type';
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
    
    const { name, description, label_colors, data_type, maximum_voters, minimum_voters, minimum_consensus, labels } = req.body;
    if(!name || !data_type || !labels?.length) {
        res.status(400).json({
            success: false,
            message: 'Required fields cannot be empty'
        });
        return;
    }
    logger.info('Creating new dataset', name);
    //TODO: Update According to dataset type
    const dataset: Dataset = {
        name,
        description,
        data_type,
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
        label_colors,
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
    labels: string[];
    label_colors: string[];
    data_type: AcceptableDatasetType;
    maximum_voters: number;
    minimum_voters: number;
    minimum_consensus: number;
}
export const createDataset__api: (args: createDatasetApiProps) => Promise<ApiResponse> = async ({
    name,
    description,
    labels,
    label_colors,
    data_type,
    minimum_consensus,
    maximum_voters,
    minimum_voters
}) => {
    const url = '/api/datasets/create';
    let result: ApiResponse = {
        success: false,
    }
    await Axios.post(url, {
        name,
        description,
        labels,
        label_colors,
        data_type,
        minimum_consensus,
        maximum_voters,
        minimum_voters
    }).then(response => {
        result = {...result, ...response.data};
    }).catch(error => {
        result = {...result, message: error.message};
    })
    return result;
}