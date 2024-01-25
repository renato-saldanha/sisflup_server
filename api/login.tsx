const { Encriptacao } = require("../uteis/funcs.tsx")

module.exports = (app) => {

  const logar = async (req, res) => {
    const id = req.body.id;
    const senha = req.body.senha;

    if (id == 0) {
      res.status(400).send({ resposta: "Favor informar o usuário!" });
      return;
    }

    if (senha == 0) {
      res.status(400).send({ resposta: "Favor digitar a senha!" });
      return;
    }

    const senhaEncriptada = Encriptacao(senha, id);

    app
      .db
      .from("usuarios")
      .select('id', 'nome', 'senha', 'id_permissao', 'id_setor')
      .where('id', parseInt(id))
      .andWhere('senha', senhaEncriptada)
      .then((usuario) => {
        if (!usuario[0]) {
          res.status(404).send({ resposta: "Senha não confere!" })
          return
        }

        if (usuario[0].senha === senhaEncriptada) res.status(200).send({ usuario: usuario[0] })
      })
      .catch((e) => res.status(404).send({ resposta: "Ocorreu um erro:" + e }));
  };

  return { logar };
};