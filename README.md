# API Biblioteca

## Sobre o projeto

A **API Biblioteca** é uma aplicação backend desenvolvida para simular o gerenciamento de uma biblioteca, permitindo o controle de informações relacionadas a **livros, autores, editoras, categorias, usuários e empréstimos**.

A aplicação expõe uma **API REST**, possibilitando a realização de operações de consulta e manipulação de dados armazenados em um **banco de dados relacional**.

O projeto foi desenvolvido utilizando **Node.js**, **Express** e **PostgreSQL**, com acesso ao banco de dados realizado por meio da biblioteca **pg (node-postgres)**. Diferentemente de ORMs, essa biblioteca permite trabalhar diretamente com **comandos SQL nativos**, proporcionando maior controle sobre as consultas executadas.

O principal objetivo da aplicação é demonstrar o uso de **requisições HTTP integradas a consultas SQL**, explorando comandos **básicos e intermediários** do banco de dados, como:

- consultas com **SELECT**
- filtros com **WHERE**
- ordenação com **ORDER BY**
- relacionamentos entre tabelas utilizando **JOIN**
- utilização de **parâmetros em queries**

Dessa forma, o projeto serve como um exemplo prático de integração entre uma **API backend** e um **banco de dados relacional**, destacando a utilização direta de **SQL dentro de uma aplicação Node.js**.

---

## Tecnologias utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

- **Node.js** – Ambiente de execução JavaScript no servidor
- **Express** – Framework para criação de APIs REST
- **PostgreSQL** – Banco de dados relacional
- **node-postgres (pg)** – Biblioteca para conexão com PostgreSQL
- **Postman** – Ferramenta para teste dos endpoints da API

---

## Instalação do projeto

Siga os passos abaixo para executar o projeto localmente.

### Clonar o repositório

```bash
git clone https://github.com/luizrd84/Node.js-API-Biblioteca.git
```

### Acessar a pasta do projeto

```bash
cd seu-repositorio
```

### Instalar as dependências

```bash
npm install
```

---

## Configurando o banco de dados

Para executar o banco de dados localmente, é necessário utilizar **Docker** (recomendado: Docker Desktop).

### 1. Criar o arquivo de variáveis de ambiente

Na raiz do projeto, crie um arquivo chamado:

```
.env
```

Utilize como base o arquivo de exemplo disponível no projeto:

```
.env.exemple
```

Nesse arquivo você poderá definir as credenciais do banco de dados, como **usuário, senha e outras configurações necessárias**.

---

### 2. Configurar o Docker Compose

O projeto utiliza **Docker Compose** para criar um container com o banco de dados PostgreSQL.

Caso deseje alterar o usuário ou senha do banco, edite o arquivo:

```
docker-compose.yml
```

Ajustando as variáveis de ambiente conforme necessário.

---

### 3. Iniciar o banco de dados

Para iniciar o container do PostgreSQL, execute o comando abaixo na raiz do projeto:

```bash
docker compose up -d
```

Esse comando criará e iniciará o container do banco **em segundo plano**.

---

### 4. Popular o banco de dados

Após iniciar o container, execute o script responsável por criar as tabelas e inserir dados iniciais:

```bash
npm run database
```

Esse comando executará os **scripts SQL necessários para preparar o banco de dados da aplicação**.

---

## Executando o projeto

Após instalar as dependências, inicie o servidor com:

```bash
npm run dev
```

A API será iniciada e estará disponível em:

```
http://localhost:3000
```

---

## Testando a API com Postman

Para facilitar os testes dos endpoints, o projeto inclui uma **coleção do Postman** com todas as requisições já configuradas.

### Como importar a coleção

1. Abra o **Postman**
2. Clique no botão **Import**, localizado no canto superior esquerdo da interface
3. Selecione a opção **Upload Files**
4. Navegue até a pasta do projeto e selecione o arquivo:

```
docs/postman/Biblioteca.postman_collection.json
```

5. Clique em **Import**

Após a importação, a coleção **Biblioteca** aparecerá na aba **Collections** do Postman, contendo todos os endpoints organizados e prontos para uso.

Com isso, será possível **testar facilmente todas as rotas da API**.

---

## Visualizando o banco de dados (Recomendado: HeidiSQL)

Para visualizar e gerenciar os dados armazenados no banco de dados, recomenda-se utilizar o **HeidiSQL**, uma ferramenta gráfica para administração de bancos de dados.

### Criando uma nova conexão

Abra o HeidiSQL e crie uma nova conexão com os seguintes parâmetros:

```
Tipo de rede: PostgreSQL (TCP/IP)
Biblioteca: libpq-17.dll (ou outra versão disponível)
Servidor: 127.0.0.1
Porta: 5432
Usuário: postgres (ou o usuário definido no projeto)
Senha: postgres (ou a senha definida no projeto)
Banco de dados: biblioteca
```

Após estabelecer a conexão, as tabelas da aplicação estarão disponíveis dentro do schema:

```
public
```

A partir daí será possível **visualizar, editar e executar consultas diretamente no banco de dados**.

---

## Funcionalidades da API

A API permite realizar operações relacionadas a:

- Livros
- Autores
- Editoras
- Categorias
- Usuários
- Empréstimos
- Avaliações

Entre as principais funcionalidades estão:

- Listagem de registros
- Consulta por ID
- Relacionamentos entre entidades (ex: livros por autor ou editora)
- Consultas utilizando **JOINs no banco de dados**

---

## Futuros Updates

- Implementar **buscas paginadas**
- Implementar **autenticação**
- Criar uma **nova versão utilizando o Sequelize**

---

## Autor

Desenvolvido por **Luiz Ricardo Dias**.
