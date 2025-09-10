/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('setores').del();
  
  // Inserts seed entries
  await knex('setores').insert([
    { id: 0, nome: 'Inativo' }, // Setor especial para atividades inativas
    { id: 1, nome: 'Vendas' },
    { id: 2, nome: 'Medição' },
    { id: 3, nome: 'Produção - Serra' },
    { id: 4, nome: 'Produção - Acabamento' },
    { id: 5, nome: 'Entrega' },
    { id: 6, nome: 'Instalação' },
    { id: 7, nome: 'Concluído' }
  ]);
};
