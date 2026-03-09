import type { Request, Response } from "express";
import { pool } from "../database/db_connection.js";

//GetAll - /editoras
export async function editoraGetAll(req: Request, res: Response) {
  try {
    const result = await pool.query(`
      SELECT id, nome, pais
      FROM editora
      ORDER BY id
    `);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar editoras" });
  }
}

//GetById - /editoras/:id
export async function editoraGetById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const result = await pool.query(`
      SELECT id, nome, pais
      FROM editora      
      WHERE id = $1
    `, [id] );
    res.json(result.rows[0]);
    if (result.rows.length === 0) {
        return res.status(404).json({ erro: "Editora não encontrada" });
    }
  } catch (error) {
    console.error(error);    
    res.status(500).json({ erro: "Erro ao buscar editora" });
  }
}

//GetByArgument - editoras/busca?nome=x || pais
export async function editoraGetByArgument(req: Request, res: Response) {
  const { nome, pais } = req.query;
  try {
    let query = "";
    let param = "";
    if (nome) {
      query = `SELECT * FROM editora WHERE nome ILIKE $1`;
      param = `%${nome}%`;
    } 
    else if (pais) {
      query = `SELECT * FROM editora WHERE pais ILIKE $1`;
      param = `%${pais}%`;
    }     
    else {
      return res.status(400).json({ erro: "Informe um parâmetro de busca" });
    }
    const result = await pool.query(query, [param]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar editoras" });
  }
}

//GetLivrosPublicados - /editoras/:id/livrospublicados
export async function editoraGetLivrosPublicados(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const result = await pool.query( `
      SELECT l.titulo, a.nome AS autor, e.nome AS editora
      FROM livro l
      INNER JOIN autor a ON l.autor_id = a.id
      INNER JOIN editora e ON l.editora_id = e.id
      WHERE e.id = $1
      ORDER BY l.titulo;
      `, [id] );
    if (result.rows.length === 0) {
      return res.status(404).json({ erro: "A busca não retornou resultados" });
    }
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar livros publicados pela editora" });

  }
}

//GetAutoresParceiross - /editoras/:id/autoresparceiros
export async function editoraGetEditoresParceiros(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const result = await pool.query( `   
      SELECT DISTINCT e.nome AS editora, a.nome AS autor
      FROM livro l
      INNER JOIN autor a ON l.autor_id = a.id
      INNER JOIN editora e ON l.editora_id = e.id
      WHERE e.id = $1;
      `, [id] );
    if (result.rows.length === 0) {
      return res.status(404).json({ erro: "A busca não retornou resultados" });
    }
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar autores parceiros da editora" });
  }
}

// POST - /editoras
export async function editoraCreate(req: Request, res: Response) {

  const { nome, pais } = req.body;
  if (!nome || !pais) {
    return res.status(400).json({ erro: "Faltam argumentos obrigatórios." });
  }
  try {
    const result = await pool.query(
      `
      INSERT INTO editora (nome, pais)
      VALUES ($1, $2)
      RETURNING id, nome, pais
      `, [nome, pais]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao criar editora" });
  }
}

//PUT - /editoras/:id
export async function editoraUpdate(req: Request, res: Response) {
  const id = req.params.id;
  const { nome, pais } = req.body;
  if (!nome || !pais) {
    return res.status(400).json({ erro: "Faltam argumentos obrigatórios." });
  }
  try {
    const result = await pool.query(
      `
      UPDATE editora
      SET nome = $1, pais = $2
      WHERE id = $3
      RETURNING id, nome, pais
      `, [nome, pais, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ erro: "Editora não encontrada" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao atualizar editora" });
  }
}

//DELETE - /editoras/:id
export async function editoraDelete(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const result = await pool.query(
      `
      DELETE FROM editora
      WHERE id = $1
      RETURNING id
      `, [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ erro: "Editora não encontrada" });
    }
    res.json({ mensagem: "Editora deletada com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao deletar editora" });
  }
}