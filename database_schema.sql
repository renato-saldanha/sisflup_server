-- =============================================
-- SCRIPT DE CRIAÇÃO DO BANCO DE DADOS SISFLUP
-- =============================================

-- Criar banco de dados (se não existir)
-- CREATE DATABASE sis_flup;

-- Conectar ao banco sis_flup
-- \c sis_flup;

-- =============================================
-- TABELA: permissoes
-- =============================================
CREATE TABLE IF NOT EXISTS permissoes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- TABELA: setores
-- =============================================
CREATE TABLE IF NOT EXISTS setores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- TABELA: usuarios
-- =============================================
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    senha VARCHAR(500) NOT NULL,
    id_permissao INTEGER NOT NULL,
    id_setor INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign Keys
    CONSTRAINT fk_usuarios_permissao 
        FOREIGN KEY (id_permissao) REFERENCES permissoes(id) 
        ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_usuarios_setor 
        FOREIGN KEY (id_setor) REFERENCES setores(id) 
        ON DELETE RESTRICT ON UPDATE CASCADE
);

-- =============================================
-- TABELA: bairros
-- =============================================
CREATE TABLE IF NOT EXISTS bairros (
    id SERIAL PRIMARY KEY,
    nome_bairro VARCHAR(200) NOT NULL,
    cidade VARCHAR(200) NOT NULL,
    uf VARCHAR(2) NOT NULL,
    cep VARCHAR(8) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Índice para busca por CEP
    CONSTRAINT uk_bairros_cep UNIQUE (cep)
);

-- =============================================
-- TABELA: atividades
-- =============================================
CREATE TABLE IF NOT EXISTS atividades (
    id SERIAL PRIMARY KEY,
    nome_cliente VARCHAR(200) NOT NULL,
    nome_arquiteto VARCHAR(200) NOT NULL,
    data_entrega DATE NOT NULL,
    responsavel_vendas VARCHAR(200),
    responsavel_medicao VARCHAR(200),
    responsavel_producao_serra VARCHAR(200),
    responsavel_producao_acabamento VARCHAR(200),
    responsavel_entrega VARCHAR(200),
    responsavel_instalacao VARCHAR(200),
    responsavel_atual VARCHAR(200),
    observacoes TEXT,
    id_setor INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign Keys
    CONSTRAINT fk_atividades_setor 
        FOREIGN KEY (id_setor) REFERENCES setores(id) 
        ON DELETE RESTRICT ON UPDATE CASCADE
);

-- =============================================
-- TABELA: atividades_endereco
-- =============================================
CREATE TABLE IF NOT EXISTS atividades_endereco (
    id SERIAL PRIMARY KEY,
    id_atividade INTEGER NOT NULL,
    id_bairro INTEGER NOT NULL,
    logradouro VARCHAR(300) NOT NULL,
    numero VARCHAR(20),
    complemento VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign Keys
    CONSTRAINT fk_atividades_endereco_atividade 
        FOREIGN KEY (id_atividade) REFERENCES atividades(id) 
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_atividades_endereco_bairro 
        FOREIGN KEY (id_bairro) REFERENCES bairros(id) 
        ON DELETE RESTRICT ON UPDATE CASCADE,
    
    -- Uma atividade pode ter apenas um endereço
    CONSTRAINT uk_atividades_endereco_atividade UNIQUE (id_atividade)
);

-- =============================================
-- ÍNDICES PARA PERFORMANCE
-- =============================================

-- Índices para tabela usuarios
CREATE INDEX IF NOT EXISTS idx_usuarios_nome ON usuarios(nome);
CREATE INDEX IF NOT EXISTS idx_usuarios_permissao ON usuarios(id_permissao);
CREATE INDEX IF NOT EXISTS idx_usuarios_setor ON usuarios(id_setor);

