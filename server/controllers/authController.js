import { prisma } from "../prismaClient.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import tokenCreate from "../utils/createToken.js";
import { error } from "node:console";

dotenv.config();

const register = async (req, res) => {
    try {
        const { email, username, password } = req.body
        if (!email || !username || !password) {
            return res.status(400).json({ error: "Fields must not be empty" })
        }

        const normalizedEmail = email.toLowerCase().trim();
        const normalizedUsername = username.trim()
        const emailCheck = await prisma.user.findUnique({
            where: {
                email: normalizedEmail
            },
            select: {
                id: true
            }
        })

        if (emailCheck) {
            return res.status(400).json({ error: "Email must be unique" })
        }

        const usernameCheck = await prisma.user.findUnique({
            where: {
                username: normalizedUsername
            },
            select: {
                id: true
            }
        })

        if (usernameCheck) {
            return res.status(400).json({ error: "Username must be unique" })
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const result = await prisma.user.create({
            data: {
                username: normalizedUsername,
                email: normalizedEmail,
                passwordHash: passwordHash
            },
            select: {
                id: true,
                username: true,
                email: true,
            }
        })

        const token = tokenCreate({ userId: result.id })
        res.status(201).json({ user: result, token })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const normalizedEmail = email.toLowerCase().trim();

        const userData = await prisma.user.findUnique({
            where: {
                email: normalizedEmail
            },
            select: {
                id: true,
                username: true,
                passwordHash: true
            }
        });

        if (!userData) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, userData.passwordHash);

        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = tokenCreate({
            userId: userData.id,
            username: userData.username
        });

        const safeUser = {
            id: userData.id,
            username: userData.username
        };

        return res.status(200).json({
            message: "Login successful",
            token,
            user: safeUser
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const isAuth = async (req, res) => {

    try {
        const userQuery = await prisma.user.findUnique({
            where: {
                id: req.user.userId
            },
            select: {
                id: true,
                username: true,
                email: true
            }
        })
        if (!userQuery) {
            return res.status(401).json({ error: "Invalid token" });
        }
        res.json({ user: userQuery });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default {
    register,
    login,
    isAuth
}