/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('bairros').del();
  
  // Inserts seed entries - Alguns bairros comuns do Brasil
  await knex('bairros').insert([
    { 
      id: 1, 
      nome_bairro: 'Centro', 
      cidade: 'São Paulo', 
      uf: 'SP', 
      cep: '01000000' 
    },
    { 
      id: 2, 
      nome_bairro: 'Copacabana', 
      cidade: 'Rio de Janeiro', 
      uf: 'RJ', 
      cep: '22000000' 
    },
    { 
      id: 3, 
      nome_bairro: 'Savassi', 
      cidade: 'Belo Horizonte', 
      uf: 'MG', 
      cep: '30112000' 
    },
    { 
      id: 4, 
      nome_bairro: 'Boa Viagem', 
      cidade: 'Recife', 
      uf: 'PE', 
      cep: '51000000' 
    },
    { 
      id: 5, 
      nome_bairro: 'Vila Madalena', 
      cidade: 'São Paulo', 
      uf: 'SP', 
      cep: '05400000' 
    },
    { 
      id: 6, 
      nome_bairro: 'Ipanema', 
      cidade: 'Rio de Janeiro', 
      uf: 'RJ', 
      cep: '22400000' 
    },
    { 
      id: 7, 
      nome_bairro: 'Centro', 
      cidade: 'Brasília', 
      uf: 'DF', 
      cep: '70000000' 
    },
    { 
      id: 8, 
      nome_bairro: 'Centro', 
      cidade: 'Salvador', 
      uf: 'BA', 
      cep: '40000000' 
    }
  ]);
};
