const { Encriptacao } = require("../uteis/funcs.tsx")

module.exports = (app) => {
  const persistirUsuario =  (req, res) => {
    let novoId = -1
    if (req.body.id === -1) {
       app
        .db
        .select("id")
        .from("usuarios")
        .orderBy("id", "desc")
        .limit(1)
        .then((usuario) => {
          if (usuario)
            novoId = usuario[0].id + 1
          else
            novoId = 1
        })
        .catch((e) => {
          res.status(404).send({ resposta: "Ocorreu um erro:" + e.message })
          return
        });
    }

    const novoUsuario = !req.body.id || req.body.id < 0 ? true : false
    const id = req.body.id > 0 ? req.body.id : novoId
    const nome = req.body.nome
    const senha = req.body.senha
    const id_permissao = req.body.id_permissao
    const id_setor = req.body.id_setor

    if (!nome) {
      res.status(404).send({ resposta: "Favor informar o nome do usuário" })
      return
    }

    if (!senha) {
      res.status(404).send({ resposta: "Favor informar a senha do usuário" })
      return
    }

    if (id_permissao === null) {
      res.status(404).send({ resposta: "Favor informar a permissão do usuário" })
      return
    }

    if (id_setor === null) {
      res.status(404).send({ resposta: "Favor informar o setor do usuário" })
      return
    }

    const senhaEncriptada = Encriptacao(String(senha), String(id))

    novoUsuario
      ? app
        .db
        .insert({
          nome: nome,
          senha: senhaEncriptada,
          id_permissao: id_permissao,
          id_setor: id_setor
        })
        .into("usuarios")
        .then(r => {
          if (r) {
            res.status(200).send({ resposta: "Usuário salvo!" })
            return
          }
        })
        .catch(e => {
          res.status(400).send({ resposta: "Ocorreu um erro: " + e.message })
          return
        })
      : app
        .db
        .update({
          nome: nome,
          senha: senhaEncriptada,
          id_permissao: id_permissao,
          id_setor: id_setor
        })
        .from("usuarios")
        .where({ id: id })
        .then(r => {
          if (r) {
            res.status(200).send({ resposta: "Usuário alterado!" })
            return
          }
        })
        .catch(e => {
          res.status(400).send({ resposta: "Ocorreu um erro: " + e.message })
          return
        })
  }

  const getListaUsuarios = async (req, res) => {
    const descricao = req.params.descricao === "all" ? "" : req.params.descricao
    const filtro = req.params.filtro

    if (filtro !== undefined) {
      let db = app
        .db
        .from("usuarios")
        .select("usuarios.id", "usuarios.nome as nome", "usuarios.senha", "setores.nome as setor", "permissoes.nome as permissao", "usuarios.id_setor", "usuarios.id_permissao")
        .innerJoin("setores", "usuarios.id_setor", "=", "setores.id")
        .innerJoin("permissoes", "usuarios.id_permissao", "=", "permissoes.id")

      if (descricao !== "") db.whereLike(filtro, `%${descricao}%`)

      db
        .orderBy("id")
        .then((listaUsuarios) => res.json(listaUsuarios))
        .catch((e) =>
          res.status(400).send({ resposta: `houve um erro ao buscar usuários: ${e.message}` })
        )
    } else {
      app
        .db
        .from("usuarios")
        .select("usuarios.id", "usuarios.nome", "usuarios.senha", "usuarios.id_permissao", "usuarios.id_setor")
        .orderBy("id")
        .then((listaUsuarios) => {
          listaUsuarios.length > 0
            ? res.json(listaUsuarios)
            : res.status(404).send({ resposta: "Usuário não encontrado" })
        })
        .catch((e) =>
          res.status(400).send({ resposta: `Houve um erro ao buscar usuários: ${e.message}` })
        );
    }
  }

  const deletarUsuario = async (req, res) => {
    const id = req.params.id

    app
      .db
      .from('usuarios')
      .where({ id: id })
      .del()
      .then(r => {
        if (r) {
          res.status(200).send("Usuário deletado!")
          return
        }
      })
      .catch(e => {
        res.status(400).send({ resposta: "Ocorreu um erro: " + e.message })
        return
      })
  }


  return {
    persistirUsuario: persistirUsuario,
    getListaUsuarios: getListaUsuarios,
    deletarUsuario: deletarUsuario,
  }
}