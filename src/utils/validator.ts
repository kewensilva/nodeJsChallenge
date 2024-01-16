import { compareSync, hashSync } from "bcryptjs";

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
export const validateCep = (cep: string): boolean => {
  const cepRegex = /^[0-9]{8}$/;
  return cepRegex.test(cep);
};
export const validatePassword = (password: string): boolean => {
  const passwordRegex = /^.{6,}$/;
  return passwordRegex.test(password);
};
export const criptoPassword = (password: string) => {
  const passwordCripto = password;
  return hashSync(passwordCripto, 6);
};
export const comparePass = (password: string) => {
  const comaprePassword = password;
  return compareSync(comaprePassword, criptoPassword(password));
};
