/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('atividades', function(table) {
    table.increments('id').primary();
    table.string('nome_cliente', 200).notNullable();
    table.string('nome_arquiteto', 200).notNullable();
    table.date('data_entrega').notNullable();
    table.string('responsavel_vendas', 200);
    table.string('responsavel_medicao', 200);
    table.string('responsavel_producao_serra', 200);
    table.string('responsavel_producao_acabamento', 200);
    table.string('responsavel_entrega', 200);
    table.string('responsavel_instalacao', 200);
    table.string('responsavel_atual', 200);
    table.text('observacoes');
    table.integer('id_setor').notNullable().defaultTo(1);
    table.timestamps(true, true);
    
    // Foreign Keys
    table.foreign('id_setor').references('id').inTable('setores').onDelete('RESTRICT').onUpdate('CASCADE');
    
    // Índices
    table.index('nome_cliente');
    table.index('nome_arquiteto');
    table.index('data_entrega');
    table.index('id_setor');
    table.index('responsavel_vendas');
    table.index('responsavel_medicao');
    table.index('responsavel_producao_serra');
    table.index('responsavel_producao_acabamento');
    table.index('responsavel_entrega');
    table.index('responsavel_instalacao');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('atividades');
};
