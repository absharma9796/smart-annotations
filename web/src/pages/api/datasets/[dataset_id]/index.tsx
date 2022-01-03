import { ApiResponse, ExtendedRequest } from "@dataTypes/api.type";
import { NextApiResponse } from "next";
import { authenticationMiddleware } from "src/middlewares/authentication.mw";
import nc from 'next-connect';
import { Dataset } from "@dataTypes/dataset.type";
import Axios from "axios";
import { findAndUpdateItemById, findItemById, readItems } from "@utils/crudApis";
import logger from "@utils/logger";


//*********************************
//  Server Side Request Handlers **
//*********************************
 const handler = nc<ExtendedRequest, NextApiResponse>();
 handler.use(authenticationMiddleware);

/**
 * /dataset/:dataset_id GET endpoint - client side
 * Gives metadata for a given dataset
*/
handler.get(async (req, res) => {
    logger.info('GET /data', req.query);
    const dataset_id = req.query?.dataset_id as string;
    // logger.info(`GET /data?dataset_id=${dataset_id}`);
    if(!dataset_id) {
        res.status(400).json({
            success: false,
            message: "dataset_id is required"
        })
        return;
    }

    let dataset = null;
    try {

        dataset = await findItemById<Dataset>("datapoints", dataset_id);
        // logger.info({datapoints});
        if(dataset) {
            res.status(200).json({
                success: true,
                data: dataset
            });
            return;
        }

        res.status(404).json({
            success: true,
            message: dataset
        });
        return;

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
    return;
});


/**
 * /dataset/:dataset_id PUT endpoint - server side 
 * Updates a dataset
*/
handler.put(async (req, res) => {

    const dataset_id = req.query?.dataset_id as string;
    const data = req.body;

    logger.debug(`PUT /datasets/${dataset_id}`, {data});

    await findAndUpdateItemById("datasets", dataset_id, data).then((result) => {
        res.status(200).json({
            success: true,
            data: result
        });
        return;
    }).catch((error) => {
        res.status(500).json({
            success: false,
            message: error.message
        });
        return;
    });

    return;
})


export default handler;

//*********************************
//  Client Side Request Handlers **
//*********************************

/**
 * /dataset/:dataset_id GET endpoint - client side
 * Gives metadata for a given dataset
 */
export const getDatasetById__api: (dataset_id: string | number) => Promise<ApiResponse<Dataset>> = async (dataset_id) => {
    const url = `/api/datasets/${dataset_id}`;
    let result: ApiResponse<Dataset> = {
        success: false,
    }

    await Axios.get(url).then(response => {
        result = {...result, ...response.data};
    }).catch(error => {
        result = {...result, message: error.message};
    })

    return result;
}

/**
 * /dataset/:dataset_id PUT endpoint - client side 
 * Updates a dataset
*/
type UpdateDatasetApiProps = {
    data: {
        [key in keyof Dataset]?: Dataset[key]
    };
    dataset_id: string | number;
}
export const updateDataset__api: (args: UpdateDatasetApiProps) => Promise<ApiResponse<Dataset>> = async ({
    data,
    dataset_id,
}) => {
    const url = `/api/datasets/${dataset_id}`;
    let result: ApiResponse<Dataset> = {
        success: false,
    }

    await Axios.put(url, data).then(response => {
        result = {...result, ...response.data};
    }).catch(error => {
        result = {...result, message: error.message};
    })
    return result;
}