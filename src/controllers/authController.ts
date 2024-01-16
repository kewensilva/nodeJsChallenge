import { Request, Response } from "express";
import { prisma } from "../utils";
import { sign } from "jsonwebtoken";

import { validateEmail, comparePass } from "../utils/validator";
export const authUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email, password },
    });
    if (!validateEmail(email)) {
      return res.status(400).send("Email inválido");
    }
    if (!comparePass(password) && user?.password != password) {
      return res.status(400).send("Senhas Não conferem!");
    }
    if (!user?.email) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }
    const token = sign({ id: user.id }, `${process.env.SECRET}`, {
      expiresIn: 300,
    });
    return res.json({ email, token });
  } catch (error) {
    console.error("Erro ao se autenticar:", error);
    return res.status(500).json({ message: "Erro no servidor" });
  }
};
