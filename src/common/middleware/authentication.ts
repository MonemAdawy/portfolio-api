import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
    user?: {
        username: string;
    };
}

const authSecret = process.env.AUTH_SECRET || "change_this_secret";

const isAuthenticated = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies?.token as string | undefined;
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, authSecret) as { user: { username: string } };
        req.user = decoded.user;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
};

export default isAuthenticated;



