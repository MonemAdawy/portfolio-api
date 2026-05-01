import { Request, Response } from "express";
import { AuthRequest } from "./auth.controller.js";
import { generateToken } from "../../common/utils/token/token.js";


const adminUsername = process.env.ADMIN_USERNAME;
const adminPassword = process.env.ADMIN_PASSWORD;

export const login = async (req: Request, res: Response, next: Function) => {
    const { id, username, password } = req.body;
    const loginName = id || username;

    if (loginName !== adminUsername || password !== adminPassword) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
    }


    const token = generateToken({
        payLoad: { user: { username: loginName } }, 
        options: { expiresIn: process.env.ACCESS_TOKEN_EXPIRY  }
    });

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 2,
    });
    res.json({ success: true, message: "Login successful" });
};



export const logout = async (req: Request, res: Response, next: Function) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "strict" : "none",
        secure: process.env.NODE_ENV === "production",
    });
    res.json({ success: true, message: "Logged out" });
}


export const getCurrentUser = async (req: AuthRequest, res: Response, next: Function) => {
    res.json({ success: true, user: req.user });
}