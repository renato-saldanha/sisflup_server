module.exports = (app) => {
  const getListaAtividades = async (req, res) => {
    const descricao = req.params.descricao === "all" ? "" : req.params.descricao
    const filtro = req.params.filtro
    const id = req.params.id

    let db = app
      .db
      .from("atividades")
      .select("atividades.id", "atividades.nome_cliente", "atividades.endereco_cliente", "atividades.data_entrega", "atividades.nome_arquiteto",
        "atividades.responsavel_atual", "setores.nome as setor_atual", "responsavel_vendas", "observacoes", "responsavel_medicao", "responsavel_producao_serra",
        "responsavel_producao_acabamento", "responsavel_entrega", "responsavel_instalacao", "atividades.id_setor")
      .innerJoin("setores", "atividades.id_setor", "=", "setores.id")


    if (filtro !== undefined) {
      if (descricao !== "") {
        switch (filtro) {
          case "responsavel":
            db
              .whereLike("responsavel_vendas", `%${descricao}%`)
              .orWhereLike("responsavel_medicao", `%${descricao}%`)
              .orWhereLike("responsavel_producao_serra", `%${descricao}%`)
              .orWhereLike("responsavel_producao_acabamento", `%${descricao}%`)
              .orWhereLike("responsavel_entrega", `%${descricao}%`)
              .orWhereLike("responsavel_instalacao", `%${descricao}%`)
            break;
          case "data_entrega":
            db.where(descricao, "<=", filtro)
            break;
          default:
            db.whereLike(filtro, `%${descricao}%`)
        }
      }
    } else {
      db.where({ 'atividades.id_setor': id })
    }

    db
      .orderBy("id")
      .then((listaAtividades) => res.json(listaAtividades))
      .catch((e) =>
        res.status(400).send({ resposta: `houve um erro ao buscar atividade: ${e.message}` })
      )
  }

  const persistirAtividade = async (req, res) => {
    let novoId = -1
    if (req.body.id === -1) {
      await app
        .db
        .from("atividades")
        .select("atividades.id")
        .orderBy("atividades.id", "desc")
        .limit(1)
        .then((usuario) => {
          if (usuario.length > 0)
            novoId = usuario[0].id + 1
          else
            novoId = 1
        })
        .catch((e) => {
          res.status(404).send({ resposta: "Ocorreu um erro:" + e.message })
          return
        });
    }

    const novaAtividade = req.body.id < 0 ? true : false
    const id = req.body.id > 0 ? req.body.id : novoId
    const nome_cliente = req.body.nome_cliente
    const endereco_cliente = req.body.endereco_cliente
    const data_entrega = req.body.data_entrega
    const nome_arquiteto = req.body.nome_arquiteto
    const responsavel_vendas = req.body.responsavel_vendas
    const responsavel_medicao = req.body.responsavel_medicao
    const responsavel_producao_serra = req.body.responsavel_producao_serra
    const responsavel_producao_acabamento = req.body.responsavel_producao_acabamento
    const responsavel_entrega = req.body.responsavel_entrega
    const responsavel_instalacao = req.body.responsavel_instalacao
    const observacoes = req.body.observacoes


    if (!nome_cliente) {
      res.status(404).send({ resposta: "Favor informar o cliente" })
      return
    }

    if (!data_entrega) {
      res.status(404).send({ resposta: "Favor informar a data de entrega" })
      return
    }

    if (!endereco_cliente) {
      res.status(404).send({ resposta: "Favor informar o endereço do cliente" })
      return
    }

    if (!nome_arquiteto) {
      res.status(404).send({ resposta: "Favor informar o arquiteto" })
      return
    }

    novaAtividade
      ? app
        .db
        .insert({
          nome_cliente: nome_cliente,
          endereco_cliente: endereco_cliente,
          nome_arquiteto: nome_arquiteto,
          data_entrega: data_entrega,
          responsavel_vendas: responsavel_vendas,
          observacoes: observacoes,
          id_setor: 1
        })
        .into("atividades")
        .then(r => {
          if (r) {
            res.status(200).send("Atividade salva!")
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
          nome_cliente: nome_cliente,
          endereco_cliente: endereco_cliente,
          nome_arquiteto: nome_arquiteto,
          data_entrega: data_entrega,
          responsavel_vendas: responsavel_vendas,
          responsavel_medicao: responsavel_medicao,
          responsavel_producao_serra: responsavel_producao_serra,
          responsavel_producao_acabamento: responsavel_producao_acabamento,
          responsavel_entrega: responsavel_entrega,
          responsavel_instalacao: responsavel_instalacao,
          observacoes: observacoes,
        })
        .from("atividades")
        .where({ id: id })
        .then(r => {
          if (r) {
            res.status(200).send("Atividade alterada!")
            return
          }
        })
        .catch(e => {
          res.status(400).send({ resposta: "Ocorreu um erro: " + e.message })
          return
        })
  }

  const complementarAtividade = async (req, res) => {
    const id = req.body.id
    const responsavel_vendas = req.body.responsavel_vendas
    const responsavel_medicao = req.body.responsavel_medicao
    const responsavel_producao_serra = req.body.responsavel_producao_serra
    const responsavel_producao_acabamento = req.body.responsavel_producao_acabamento
    const responsavel_entrega = req.body.responsavel_entrega
    const responsavel_instalacao = req.body.responsavel_instalacao
    const responsavel_atual = req.body.responsavel_atual

    await app
      .db
      .update({
        responsavel_vendas: responsavel_vendas,
        responsavel_medicao: responsavel_medicao,
        responsavel_producao_serra: responsavel_producao_serra,
        responsavel_producao_acabamento: responsavel_producao_acabamento,
        responsavel_entrega: responsavel_entrega,
        responsavel_instalacao: responsavel_instalacao,
        responsavel_atual: responsavel_atual,
      })
      .from("atividades")
      .where({ id: id })
      .then(r => {
        if (r) {
          res.status(200).send("Atividade complementada!")
          return
        }
      })
      .catch(e => {
        res.status(400).send({ resposta: "Ocorreu um erro: " + e.message })
        return
      })
  }

  const concluirAtividade = async (req, res) => {
    const id = req.body.id
    const responsavel_atual = ""
    const id_setor = req.body.id_setor + 1

    await app
      .db
      .update({
        id_setor: id_setor,
        responsavel_atual: responsavel_atual,
      })
      .from("atividades")
      .where({ id: id })
      .then(r => {
        if (r) {
          res.status(200).send("Atividade concluída!")
          return
        }
      })
      .catch(e => {
        res.status(400).send({ resposta: "Ocorreu um erro: " + e.message })
        return
      })
  }

  const deletarAtividade = async (req, res) => {
    const id = req.params.id

    app
      .db
      .from('atividades')
      .where({ id: id })
      .del()
      .then(r => {
        if (r) {
          res.status(200).send("Atividade deletada!")
          return
        }
      })
      .catch(e => {
        res.status(400).send({ resposta: "Ocorreu um erro: " + e.message })
        return
      })
  }

  return {
    getListaAtividades: getListaAtividades,
    persistirAtividade: persistirAtividade,
    complementarAtividade: complementarAtividade,
    concluirAtividade: concluirAtividade,
    deletarAtividade: deletarAtividade
  }
}