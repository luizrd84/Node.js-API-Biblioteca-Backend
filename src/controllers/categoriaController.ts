//buscar todas e por id apenas... mais para o front montar a pagina mesmo


import type { Request, Response } from "express";

import { pool } from "../database/db_connection.js";

//GetAll
export async function categoriaGetAll(req: Request, res: Response) {
  try {
    const result = await pool.query(`
      SELECT id, nome
      FROM categoria
      ORDER BY nome
    `);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar categorias" });
  }
}
