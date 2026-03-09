import type { Request, Response } from "express";

import { pool } from "../database/db_connection.js";

//GetAll - /usuarios
export async function usuarioGetAll(req: Request, res: Response) {
  try {
    const result = await pool.query(`
      SELECT id, nome, email, cadastro
      FROM usuario
      ORDER BY id
    `);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar usuários" });
  }
}

//GetById - usuarios/:id
export async function usuarioGetById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const result = await pool.query(`
      SELECT id, nome, email, cadastro
      FROM usuario      
      WHERE id = $1
    `, [id] );
    res.json(result.rows[0]);
    if (result.rows.length === 0) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
    }
  } catch (error) {
    console.error(error);    
    res.status(500).json({ erro: "Erro ao buscar usuário" });
  }
}

//GetByName - usuarios/busca?nome=busca
export async function usuarioGetByName(req: Request, res: Response) {
  const nome = req.query.nome as string;
  console.log("Buscando nome:", nome);
  if (!req.query.nome) {
    return res.status(400).json({ erro: "Informe o nome para busca" });
  }
  try {
    const result = await pool.query(`
      SELECT id, nome, email, cadastro
      FROM usuario
      WHERE nome ILIKE $1
      ORDER BY nome
    `, [`%${nome}%`]);
    if (result.rows.length === 0) {
        return res.status(404).json({ erro: "Nenhum usuário encontrado com este argumento" });
    }
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar usuários" });
  }
}

// GetEmprestimos - /usuarios/:id/emprestimos
export async function usuarioGetEmprestimos(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const result = await pool.query( `
      SELECT l.id, l.titulo, l.ano,  e.data_emprestimo, e.data_devolucao
      FROM emprestimo e
      INNER JOIN livro l ON e.livro_id = l.id
      WHERE e.usuario_id = $1
      ORDER BY e.data_emprestimo DESC
      `, [id] );
    if (result.rows.length === 0) {
      return res.status(404).json({ erro: "A busca não retornou resultados" });
    }
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar empréstimos do usuário" });

  }
}

// GetAvaliacoes - /usuarios/:id/avaliacoes
export async function usuarioGetAvaliacoes(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const result = await pool.query( `
      SELECT l.id, l.titulo,  a.nota, a.comentario
      FROM avaliacao a
      INNER JOIN livro l ON a.livro_id = l.id
      WHERE a.usuario_id = $1
      ORDER BY a.nota DESC
      `, [id] );
    if (result.rows.length === 0) {
      return res.status(404).json({ erro: "A busca não retornou resultados" });
    }
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar avaliações do usuário" });

  }
}

// POST - /usuarios
export async function usuarioCreate(req: Request, res: Response) {
  const { nome, email } = req.body;
  if (!nome || !email) {
    return res.status(400).json({ erro: "Nome e email são obrigatórios" });
  }
  try {
    const result = await pool.query(
      `
      INSERT INTO usuario (nome, email)
      VALUES ($1, $2)
      RETURNING id, nome, email, cadastro
      `, [nome, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao criar usuário" });
  }
}

// PUT - /usuarios/:id
export async function usuarioUpdate(req: Request, res: Response) {
  const id = req.params.id;
  const { nome, email } = req.body;
  if (!nome || !email) {
    return res.status(400).json({ erro: "Nome e email são obrigatórios" });
  }
  try {
    const result = await pool.query(
      `
      UPDATE usuario
      SET nome = $1, email = $2
      WHERE id = $3
      RETURNING id, nome, email, cadastro
      `, [nome, email, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao atualizar usuário" });
  }
}

// DELETE - /usuarios/:id
export async function usuarioDelete(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const result = await pool.query(
      `
      DELETE FROM usuario
      WHERE id = $1
      RETURNING id
      `, [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }
    res.json({ mensagem: "Usuário deletado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao deletar usuário" });
  }
}



