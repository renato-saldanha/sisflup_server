/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('bairros', function(table) {
    table.increments('id').primary();
    table.string('nome_bairro', 200).notNullable();
    table.string('cidade', 200).notNullable();
    table.string('uf', 2).notNullable();
    table.string('cep', 8).notNullable().unique();
    table.timestamps(true, true);
    
    // Índices
    table.index('cidade');
    table.index('uf');
    table.index('nome_bairro');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('bairros');
};