-- Índices para tabela atividades
CREATE INDEX IF NOT EXISTS idx_atividades_cliente ON atividades(nome_cliente);
CREATE INDEX IF NOT EXISTS idx_atividades_arquiteto ON atividades(nome_arquiteto);
CREATE INDEX IF NOT EXISTS idx_atividades_data_entrega ON atividades(data_entrega);
CREATE INDEX IF NOT EXISTS idx_atividades_setor ON atividades(id_setor);
CREATE INDEX IF NOT EXISTS idx_atividades_responsavel_vendas ON atividades(responsavel_vendas);
CREATE INDEX IF NOT EXISTS idx_atividades_responsavel_medicao ON atividades(responsavel_medicao);
CREATE INDEX IF NOT EXISTS idx_atividades_responsavel_producao_serra ON atividades(responsavel_producao_serra);
CREATE INDEX IF NOT EXISTS idx_atividades_responsavel_producao_acabamento ON atividades(responsavel_producao_acabamento);
CREATE INDEX IF NOT EXISTS idx_atividades_responsavel_entrega ON atividades(responsavel_entrega);
CREATE INDEX IF NOT EXISTS idx_atividades_responsavel_instalacao ON atividades(responsavel_instalacao);

-- Índices para tabela bairros
CREATE INDEX IF NOT EXISTS idx_bairros_cidade ON bairros(cidade);
CREATE INDEX IF NOT EXISTS idx_bairros_uf ON bairros(uf);
CREATE INDEX IF NOT EXISTS idx_bairros_nome ON bairros(nome_bairro);

-- Índices para tabela atividades_endereco
CREATE INDEX IF NOT EXISTS idx_atividades_endereco_atividade ON atividades_endereco(id_atividade);
CREATE INDEX IF NOT EXISTS idx_atividades_endereco_bairro ON atividades_endereco(id_bairro);

-- =============================================
-- TRIGGERS PARA UPDATED_AT
-- =============================================

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para todas as tabelas
CREATE TRIGGER update_permissoes_updated_at 
    BEFORE UPDATE ON permissoes 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_setores_updated_at 
    BEFORE UPDATE ON setores 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_usuarios_updated_at 
    BEFORE UPDATE ON usuarios 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bairros_updated_at 
    BEFORE UPDATE ON bairros 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_atividades_updated_at 
    BEFORE UPDATE ON atividades 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_atividades_endereco_updated_at 
    BEFORE UPDATE ON atividades_endereco 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- COMENTÁRIOS DAS TABELAS
-- =============================================

COMMENT ON TABLE permissoes IS 'Tabela de permissões dos usuários do sistema';
COMMENT ON TABLE setores IS 'Tabela de setores/departamentos da empresa';
COMMENT ON TABLE usuarios IS 'Tabela de usuários do sistema com senhas criptografadas';
COMMENT ON TABLE bairros IS 'Tabela de dados geográficos (CEP, cidade, UF, bairro)';
COMMENT ON TABLE atividades IS 'Tabela principal de atividades/projetos';
COMMENT ON TABLE atividades_endereco IS 'Tabela de endereços das atividades';

-- =============================================
-- COMENTÁRIOS DAS COLUNAS PRINCIPAIS
-- =============================================

-- Tabela usuarios
COMMENT ON COLUMN usuarios.senha IS 'Senha criptografada do usuário';
COMMENT ON COLUMN usuarios.id_permissao IS 'Referência à tabela permissoes';
COMMENT ON COLUMN usuarios.id_setor IS 'Referência à tabela setores';

-- Tabela atividades
COMMENT ON COLUMN atividades.id_setor IS 'Setor atual da atividade (workflow)';
COMMENT ON COLUMN atividades.responsavel_atual IS 'Responsável atual pela atividade';
COMMENT ON COLUMN atividades.data_entrega IS 'Data prevista de entrega do projeto';

-- Tabela atividades_endereco
COMMENT ON COLUMN atividades_endereco.id_atividade IS 'Referência à tabela atividades';
COMMENT ON COLUMN atividades_endereco.id_bairro IS 'Referência à tabela bairros';
