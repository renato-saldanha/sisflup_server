/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('atividades_endereco', function(table) {
    table.increments('id').primary();
    table.integer('id_atividade').notNullable();
    table.integer('id_bairro').notNullable();
    table.string('logradouro', 300).notNullable();
    table.string('numero', 20);
    table.string('complemento', 200);
    table.timestamps(true, true);
    
    // Foreign Keys
    table.foreign('id_atividade').references('id').inTable('atividades').onDelete('CASCADE').onUpdate('CASCADE');
    table.foreign('id_bairro').references('id').inTable('bairros').onDelete('RESTRICT').onUpdate('CASCADE');
    
    // Uma atividade pode ter apenas um endereço
    table.unique('id_atividade');
    
    // Índices
    table.index('id_atividade');
    table.index('id_bairro');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('atividades_endereco');
};
