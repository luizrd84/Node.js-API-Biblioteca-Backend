import type { Request, Response } from "express";

import { pool } from "../database/db_connection.js";

//GetAll - /emprestimos
export async function emprestimoGetAll(req: Request, res: Response) {
  try {
    const result = await pool.query(`
      SELECT *
      FROM emprestimo
      ORDER BY data_emprestimo
    `);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar empréstimos" });
  }
}