function Ord(text) {
  return String(text).charCodeAt(0);
}

function Encriptacao(pass, chave) {
  let fator = 0;
  let senha = "";

  for (let index = 0; index < chave.length; index++) {
    fator += pass.length * Ord(chave[index]);
  }

  fator = Math.round(fator / 255);

  for (let index = 0; index < pass.length; index++) {
    senha = senha + (parseInt(String.fromCharCode(Ord(pass[index]))) ^ fator);
  }
  return senha;
}

module.exports = { Encriptacao: Encriptacao };