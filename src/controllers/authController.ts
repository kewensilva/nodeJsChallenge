import { Request, Response } from "express";
import { prisma } from "../utils";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { validateEmail} from '../utils/validator';


export const authUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!validateEmail(email)) {
            return res.status(400).send('Email inválido');
        }

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado!" })
        }

        const token = sign({ id: user.id }, `${process.env.SECRET}`, { expiresIn: 300 })

        return res.json({ user, token })
    } catch (error) {
        console.error("Erro ao se autenticar:", error);
        return res.status(500).json({ message: "Erro no servidor" });
    }

}