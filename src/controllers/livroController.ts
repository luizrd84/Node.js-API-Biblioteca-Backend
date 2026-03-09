import type { Request, Response } from "express";

import { pool } from "../database/db_connection.js";

//GetAll - /livros
export async function livroGetAll(req: Request, res: Response) {
  try {
    const result = await pool.query(`
      SELECT id, titulo, autor_id, editora_id, ano
      FROM livro
      ORDER BY id
    `);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar livros" });
  }
}

//GetById - /livros/:id
export async function livroGetById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const result = await pool.query(`
      SELECT id, titulo, autor_id, editora_id, ano
      FROM livro      
      WHERE id = $1
    `, [id] );
    res.json(result.rows[0]);
    if (result.rows.length === 0) {
        return res.status(404).json({ erro: "Livro não encontrado" });
    }
  } catch (error) {
    console.error(error);    
    res.status(500).json({ erro: "Erro ao buscar livro" });
  }
}

//GetByArgument - livros/busca?autor_id=x || titulo || editora_id || ano
export async function livroGetByArgument(req: Request, res: Response) {
  const { autor_id, titulo, editora_id, ano } = req.query;
  try {
    let query = "";
    let param: any;
    if (autor_id) {
      query = `SELECT * FROM livro WHERE autor_id = $1`;
      param = Number(autor_id);
    } 
    else if (titulo) {
      query = `SELECT * FROM livro WHERE titulo ILIKE $1`;
      param = `%${titulo}%`;
    } 
    else if (editora_id) {
      query = `SELECT * FROM livro WHERE editora_id = $1`;
      param = Number(editora_id);
    } 
    else if (ano) {
      query = `SELECT * FROM livro WHERE ano = $1`;
      param = Number(ano);
    } 
    else {
      return res.status(400).json({ erro: "Informe um parâmetro de busca" });
    }
    const result = await pool.query(query, [param]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar livros" });
  }
}


// GetAvaliacoes - /livros/:id/avaliacoes
export async function livroGetAvaliacoes(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const result = await pool.query( `
      SELECT a.nota, a.comentario, u.nome
      FROM avaliacao a
      INNER JOIN usuario u ON a.usuario_id = u.id
      WHERE a.livro_id = $1
      ORDER BY a.nota DESC
      `, [id] );
    if (result.rows.length === 0) {
      return res.status(404).json({ erro: "A busca não retornou resultados" });
    }
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar avaliações do livro" });

  }
}

// GetEmprestimos - /livros/:id/emprestimos
export async function livroGetEmprestimos(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const result = await pool.query( `   
      SELECT e.data_emprestimo, e.data_devolucao, u.nome, (e.data_devolucao IS NULL) AS emprestado
      FROM emprestimo e
      INNER JOIN usuario u ON e.usuario_id = u.id
      WHERE e.livro_id = $1
      ORDER BY e.data_emprestimo DESC
      `, [id] );
    if (result.rows.length === 0) {
      return res.status(404).json({ erro: "A busca não retornou resultados" });
    }
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar emprestimos do livro" });
  }
}

// GetCategorias - /livros/:id/categorias
export async function livroGetCategorias(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const result = await pool.query( `   
      SELECT c.id, c.nome
      FROM livro_categoria lc
      INNER JOIN categoria c ON lc.categoria_id = c.id
      WHERE lc.livro_id = $1
      `, [id] );
    if (result.rows.length === 0) {
      return res.status(404).json({ erro: "A busca não retornou resultados" });
    }
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar categorias do livro" });
  }
}

// POST - /livros
export async function livroCreate(req: Request, res: Response) {

  const { titulo, autor_id, editora_id, ano } = req.body;
  if (!titulo || !autor_id || !editora_id || !ano) {
    return res.status(400).json({ erro: "Faltam argumentos obrigatórios." });
  }
  try {
    const result = await pool.query(
      `
      INSERT INTO livro (titulo, autor_id, editora_id, ano)
      VALUES ($1, $2, $3, $4)
      RETURNING id, titulo, autor_id, editora_id, ano
      `, [titulo, autor_id, editora_id, ano]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao criar livro" });
  }
}

// PUT - /livros/:id
export async function livroUpdate(req: Request, res: Response) {
  const id = req.params.id;
  const { titulo, autor_id, editora_id, ano  } = req.body;
  if (!titulo || !autor_id || !editora_id || !ano) {
    return res.status(400).json({ erro: "Faltam argumentos obrigatórios." });
  }
  try {
    const result = await pool.query(
      `
      UPDATE livro
      SET titulo = $1, autor_id = $2, editora_id = $3, ano = $4
      WHERE id = $5
      RETURNING id, titulo, autor_id, editora_id, ano
      `, [titulo, autor_id, editora_id, ano, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ erro: "Livro não encontrado" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao atualizar livro" });
  }
}

// DELETE - /livros/:id
export async function livroDelete(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const result = await pool.query(
      `
      DELETE FROM livro
      WHERE id = $1
      RETURNING id
      `, [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ erro: "Livro não encontrado" });
    }
    res.json({ mensagem: "Livro deletado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao deletar livro" });
  }
}