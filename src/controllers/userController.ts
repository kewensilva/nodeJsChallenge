import { Request, Response } from "express";
import { prisma } from "../utils";
import {
  criptoPassword,
  validateEmail,
  validatePassword,
} from "../utils/validator";
export const userCreate = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const verifyUser = await prisma.user.findUnique({ where: { email } });
  if (!validateEmail(email)) {
    return res.status(400).send("Email inválido");
  }
  if (!validatePassword(password)) {
    return res
      .status(400)
      .send("Senha inválida, precisa ter 6 ou mais caracteres!");
  }
  if (verifyUser) {
    return res.status(404).json({ message: "Usuário já existente!" });
  }
  const cryptoPass = criptoPassword(password);
  const user = await prisma.user.create({
    data: {
      email,
      password: cryptoPass,
    },
  });
  return res.json({ mesage: "User created!" });
};
