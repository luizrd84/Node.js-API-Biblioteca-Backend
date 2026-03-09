import { pool } from "./db_connection.js";

async function createTables() {

  await pool.query(`
    CREATE TABLE IF NOT EXISTS autor (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(200) NOT NULL,
      pais VARCHAR(100),
      nascimento DATE
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS editora (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(200) NOT NULL,
      pais VARCHAR(100)
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS livro (
      id SERIAL PRIMARY KEY,
      titulo VARCHAR(200) NOT NULL,
      autor_id INTEGER REFERENCES autor(id),
      editora_id INTEGER REFERENCES editora(id),
      ano INTEGER
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS categoria (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(100) NOT NULL
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS livro_categoria (
      livro_id INTEGER REFERENCES livro(id),
      categoria_id INTEGER REFERENCES categoria(id),
      PRIMARY KEY (livro_id, categoria_id)
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS usuario (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(200),
      email VARCHAR(200),
      cadastro DATE DEFAULT CURRENT_DATE
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS emprestimo (
      id SERIAL PRIMARY KEY,
      usuario_id INTEGER REFERENCES usuario(id),
      livro_id INTEGER REFERENCES livro(id),
      data_emprestimo DATE,
      data_devolucao DATE
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS avaliacao (
      id SERIAL PRIMARY KEY,
      usuario_id INTEGER REFERENCES usuario(id),
      livro_id INTEGER REFERENCES livro(id),
      nota INTEGER,
      comentario TEXT
    );
  `);

  console.log("Tabelas criadas");
}

