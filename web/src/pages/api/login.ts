import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import Axios from 'axios';
import { ApiResponse } from 'src/dataTypes/api.type';
import { SampleEmailPassMap, SampleUsers, User } from 'src/dataTypes/user.type';
import logger from 'src/utils/logger';
import { readItems } from '@utils/crudApis';

/**
 * Server Side Request Handlers
 */
const handler = nc<NextApiRequest, NextApiResponse>();

/**
 * /login POST endpoint - server side
 */
handler.post(async (req, res) => {

    logger.debug(req.body);
    const email: string = req.body?.email;
    const password: string = req.body?.password;

    if(!email || !password) {
        res.status(400).json({
            success: false,
            message: 'Email and password are required'
        });
        return;
    }
    const users = await readItems<User>('users');
    const user = Array.isArray(users) ? users.find(user => user.email?.toLowerCase() === email?.toLowerCase()) : null;
    if(user) {
        if(SampleEmailPassMap[email.toLowerCase()] === password) {
            res.setHeader('Set-Cookie', [`token=Bearer ${process.env.API_ACCESS_TOKEN}; HttpOnly; Max-Age=${60*60}`, `user=${user?.email}; HttpOnly; Max-Age=${60*60}`]);
            res.status(200).json({
                success: true,
                data: {
                    token: process.env.API_ACCESS_TOKEN,
                    user: user?.email
                }
            });
        }
        return;
    }
})

export default handler;

/**
 * Client Side Request Handlers
 */
export const login__api: (email: string, password: string) => Promise<ApiResponse<any>> = async (email, password) => {
    const url = '/api/login';
    let result: ApiResponse<any> = {
        success: false,
    }
    await Axios.post(url, { email, password }).then(response => {
        result = {...result, ...response.data};
    }).catch(error => {
        result = {...result, message: error.message};
    })
    return result;
}