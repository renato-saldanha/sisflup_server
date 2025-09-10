const { Encriptacao } = require("../uteis/funcs.tsx")

module.exports = (app) => {
  const persistirUsuario = async (req, res) => {
    const novoUsuario = !req.body.id || req.body.id <= 0
    const id = req.body.id
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

    try {
      if (novoUsuario) {
        // Inserir novo usuário
        const senhaEncriptada = Encriptacao(String(senha), "1") // Usar ID temporário para encriptação
        await app
          .db
          .insert({
            nome: nome,
            senha: senhaEncriptada,
            id_permissao: id_permissao,
            id_setor: id_setor
          })
          .into("usuarios")
        
        res.status(200).send({ resposta: "Usuário salvo!" })
      } else {
        // Atualizar usuário existente
        const senhaEncriptada = Encriptacao(String(senha), String(id))
        await app
          .db
          .update({
            nome: nome,
            senha: senhaEncriptada,
            id_permissao: id_permissao,
            id_setor: id_setor
          })
          .from("usuarios")
          .where({ id: id })
        
        res.status(200).send({ resposta: "Usuário alterado!" })
      }
    } catch (e) {
      res.status(400).send({ resposta: "Ocorreu um erro: " + e.message })
    }
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

      if (descricao !== "") db.whereLike(app.db.raw(`Lower(${filtro})`), `%${descricao}%`)

      db
        .orderBy("id")
        .then((listaUsuarios) => {
          const listaUsuariosSenhaDescriptografada = listaUsuarios
          for (let index = 0; index <= listaUsuariosSenhaDescriptografada.length - 1; index++) {
            listaUsuariosSenhaDescriptografada[index].senha = Encriptacao(String(listaUsuariosSenhaDescriptografada[index].senha), String(listaUsuariosSenhaDescriptografada[index].id))
          }
          res.json(listaUsuariosSenhaDescriptografada)
        })
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
          if (listaUsuarios.length > 0) {
            const listaUsuariosSenhaDescriptografada = listaUsuarios
            for (let index = 0; index <= listaUsuariosSenhaDescriptografada.length - 1; index++)
              listaUsuariosSenhaDescriptografada[index].senha = Encriptacao(String(listaUsuariosSenhaDescriptografada[index].senha), String(listaUsuariosSenhaDescriptografada[index].id))

            res.json(listaUsuariosSenhaDescriptografada)
          } else res.status(404).send({ resposta: "Usuário não encontrado" })
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