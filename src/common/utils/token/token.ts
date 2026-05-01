import jwt from 'jsonwebtoken';

export const generateToken = ({payLoad, signature = process.env.AUTH_SECRET, options = {}}: { payLoad: any; signature?: string; options?: any }): string => {
    return jwt.sign(payLoad, signature as string, options);
}


export const verifyToken = ({token, signature = process.env.AUTH_SECRET, options = {}}: { token: string; signature?: string; options?: any }): any => {
    return jwt.verify(token, signature as string, options);
}