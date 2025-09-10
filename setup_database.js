#!/usr/bin/env node

/**
 * Script para configurar o banco de dados do SISFLUP
 * 
 * Este script executa as migrações e popula o banco com dados iniciais
 * 
 * Uso:
 * node setup_database.js
 */

const knex = require('./config/db.tsx');

async function setupDatabase() {
  try {
    console.log('🚀 Iniciando configuração do banco de dados...');
    
    // Executar migrações
    console.log('📋 Executando migrações...');
    await knex.migrate.latest();
    console.log('✅ Migrações executadas com sucesso!');
    
    // Executar seeds
    console.log('🌱 Populando banco com dados iniciais...');
    await knex.seed.run();
    console.log('✅ Dados iniciais inseridos com sucesso!');
    
    console.log('🎉 Banco de dados configurado com sucesso!');
    console.log('\n📊 Dados iniciais criados:');
    console.log('   - 5 permissões (Administrador, Gerente, Supervisor, Operador, Visualizador)');
    console.log('   - 8 setores (Vendas, Medição, Produção, etc.)');
    console.log('   - 5 usuários de exemplo');
    console.log('   - 8 bairros de exemplo');
    console.log('   - 3 atividades de exemplo');
    console.log('\n🔑 Usuários de teste:');
    console.log('   - ID: 1, Nome: Administrador, Senha: admin123');
    console.log('   - ID: 2, Nome: João Silva, Senha: joao123');
    console.log('   - ID: 3, Nome: Maria Santos, Senha: maria123');
    console.log('   - ID: 4, Nome: Pedro Costa, Senha: pedro123');
    console.log('   - ID: 5, Nome: Ana Oliveira, Senha: ana123');
    
  } catch (error) {
    console.error('❌ Erro ao configurar banco de dados:', error.message);
    process.exit(1);
  } finally {
    await knex.destroy();
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  setupDatabase();
}

module.exports = setupDatabase;
