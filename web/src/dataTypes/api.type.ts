import { NextApiRequest } from "next";

export type ApiResponse<T = any> = {
    success: boolean;
    data?: T;
    message?: string;
    error?: any;
}

export interface ExtendedRequest extends NextApiRequest {
    token?: string;
    email?: string;
    userid?: (string | number);
    projectid?: number | string;
    files?: any;
}