import axios from "axios";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 300 });

export const searchCep = async (cep: string) => {
  try {
    const cacheDataCep = cache.get(cep);
    if (cacheDataCep) {
      return { fonte: "retorno do cache", data: cacheDataCep };
    }
    const resultCep = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    if (resultCep.status === 400) {
      return "CEP não encontrado";
    }
    cache.set(cep, resultCep.data);
    return { fonte: "retorno api via cep", data: resultCep.data };
  } catch (error) {
    console.log("Erro ao buscar CEP :");
    throw new Error(
      "Erro ao processar a requisição, Tente Colocar Novamente o CEP correto!"
    );
  }
};