async function seedData() {

  await pool.query(`
    INSERT INTO autor (nome, pais)
    VALUES
    ('George Orwell', 'Reino Unido'),
    ('J.R.R. Tolkien', 'Reino Unido'),
    ('Machado de Assis','Brasil'),
    ('Clarice Lispector','Brasil'),
    ('Stephen King','Estados Unidos'),
    ('Agatha Christie','Reino Unido'),
    ('Dan Brown','Estados Unidos'),
    ('J.K. Rowling','Reino Unido'),
    ('Isaac Asimov','Rússia'),
    ('Yuval Noah Harari','Israel'),
    ('Neil Gaiman','Reino Unido'),
    ('Arthur Conan Doyle','Reino Unido'),
    ('Ernest Hemingway','Estados Unidos'),
    ('Jane Austen','Reino Unido'),
    ('Franz Kafka','República Tcheca')
  `);

  await pool.query(`
    INSERT INTO editora (nome, pais)
    VALUES
    ('Companhia das Letras','Brasil'),
    ('Penguin','Reino Unido'),
    ('HarperCollins','Estados Unidos'),
    ('Random House','Estados Unidos'),
    ('Rocco','Brasil')
  `);

  await pool.query(`
    INSERT INTO categoria (nome)
    VALUES
    ('Fantasia'),
    ('Distopia'),
    ('Romance'),
    ('Mistério'),
    ('Terror'),
    ('Ficção Científica'),
    ('História'),
    ('Literatura Brasileira')
  `);

  await pool.query(`
    INSERT INTO livro (titulo, autor_id, editora_id, ano)
    VALUES
    ('1984',1,2,1949),
    ('A Revolução dos Bichos',1,2,1945),
    ('O Hobbit',2,2,1937),
    ('O Senhor dos Anéis',2,2,1954),
    ('Dom Casmurro',3,1,1899),
    ('Memórias Póstumas de Brás Cubas',3,1,1881),
    ('A Hora da Estrela',4,1,1977),
    ('Perto do Coração Selvagem',4,1,1943),
    ('O Iluminado',5,3,1977),
    ('It',5,3,1986),
    ('Carrie',5,3,1974),
    ('Assassinato no Expresso do Oriente',6,2,1934),
    ('Morte no Nilo',6,2,1937),
    ('O Código Da Vinci',7,3,2003),
    ('Anjos e Demônios',7,3,2000),
    ('Harry Potter e a Pedra Filosofal',8,5,1997),
    ('Harry Potter e a Câmara Secreta',8,5,1998),
    ('Harry Potter e o Prisioneiro de Azkaban',8,5,1999),
    ('Fundação',9,4,1951),
    ('Eu, Robô',9,4,1950),
    ('Sapiens',10,3,2011),
    ('Homo Deus',10,3,2015),
    ('Deuses Americanos',11,3,2001),
    ('Coraline',11,3,2002),
    ('Sherlock Holmes: Um Estudo em Vermelho',12,2,1887),
    ('O Cão dos Baskervilles',12,2,1902),
    ('O Velho e o Mar',13,4,1952),
    ('Por Quem os Sinos Dobram',13,4,1940),
    ('Orgulho e Preconceito',14,2,1813),
    ('Razão e Sensibilidade',14,2,1811),
    ('A Metamorfose',15,2,1915),
    ('O Processo',15,2,1925)
  `);

  await pool.query(`
    INSERT INTO usuario (nome, email)
    VALUES
    ('Luiz Ricardo','luiz@email.com'),
    ('Maria Silva','maria@email.com'),
    ('João Pereira','joao@email.com'),
    ('Ana Costa','ana@email.com'),
    ('Carlos Souza','carlos@email.com'),
    ('Fernanda Lima','fernanda@email.com'),
    ('Pedro Santos','pedro@email.com'),
    ('Juliana Rocha','juliana@email.com'),
    ('Ricardo Gomes','ricardo@email.com'),
    ('Patricia Alves','patricia@email.com'),
    ('Marcos Ribeiro','marcos@email.com'),
    ('Camila Martins','camila@email.com'),
    ('Lucas Fernandes','lucas@email.com'),
    ('Bruna Carvalho','bruna@email.com'),
    ('Gabriel Melo','gabriel@email.com'),
    ('Paula Teixeira','paula@email.com'),
    ('Rafael Araujo','rafael@email.com'),
    ('Larissa Farias','larissa@email.com'),
    ('Diego Barros','diego@email.com'),
    ('Vanessa Prado','vanessa@email.com')
  `);

  await pool.query(`
    INSERT INTO livro_categoria (livro_id, categoria_id)
    VALUES
    (1,2),
    (2,2),
    (3,1),
    (4,1),
    (5,8),
    (6,8),
    (9,5),
    (10,5),
    (11,5),
    (13,4),
    (14,4),
    (16,1),
    (17,1),
    (18,1),
    (19,6),
    (20,6),
    (21,7),
    (22,7)
  `);

  await pool.query(`
    INSERT INTO emprestimo (usuario_id, livro_id, data_emprestimo)
    VALUES
    (1,1,'2025-01-10'),
    (2,3,'2025-01-15'),
    (3,5,'2025-02-01'),
    (4,7,'2025-02-10'),
    (5,9,'2025-02-20'),
    (6,11,'2025-03-01'),
    (7,13,'2025-03-05'),
    (8,15,'2025-03-08'),
    (9,17,'2025-03-12'),
    (10,19,'2025-03-15'),
    (11,21,'2025-03-20'),
    (12,23,'2025-03-25')
  `);

  await pool.query(`
    INSERT INTO avaliacao (usuario_id, livro_id, nota, comentario)
    VALUES
    (1,1,5,'Excelente livro'),
    (2,3,5,'Fantástico'),
    (3,5,4,'Muito bom'),
    (4,7,4,'Gostei bastante'),
    (5,9,5,'Assustador e incrível'),
    (6,11,4,'Muito bom'),
    (7,13,5,'Mistério perfeito'),
    (8,15,4,'Envolvente'),
    (9,17,5,'Mágico'),
    (10,19,4,'Clássico da ficção científica'),
    (11,21,5,'Livro incrível'),
    (12,23,4,'Muito bom')
  `);

  console.log("Dados inseridos");
}

async function runSeed() {

  try {

    console.log("Criando tabelas...");
    await createTables();

    console.log("Inserindo dados...");
    await seedData();

    console.log("Seed finalizado");

  } catch (error) {

    console.error("Erro no seed", error);

  } finally {

    await pool.end();

  }
}

runSeed();