/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('usuarios', function(table) {
    table.increments('id').primary();
    table.string('nome', 200).notNullable();
    table.string('senha', 500).notNullable();
    table.integer('id_permissao').notNullable();
    table.integer('id_setor').notNullable();
    table.timestamps(true, true);
    
    // Foreign Keys
    table.foreign('id_permissao').references('id').inTable('permissoes').onDelete('RESTRICT').onUpdate('CASCADE');
    table.foreign('id_setor').references('id').inTable('setores').onDelete('RESTRICT').onUpdate('CASCADE');
    
    // Índices
    table.index('nome');
    table.index('id_permissao');
    table.index('id_setor');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('usuarios');
};
