# 🗄️ Banco de Dados SISFLUP

Este documento contém informações sobre a estrutura e configuração do banco de dados do sistema SISFLUP.

## 📋 Estrutura do Banco

### Tabelas Principais

1. **permissoes** - Níveis de permissão dos usuários
2. **setores** - Departamentos/setores da empresa
3. **usuarios** - Usuários do sistema
4. **bairros** - Dados geográficos (CEP, cidade, UF, bairro)
5. **atividades** - Projetos/atividades principais
6. **atividades_endereco** - Endereços das atividades

### Relacionamentos

- `usuarios` → `permissoes` (N:1)
- `usuarios` → `setores` (N:1)
- `atividades` → `setores` (N:1)
- `atividades_endereco` → `atividades` (1:1)
- `atividades_endereco` → `bairros` (N:1)

## 🚀 Configuração Inicial

### Pré-requisitos

1. PostgreSQL instalado e rodando
2. Banco de dados `sis_flup` criado
3. Usuário `postgres` com senha `!!R3n@t0` (conforme knexfile.tsx)

### Opção 1: Script Automático (Recomendado)

```bash
node setup_database.js
```

### Opção 2: Comandos Manuais

```bash
# Executar migrações
npx knex migrate:latest

# Popular com dados iniciais
npx knex seed:run
```

### Opção 3: SQL Direto

```bash
# Conectar ao PostgreSQL
psql -U postgres -d sis_flup

# Executar o script SQL
\i database_schema.sql
```

## 📊 Dados Iniciais

### Permissões
- Administrador
- Gerente
- Supervisor
- Operador
- Visualizador

### Setores (Workflow)
- Inativo (ID: 0)
- Vendas (ID: 1)
- Medição (ID: 2)
- Produção - Serra (ID: 3)
- Produção - Acabamento (ID: 4)
- Entrega (ID: 5)
- Instalação (ID: 6)
- Concluído (ID: 7)

### Usuários de Teste
| ID | Nome | Senha | Permissão | Setor |
|----|------|-------|-----------|-------|
| 1 | Administrador | admin123 | Administrador | Vendas |
| 2 | João Silva | joao123 | Gerente | Medição |
| 3 | Maria Santos | maria123 | Supervisor | Produção - Serra |
| 4 | Pedro Costa | pedro123 | Operador | Produção - Acabamento |
| 5 | Ana Oliveira | ana123 | Operador | Entrega |

## 🔧 Comandos Úteis

### Migrações
```bash
# Criar nova migração
npx knex migrate:make nome_da_migracao

# Executar migrações
npx knex migrate:latest

# Reverter última migração
npx knex migrate:rollback

# Ver status das migrações
npx knex migrate:status
```

### Seeds
```bash
# Criar novo seed
npx knex seed:make nome_do_seed

# Executar seeds
npx knex seed:run

# Executar seed específico
npx knex seed:run --specific=01_permissoes.js
```

### Backup e Restore
```bash
# Backup
pg_dump -U postgres -d sis_flup > backup.sql

# Restore
psql -U postgres -d sis_flup < backup.sql
```

## 📁 Estrutura de Arquivos

```
├── database_schema.sql          # Script SQL completo
├── setup_database.js           # Script de configuração automática
├── migrations/                 # Arquivos de migração
│   ├── 001_create_permissoes.js
│   ├── 002_create_setores.js
│   ├── 003_create_usuarios.js
│   ├── 004_create_bairros.js
│   ├── 005_create_atividades.js
│   └── 006_create_atividades_endereco.js
└── seeds/                      # Dados iniciais
    ├── 01_permissoes.js
    ├── 02_setores.js
    ├── 03_usuarios.js
    ├── 04_bairros.js
    ├── 05_atividades.js
    └── 06_atividades_endereco.js
```

## 🔐 Segurança

- Senhas são criptografadas usando a função `Encriptacao` do sistema
- Foreign keys com restrições apropriadas
- Índices para otimização de consultas
- Triggers para atualização automática de timestamps

## 🐛 Troubleshooting

### Erro de Conexão
- Verificar se o PostgreSQL está rodando
- Confirmar credenciais no `knexfile.tsx`
- Verificar se o banco `sis_flup` existe

### Erro de Migração
- Verificar se não há migrações pendentes
- Executar `npx knex migrate:status` para verificar status
- Em caso de erro, fazer rollback e executar novamente

### Erro de Seed
- Verificar se as tabelas foram criadas
- Confirmar se não há dados conflitantes
- Executar seeds individualmente para identificar problema

## 📞 Suporte

Para dúvidas ou problemas, verificar:
1. Logs do PostgreSQL
2. Logs da aplicação
3. Status das migrações
4. Conectividade com o banco
