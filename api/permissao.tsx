module.exports = (app) => {
  const getListaPermissoes = async (req, res) => {
    app
      .db
      .from("permissoes")
      .select("id", "nome")
      .orderBy("id")
      .then(listaPermissoes => {
        if (listaPermissoes && listaPermissoes.length > 0) {
          res.status(200).send(listaPermissoes)
        } else {
          res.status(404).send({ resposta: "Nenhuma permissão encontrada" })
        }
      })
      .catch(e => res.status(400).send({ resposta: e.message }))
  }
  return { getListaPermissoes: getListaPermissoes }
}