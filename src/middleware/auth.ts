import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
export interface CustomRequest extends Request {
  token: string | JwtPayload;
}
export function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new Error();
    }
    const decoded = jwt.verify(token, `${process.env.SECRET}`);
    (req as CustomRequest).token = decoded;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Token Inválido, usuário não autenticado!" });
  }
}
