/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('atividades').del();
  
  // Inserts seed entries
  await knex('atividades').insert([
    {
      id: 1,
      nome_cliente: 'João da Silva',
      nome_arquiteto: 'Arquiteto Carlos',
      data_entrega: '2024-12-15',
      responsavel_vendas: 'Maria Vendas',
      observacoes: 'Projeto de cozinha planejada',
      id_setor: 1 // Vendas
    },
    {
      id: 2,
      nome_cliente: 'Ana Costa',
      nome_arquiteto: 'Arquiteta Paula',
      data_entrega: '2024-12-20',
      responsavel_vendas: 'Pedro Vendas',
      observacoes: 'Projeto de quarto com guarda-roupa',
      id_setor: 2 // Medição
    },
    {
      id: 3,
      nome_cliente: 'Carlos Oliveira',
      nome_arquiteto: 'Arquiteto Roberto',
      data_entrega: '2024-12-25',
      responsavel_vendas: 'Maria Vendas',
      responsavel_medicao: 'João Medição',
      observacoes: 'Projeto de sala de estar',
      id_setor: 3 // Produção - Serra
    }
  ]);
};
