module.exports = (app) => {
  // Rota de status
  app.get("/", (req, res) => {
    res.json({ 
      status: "OK", 
      message: "SISFLUP Backend está funcionando",
      timestamp: new Date().toISOString()
    })
  })

  app
    .route("/login")
    .post(app.api.login.login);

  app
    .route("/setor/getListaSetores")
    .get(app.api.setor.getListaSetores)

  app
    .route("/permissao/getListaPermissoes")
    .get(app.api.permissao.getListaPermissoes)

  app
    .route("/usuario/getListaUsuarios")
    .get(app.api.usuario.getListaUsuarios)

  app
    .route("/usuario/getListaUsuarios/:descricao&:filtro")
    .get(app.api.usuario.getListaUsuarios)

  app
    .route("/usuario/deletarUsuario/:id")
    .delete(app.api.usuario.deletarUsuario)

  app
    .route("/usuario/persistirUsuario")
    .post(app.api.usuario.persistirUsuario)
    .put(app.api.usuario.persistirUsuario)

  app
    .route("/atividade/getListaAtividades/:descricao&:filtro")
    .get(app.api.atividade.getListaAtividades)

  app
    .route("/atividade/getListaAtividades/:id")
    .get(app.api.atividade.getListaAtividades)

  app
    .route("/atividade/persistirAtividade")
    .post(app.api.atividade.persistirAtividade)

  app
    .route("/atividade/concluirAtividade")
    .put(app.api.atividade.concluirAtividade)

  app
    .route("/atividade/complementarAtividade")
    .put(app.api.atividade.complementarAtividade)

  app
    .route("/atividade/deletarAtividade/:id")
    .delete(app.api.atividade.deletarAtividade)

  app
    .route("/bairro/buscarCEP/:cep")
    .get(app.api.bairro.buscarCEP)

  app
    .route("/bairro/persistirBairro")
    .post(app.api.bairro.persistirNovoBairro)
}