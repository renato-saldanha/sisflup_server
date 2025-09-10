module.exports = (app) => {
  const getListaSetores = async (req, res) => {
    app
      .db
      .from("setores")
      .select("id", "nome")
      .orderBy("id")
      .where("id", "<>", 0)
      .then(listaSetores => res.json(listaSetores))
      .catch(e => res.status(400).send({ resposta: "Houve um problema ao coletar os dados dos setores: " + e.message }))
  }

  return { getListaSetores: getListaSetores }
}