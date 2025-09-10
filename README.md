# 🏢 SISFLUP - Sistema de Gestão de Atividades

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13+-blue.svg)](https://postgresql.org/)
[![Express](https://img.shields.io/badge/Express-4.18+-lightgrey.svg)](https://expressjs.com/)
[![Knex.js](https://img.shields.io/badge/Knex.js-3.1+-orange.svg)](https://knexjs.org/)

Sistema de gestão de atividades para empresas de móveis planejados, desenvolvido com Node.js, Express e PostgreSQL.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [API Endpoints](#api-endpoints)
- [Estrutura do Banco](#estrutura-do-banco)
- [Usuários de Teste](#usuários-de-teste)
- [Desenvolvimento](#desenvolvimento)
- [Troubleshooting](#troubleshooting)
- [Contribuição](#contribuição)
- [Licença](#licença)

## 🎯 Sobre o Projeto

O SISFLUP é um sistema completo para gestão de atividades em empresas de móveis planejados. O sistema gerencia todo o fluxo de trabalho desde a venda até a instalação, incluindo:

- **Gestão de Usuários**: Sistema de permissões e setores
- **Gestão de Atividades**: Acompanhamento de projetos do início ao fim
- **Workflow de Setores**: Controle do fluxo entre departamentos
- **Gestão de Endereços**: Integração com CEP e dados geográficos
- **Relatórios**: Acompanhamento de responsáveis e prazos

## ✨ Funcionalidades

### 🔐 Autenticação e Autorização
- Sistema de login seguro
- Níveis de permissão (Administrador, Gerente, Supervisor, Operador, Visualizador)
- Controle de acesso por setor

### 📊 Gestão de Atividades
- Criação e edição de atividades
- Acompanhamento por setores (Vendas → Medição → Produção → Entrega → Instalação)
- Atribuição de responsáveis por etapa
- Controle de prazos e observações

### 🏢 Gestão de Setores
- 8 setores configurados (Vendas, Medição, Produção, etc.)
- Workflow automático entre setores
- Controle de responsáveis por setor

### 📍 Gestão de Endereços
- Integração com API ViaCEP
- Cadastro de bairros e cidades
- Validação automática de CEP

### 👥 Gestão de Usuários
- CRUD completo de usuários
- Associação com setores e permissões
- Senhas criptografadas

## 🛠 Tecnologias

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Knex.js** - Query builder para PostgreSQL
- **PostgreSQL** - Banco de dados relacional
- **Axios** - Cliente HTTP para APIs externas

### Ferramentas de Desenvolvimento
- **Nodemon** - Auto-reload em desenvolvimento
- **Consign** - Carregamento automático de módulos
- **CORS** - Cross-Origin Resource Sharing

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [PostgreSQL](https://postgresql.org/) (versão 13 ou superior)
- [Git](https://git-scm.com/)

## 🚀 Instalação

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd sisflup_server
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o banco de dados
```bash
# Crie o banco de dados no PostgreSQL
createdb sis_flup

# Execute as migrações e seeds
node setup_database.js
```

### 4. Configure as variáveis de ambiente (opcional)
Crie um arquivo `.env` na raiz do projeto:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_NAME=sis_flup
SERVER_HOST=192.168.1.14
SERVER_PORT=4000
NODE_ENV=development
```

## ⚙️ Configuração

### Configuração do Banco de Dados

O sistema usa PostgreSQL com as seguintes configurações padrão:

- **Host**: localhost
- **Porta**: 5432
- **Usuário**: postgres
- **Senha**: cyvsza5r (configurável)
- **Banco**: sis_flup

### Configuração do Servidor

- **Host**: 192.168.1.14
- **Porta**: 4000

## 🎮 Uso

### Iniciar o servidor
```bash
# Desenvolvimento
npm run dev

# Produção
npm start

# Ou diretamente
node index.tsx
```

### Acessar o sistema
O servidor estará disponível em: `http://192.168.1.14:4000`

### Verificar status
```bash
curl http://192.168.1.14:4000
```

## 📡 API Endpoints

### 🔐 Autenticação
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/login` | Autenticação de usuário |

### 👥 Usuários
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/usuario/getListaUsuarios` | Lista todos os usuários |
| GET | `/usuario/getListaUsuarios/:descricao&:filtro` | Busca usuários com filtro |
| POST/PUT | `/usuario/persistirUsuario` | Criar/editar usuário |
| DELETE | `/usuario/deletarUsuario/:id` | Deletar usuário |

### 📊 Atividades
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/atividade/getListaAtividades/:id` | Lista atividades por setor |
| GET | `/atividade/getListaAtividades/:descricao&:filtro` | Busca atividades com filtro |
| POST | `/atividade/persistirAtividade` | Criar nova atividade |
| PUT | `/atividade/complementarAtividade` | Complementar dados da atividade |
| PUT | `/atividade/concluirAtividade` | Concluir atividade (próximo setor) |
| DELETE | `/atividade/deletarAtividade/:id` | Deletar atividade |

### 🏢 Setores
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/setor/getListaSetores` | Lista todos os setores |

### 🔑 Permissões
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/permissao/getListaPermissoes` | Lista todas as permissões |

### 📍 Bairros
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/bairro/buscarCEP/:cep` | Busca dados do CEP |
| POST | `/bairro/persistirBairro` | Criar novo bairro |

### 📊 Status
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/` | Status do servidor |

## 🗄️ Estrutura do Banco

### Tabelas Principais

#### `usuarios`
- **id** (SERIAL PRIMARY KEY)
- **nome** (VARCHAR)
- **senha** (VARCHAR) - Criptografada
- **id_permissao** (INTEGER) - FK para permissoes
- **id_setor** (INTEGER) - FK para setores

#### `atividades`
- **id** (SERIAL PRIMARY KEY)
- **nome_cliente** (VARCHAR)
- **nome_arquiteto** (VARCHAR)
- **data_entrega** (DATE)
- **responsavel_vendas** (VARCHAR)
- **responsavel_medicao** (VARCHAR)
- **responsavel_producao_serra** (VARCHAR)
- **responsavel_producao_acabamento** (VARCHAR)
- **responsavel_entrega** (VARCHAR)
- **responsavel_instalacao** (VARCHAR)
- **responsavel_atual** (VARCHAR)
- **observacoes** (TEXT)
- **id_setor** (INTEGER) - FK para setores

#### `atividades_endereco`
- **id** (SERIAL PRIMARY KEY)
- **id_atividade** (INTEGER) - FK para atividades
- **id_bairro** (INTEGER) - FK para bairros
- **logradouro** (VARCHAR)
- **numero** (VARCHAR)
- **complemento** (VARCHAR)

#### `bairros`
- **id** (SERIAL PRIMARY KEY)
- **nome_bairro** (VARCHAR)
- **cidade** (VARCHAR)
- **uf** (VARCHAR)
- **cep** (VARCHAR) - UNIQUE

#### `setores`
- **id** (SERIAL PRIMARY KEY)
- **nome** (VARCHAR) - UNIQUE

#### `permissoes`
- **id** (SERIAL PRIMARY KEY)
- **nome** (VARCHAR) - UNIQUE

### Relacionamentos
- `usuarios` → `permissoes` (N:1)
- `usuarios` → `setores` (N:1)
- `atividades` → `setores` (N:1)
- `atividades_endereco` → `atividades` (1:1)
- `atividades_endereco` → `bairros` (N:1)

## 👤 Usuários de Teste

O sistema vem com usuários pré-configurados para teste:

| ID | Nome | Senha | Permissão | Setor |
|----|------|-------|-----------|-------|
| 1 | Administrador | admin123 | Administrador | Vendas |
| 2 | João Silva | joao123 | Gerente | Medição |
| 3 | Maria Santos | maria123 | Supervisor | Produção - Serra |
| 4 | Pedro Costa | pedro123 | Operador | Produção - Acabamento |
| 5 | Ana Oliveira | ana123 | Operador | Entrega |

### Setores Disponíveis
1. **Vendas** - Recebimento de novos projetos
2. **Medição** - Medição e dimensionamento
3. **Produção - Serra** - Corte de madeira
4. **Produção - Acabamento** - Acabamento e montagem
5. **Entrega** - Preparação para entrega
6. **Instalação** - Instalação no local
7. **Concluído** - Projeto finalizado

## 🛠 Desenvolvimento

### Estrutura do Projeto
```
sisflup_server/
├── api/                    # APIs do sistema
│   ├── atividade.tsx      # Gestão de atividades
│   ├── bairro.tsx         # Gestão de bairros
│   ├── login.tsx          # Autenticação
│   ├── permissao.tsx      # Gestão de permissões
│   ├── setor.tsx          # Gestão de setores
│   └── usuario.tsx        # Gestão de usuários
├── config/                # Configurações
│   ├── db.tsx            # Conexão com banco
│   ├── environment.js    # Configurações de ambiente
│   ├── middlewares.tsx   # Middlewares do Express
│   └── routes.tsx        # Definição de rotas
├── migrations/           # Migrações do banco
├── seeds/               # Dados iniciais
├── uteis/               # Funções utilitárias
│   └── funcs.tsx       # Função de encriptação
├── index.tsx            # Arquivo principal
├── knexfile.tsx         # Configuração do Knex
└── package.json         # Dependências
```

### Comandos Úteis

```bash
# Executar migrações
npx knex migrate:latest

# Executar seeds
npx knex seed:run

# Ver status das migrações
npx knex migrate:status

# Reverter migração
npx knex migrate:rollback

# Criar nova migração
npx knex migrate:make nome_da_migracao

# Criar novo seed
npx knex seed:make nome_do_seed
```

### Logs
O sistema possui logging automático de todas as requisições:
```
2025-09-09T23:09:20.059Z - GET /
2025-09-09T23:09:22.877Z - GET /setor/getListaSetores
2025-09-09T23:10:09.509Z - GET /permissao/getListaPermissoes
```

## 🔧 Troubleshooting

### Problemas Comuns

#### 1. Erro de Conexão com Banco
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
**Solução**: Verifique se o PostgreSQL está rodando e as credenciais estão corretas.

#### 2. Erro de Chave Primária Duplicada
```
duplicate key value violates unique constraint
```
**Solução**: Execute `node setup_database.js` para recriar o banco com dados limpos.

#### 3. Porta já em uso
```
Error: listen EADDRINUSE: address already in use
```
**Solução**: Pare outros processos Node.js ou mude a porta no arquivo de configuração.

#### 4. CEP não encontrado
```
CEP inválido, favor verificar
```
**Solução**: Verifique se o CEP está no formato correto (8 dígitos) e se a API ViaCEP está acessível.

### Comandos de Diagnóstico

```bash
# Verificar status do banco
node -e "const knex = require('./config/db.tsx'); knex.raw('SELECT 1').then(() => console.log('Banco OK')).catch(console.error).finally(() => knex.destroy())"

# Verificar processos Node.js
tasklist | findstr node

# Parar todos os processos Node.js
taskkill /F /IM node.exe

# Verificar porta em uso
netstat -an | findstr :4000
```

## 📝 Exemplos de Uso

### Login
```bash
curl -X POST http://192.168.1.14:4000/login \
  -H "Content-Type: application/json" \
  -d '{"id": 1, "senha": "admin123"}'
```

### Criar Nova Atividade
```bash
curl -X POST http://192.168.1.14:4000/atividade/persistirAtividade \
  -H "Content-Type: application/json" \
  -d '{
    "nome_cliente": "João Silva",
    "nome_arquiteto": "Arquiteto Carlos",
    "data_entrega": "2024-12-31",
    "responsavel_vendas": "Maria Vendas",
    "observacoes": "Projeto de cozinha",
    "cep": "78000000",
    "numero": "123",
    "logradouro": "Rua das Flores",
    "complemento": "Casa",
    "nome_bairro": "Centro",
    "cidade": "Cuiabá",
    "uf": "MT"
  }'
```

### Buscar CEP
```bash
curl http://192.168.1.14:4000/bairro/buscarCEP/01000000
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código
- Use async/await para operações assíncronas
- Sempre trate erros com try/catch
- Use nomes descritivos para variáveis e funções
- Documente funções complexas
- Mantenha consistência na formatação

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Renato Saldanha**
- Email: [seu-email@exemplo.com]
- LinkedIn: [seu-linkedin]

## 🙏 Agradecimentos

- [Express.js](https://expressjs.com/) - Framework web
- [Knex.js](https://knexjs.org/) - Query builder
- [PostgreSQL](https://postgresql.org/) - Banco de dados
- [ViaCEP](https://viacep.com.br/) - API de CEP

---

**⭐ Se este projeto foi útil para você, considere dar uma estrela!**
