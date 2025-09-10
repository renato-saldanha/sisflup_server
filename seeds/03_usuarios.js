/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('usuarios').del();
  
  // Importa a função de encriptação
  const { Encriptacao } = require('../uteis/funcs.tsx');
  
  // Inserts seed entries
  await knex('usuarios').insert([
    { 
      id: 1, 
      nome: 'Administrador', 
      senha: Encriptacao('admin123', '1'), // Senha: admin123
      id_permissao: 1, // Administrador
      id_setor: 1 // Vendas
    },
    { 
      id: 2, 
      nome: 'João Silva', 
      senha: Encriptacao('joao123', '2'), // Senha: joao123
      id_permissao: 2, // Gerente
      id_setor: 2 // Medição
    },
    { 
      id: 3, 
      nome: 'Maria Santos', 
      senha: Encriptacao('maria123', '3'), // Senha: maria123
      id_permissao: 3, // Supervisor
      id_setor: 3 // Produção - Serra
    },
    { 
      id: 4, 
      nome: 'Pedro Costa', 
      senha: Encriptacao('pedro123', '4'), // Senha: pedro123
      id_permissao: 4, // Operador
      id_setor: 4 // Produção - Acabamento
    },
    { 
      id: 5, 
      nome: 'Ana Oliveira', 
      senha: Encriptacao('ana123', '5'), // Senha: ana123
      id_permissao: 4, // Operador
      id_setor: 5 // Entrega
    }
  ]);
};
