module.exports = (app) => {
  app
    .route("/login")
    .post(app.api.login.logar);

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
}