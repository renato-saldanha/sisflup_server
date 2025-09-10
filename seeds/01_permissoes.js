/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('permissoes').del();
  
  // Inserts seed entries
  await knex('permissoes').insert([
    { id: 1, nome: 'Administrador' },
    { id: 2, nome: 'Gerente' },
    { id: 3, nome: 'Supervisor' },
    { id: 4, nome: 'Operador' },
    { id: 5, nome: 'Visualizador' }
  ]);
};
