/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('atividades_endereco').del();
  
  // Inserts seed entries
  await knex('atividades_endereco').insert([
    {
      id: 1,
      id_atividade: 1,
      id_bairro: 1, // Centro - São Paulo
      logradouro: 'Rua das Flores',
      numero: '123',
      complemento: 'Apto 45'
    },
    {
      id: 2,
      id_atividade: 2,
      id_bairro: 2, // Copacabana - Rio de Janeiro
      logradouro: 'Avenida Atlântica',
      numero: '456',
      complemento: 'Casa'
    },
    {
      id: 3,
      id_atividade: 3,
      id_bairro: 3, // Savassi - Belo Horizonte
      logradouro: 'Rua Pernambuco',
      numero: '789',
      complemento: 'Sobrado'
    }
  ]);
};
