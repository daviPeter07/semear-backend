// =============================================================
// services/comunidadeService.js — Dados das comunidades.
//
// Rotas usadas:
//   GET /comunidades               → lista de comunidades (cadastro)
//   GET /coordenadora/agricultoras → comunidade da responsável logada
//                                    + agricultoras dessa comunidade
//
// ⚠️ Essas duas rotas ainda precisam ser criadas no back-end.
// Formatos esperados (combinar com Karol e João):
//
//   GET /comunidades
//   [ { "id": 1, "nome": "Comunidade Boa Esperança" }, ... ]
//
//   GET /coordenadora/agricultoras   (exige login de COORDENADORA)
//   {
//     "comunidade": { "id": 1, "nome": "Comunidade Boa Esperança" },
//     "agricultoras": [
//       { "id": 7, "nome": "Maria Souza", "contato": "92 99999-0000",
//         "totalPlantios": 3, "areaTotal": 80 }
//     ]
//   }
// =============================================================
import { requisicao } from './api';
import { COMUNIDADES } from '../config/dados';

/**
 * Lista as comunidades para o campo "Comunidade" do cadastro.
 * Enquanto a rota não existir, usa a lista fixa de config/dados.js.
 */
export async function listarComunidades() {
  try {
    const lista = await requisicao('/comunidades');
    return Array.isArray(lista) && lista.length ? lista : COMUNIDADES;
  } catch {
    // Rota ainda não existe ou servidor fora: não trava o cadastro
    return COMUNIDADES;
  }
}

/**
 * Busca a comunidade da responsável logada e suas agricultoras.
 * @returns {Promise<{comunidade:{id:number,nome:string}|null, agricultoras:Array}>}
 */
export async function listarAgricultorasDaComunidade() {
  const dados = await requisicao('/coordenadora/agricultoras');
  return {
    comunidade: dados?.comunidade || null,
    agricultoras: dados?.agricultoras || [],
  };
}
