# Teste Técnico: Desenvolvimento de Aplicação em Node.js com Front-end

## Descrição do Teste

Para avaliar suas habilidades técnicas e conhecimento das boas práticas de desenvolvimento, estamos solicitando que você realize um teste prático que será entregue de forma assíncrona. Você deverá desenvolver uma aplicação de Gerenciamento de Projetos que permitirá aos usuários criar e gerenciar projetos e suas respectivas tarefas. Esta aplicação é um pouco mais complexa do que uma simples lista de tarefas, pois envolve o gerenciamento de projetos com várias tarefas associadas a eles. As funcionalidades essenciais incluem:

1. **Criar um novo projeto:** Os usuários devem poder adicionar um novo projeto, incluindo um nome, uma descrição e a data de início.
2. **Listar todos os projetos:** Os usuários devem poder listar todos os projetos atualmente na lista.
3. **Adicionar tarefas a um projeto:** Os usuários devem poder adicionar tarefas a um projeto existente, incluindo um título, uma descrição e a data de conclusão da tarefa.
4. **Listar tarefas de um projeto:** Os usuários devem poder listar todas as tarefas associadas a um projeto específico.
5. **Marcar uma tarefa como concluída:** Os usuários devem poder marcar uma tarefa específica como concluída.
6. **Excluir uma tarefa:** Os usuários devem poder excluir uma tarefa de um projeto.

## Requisitos do Teste

- Utilize Node.js para criar a aplicação.
- Utilize um banco de dados relacional (MySQL, PostgreSQL, etc.) para armazenar projetos e tarefas.
- Crie endpoints RESTful para cada operação descrita acima.
- Desenvolva um frontend para a aplicação utilizando uma tecnologia da sua escolha.
- Integre o frontend com o backend para que os usuários possam interagir com a aplicação por meio de uma interface.
- Utilize uma ferramenta de controle de versão para versionar seu código e forneça o link do repositório.
- Documente o projeto, incluindo a estrutura do banco de dados, as rotas da API e instruções claras de como configurar e executar a aplicação.

## Tecnologias Utilizadas

- **Backend:** Node.js, Express.js, Sequelize (ORM para banco de dados relacional).
- **Frontend:**  React.js com Material UI.
- **Banco de Dados:** Sistema de gerenciamento de banco de dados relacional utilizado para armazenar dados estruturados de projetos e tarefas.
- **Controle de Versão:** Git (GitHub): Sistema de controle de versão distribuído para gerenciar o código-fonte do projeto de forma eficiente.
- **SuperTest** Biblioteca para testes HTTP integrados com Express.js, garantindo robustez nas APIs.

##  Funcionalidades Principais

### Cadastro de Projetos

Permite aos usuários criar novos projetos especificando nome, descrição e data de início.

### Listagem de Projetos

Exibe todos os projetos cadastrados, permitindo uma visão geral dos mesmos.

### Exclusão de Projetos
Permite aos usuários remover os projetos projeto, mantendo a lista de tarefas organizada e atualizada. Além disso, a exclusão é configurada para ser em cascata, garantindo consistência nos dados relacionados.

### Atualização de Projetos
Permite atualizar informações do projeto existentes, como nome, descrição e data de inicio.

### Adição de Tarefas

Permite aos usuários adicionar tarefas a projetos existentes, incluindo título, descrição e data de conclusão da tarefa.

### Listagem de Tarefas por Projeto

Mostra todas as tarefas associadas a um projeto específico, facilitando o gerenciamento detalhado de cada projeto.

### Atualização de Tarefas

Permite atualizar informações de tarefas existentes, como título, descrição e estado de conclusão.

### Exclusão de Tarefas

Permite aos usuários remover tarefas de um projeto, mantendo a lista de tarefas organizada e atualizada. Além disso, a exclusão é configurada para ser em cascata, garantindo consistência nos dados relacionados.

## Estrutura do Projeto

- `backend/`: Contém o código do servidor Node.js com a lógica de negócio e APIs RESTful.
- `frontend/`: Contém o código do cliente Frontend com a interface de usuário.


## Configuração e Execução
1. **Instalação de Dependências:**
    ```bash
    - Clone o repositório: git clone https://github.com/seu-usuario/gerenciador-de-tarefas.git
    - Acesse o diretório do projeto: cd frontend  execute npm install sweetalert2 && npm install e npm start
    - Acesse o diretório do projeto: cd server  e execute npm install e npm start   


### Configuração do Backend

1. **Configuração do Banco de Dados:**
   ```bash  
   - Acesse o diretório do backend: cd server
   - Renomeie o arquivo .env.exemplo para .env e configure as variáveis de ambiente para o banco de dados MySQL.

2. **Criar Tabelas:**
   ```bash  
   - Execute na pasta server: sequelize db:migrate 

2. **Criar Seeders:**
   ```bash  
   - Execute o seeders para preecnher as tabelas.
   - Execute na pasta server:  sequelize db:seed:all

## Realização de tests
1. **Instruções para Testes:**
    ```bash
   - Acesse o diretório do backend: cd server
   - Execute o comando para realizar os testes: npm run test

