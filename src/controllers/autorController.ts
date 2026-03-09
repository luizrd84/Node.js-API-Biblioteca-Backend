import type { Request, Response } from "express";
import { pool } from "../database/db_connection.js";

//GetAll
export async function autorGetAll(req: Request, res: Response) {
  try {
    const result = await pool.query(`
      SELECT id, nome, pais, nascimento
      FROM autor
      ORDER BY id
    `);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar autores" });
  }
}

//GetById/:id
export async function autorGetById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const result = await pool.query(`
      SELECT id, nome, pais, nascimento
      FROM autor     
      WHERE id = $1
    `, [id] );
    res.json(result.rows[0]);
    if (result.rows.length === 0) {
        return res.status(404).json({ erro: "Autor não encontrada" });
    }
  } catch (error) {
    console.error(error);    
    res.status(500).json({ erro: "Erro ao buscar autor" });
  }
}


//GetByArgument - autor/busca?nome=x | pais
export async function autorGetByArgument(req: Request, res: Response) {
  const { nome, pais } = req.query;
  try {
    let query = "";
    let param = "";
    if (nome) {
      query = `SELECT * FROM autor WHERE nome ILIKE $1`;
      param = `%${nome}%`;
    } 
    else if (pais) {
      query = `SELECT * FROM autor WHERE pais ILIKE $1`;
      param = `%${pais}%`;
    }     
    else {
      return res.status(400).json({ erro: "Informe um parâmetro de busca" });
    }
    const result = await pool.query(query, [param]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar autor" });
  }
}



//GetLivrosLancados - /autor/:id/livroslancados
export async function autorGetLivrosLancados(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const result = await pool.query( `
      SELECT l.titulo, a.nome
      FROM livro l
      INNER JOIN autor a ON l.autor_id = a.id
      WHERE a.id = $1
      ORDER BY l.titulo DESC;
      `, [id] );
    if (result.rows.length === 0) {
      return res.status(404).json({ erro: "A busca não retornou resultados" });
    }
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar os livros lançados" });

  }
}


//POST - /autor
export async function autorCreate(req: Request, res: Response) {
  const { nome, pais, nascimento } = req.body;
  if (!nome || !pais) {
    return res.status(400).json({ erro: "Nome e país são obrigatórios" });
  }
  try {
    const result = await pool.query(
      `
      INSERT INTO autor (nome, pais, nascimento)
      VALUES ($1, $2, $3)
      RETURNING id, nome, pais, nascimento
      `, [nome, pais, nascimento]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao criar autor" });
  }
}

//PUT - /autor/:id
export async function autorUpdate(req: Request, res: Response) {
  const id = req.params.id;
  const { nome, pais, nascimento } = req.body;
  if (!nome || !pais) {
    return res.status(400).json({ erro: "Nome e país são obrigatórios" });
  }
  try {
    const result = await pool.query(
      `
      UPDATE autor
      SET nome = $1, pais = $2, nascimento = $3
      WHERE id = $4
      RETURNING id, nome, pais, nascimento
      `, [nome, pais, nascimento, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ erro: "Autor não encontrado" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao atualizar autor" });
  }
}

// DELETE - /autor/:id
export async function autorDelete(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const result = await pool.query(
      `
      DELETE FROM autor
      WHERE id = $1
      RETURNING id
      `, [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ erro: "Autor não encontrado" });
    }
    res.json({ mensagem: "Autor deletado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao deletar autor" });
  }
}


