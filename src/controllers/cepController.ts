import { Request, Response } from "express";
import * as cepMiddleware from "../middleware/cep";
import { validateCep } from "../utils/validator";

export const searchCep = async (req: Request, res: Response) => {
  const { cep } = req.params;
  try {
    if (!validateCep(cep)) {
      return res
        .status(400)
        .send(
          "CEP foi Digitado incorretamente, precisa conter 8 caracteres numericos!"
        );
    }
    const resultSearchCep = await cepMiddleware.searchCep(cep);
    res.json(resultSearchCep);
  } catch (error) {
    res.json({ error });
  }
};
