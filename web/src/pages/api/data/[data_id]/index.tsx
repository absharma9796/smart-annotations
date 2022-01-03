import { ApiResponse, ExtendedRequest } from "@dataTypes/api.type";
import { NextApiResponse } from "next";
import { authenticationMiddleware } from "src/middlewares/authentication.mw";
import nc from 'next-connect';
import { DataPoint } from "@dataTypes/datapoint.type";
import Axios from "axios";
import { findAndUpdateItemById } from "@utils/crudApis";
import logger from "@utils/logger";


//*********************************
//  Server Side Request Handlers **
//*********************************
 const handler = nc<ExtendedRequest, NextApiResponse>();
 handler.use(authenticationMiddleware);

/**
 * /data/:data_id PATCH endpoint - server side 
 * Updates a datapoint
*/
handler.put(async (req, res) => {

    const data_id = req.query?.data_id as string;
    const data = req.body;
    const { dataset_id } = req.headers;

    logger.debug(`PUT /data/${data_id}`, {data});

    await findAndUpdateItemById("datapoints", data_id, data).then((result) => {
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

type UpdateDatapointApiProps = {
    data: {
        [key in keyof DataPoint]?: DataPoint[key]
    };
    dataset_id: string | number;
    data_id: string | number;
}
export const updateDatapoint__api: (args: UpdateDatapointApiProps) => Promise<ApiResponse<DataPoint>> = async ({
    data,
    dataset_id,
    data_id
}) => {
    const url = `/api/data/${data_id}`;
    let result: ApiResponse<DataPoint> = {
        success: false,
    }

    await Axios.put(url, data, {
        headers: {
            dataset_id: `${dataset_id}`
        }
    }).then(response => {
        result = {...result, ...response.data};
    }).catch(error => {
        result = {...result, message: error.message};
    })
    return result;
}