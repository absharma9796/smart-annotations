import { ApiResponse, ExtendedRequest } from "@dataTypes/api.type";
import { NextApiResponse } from "next";
import { authenticationMiddleware } from "src/middlewares/authentication.mw";
import nc from 'next-connect';
import Axios from "axios";
import { findAndUpdateItemById, findItemById, findItemByIdAndPartialUpdate, readItems } from "@utils/crudApis";
import logger from "@utils/logger";
import { User } from "@dataTypes/user.type";


//*********************************
//  Server Side Request Handlers **
//*********************************
 const handler = nc<ExtendedRequest, NextApiResponse>();
 handler.use(authenticationMiddleware);

 /**
 * /user/:user_id PATCH endpoint - server side 
 * Partially updates a user object
*/
handler.patch(async (req, res) => {

    const user_id = req?.query?.user_id as string;
    const data = req.body;

    logger.debug(`PUT /users/${user_id}`, {data});

    await findItemByIdAndPartialUpdate("users", user_id, data).then((result) => {
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
 * /user/:user_id PATCH endpoint - client side 
 * Updates a user
*/
type UpdateUserApiProps = {
    data: {
        [key in keyof User]?: User[key]
    };
    user_id: string | number;
}
export const updateUser__api: (args: UpdateUserApiProps) => Promise<ApiResponse<User>> = async ({
    data,
    user_id,
}) => {
    const url = `/api/users/${user_id}`;
    let result: ApiResponse<User> = {
        success: false,
    }

    await Axios.patch(url, data).then(response => {
        result = {...result, ...response.data};
    }).catch(error => {
        result = {...result, message: error.message};
    })
    return result;
}