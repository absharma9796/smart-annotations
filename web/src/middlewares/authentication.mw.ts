import { NextApiResponse } from 'next';
import { ExtendedRequest } from '../dataTypes/api.type';
import logger from '@utils/logger';
import { SampleUsers, User } from 'src/dataTypes/user.type';
import { readItems } from '@utils/crudApis';

export const authenticationMiddleware = async (req: ExtendedRequest, res: NextApiResponse, next) => {
    
    const token: string = req.headers?.authorization as string;
    const email: string = req.headers?.user as string;

    const extractedToken: string = token?.split(' ')[1];

    const users = await readItems<User>('users');
    let user: User;
    if(Array.isArray(users) && users.length > 0) {
        user = users.find(user => user.email.toLowerCase() === email.toLowerCase());
    }

    logger.info('Authentication middleware', email, user?.id);

    if(!extractedToken || extractedToken !== process.env.API_ACCESS_TOKEN || !email || !user) {
        res.status(401);
        return res.json({
            success: false,
            message: 'Unauthorized session'
        })
    }
    
    req.token = extractedToken;
    req.userid = user.id;
    req.projectid = user.last_project_id;
    req.email = email;
    next();
}