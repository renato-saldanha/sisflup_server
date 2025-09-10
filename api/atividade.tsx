module.exports = (app) => {
  const getListaAtividades = async (req, res) => {
    const descricao = req.params.descricao === "all" ? "" : req.params.descricao
    const filtro = req.params.filtro
    const id = req.params.id

    let db = app
      .db
      .from("atividades")
      .select("atividades.id", "atividades.nome_cliente", "atividades.data_entrega", "atividades.nome_arquiteto",
        "atividades.responsavel_atual", "setores.nome as setor_atual", "atividades.responsavel_vendas", "observacoes", "atividades.responsavel_medicao", "atividades.responsavel_producao_serra",
        "atividades.responsavel_producao_acabamento", "atividades.responsavel_entrega", "atividades.responsavel_instalacao", "atividades.id_setor", "atividades_endereco.logradouro",
        "atividades_endereco.numero", "atividades_endereco.complemento", "bairros.cep","bairros.cidade","bairros.uf","bairros.nome_bairro")
      .innerJoin("atividades_endereco", "atividades_endereco.id_atividade", "=", "atividades.id")
      .innerJoin("bairros", "bairros.id", "=", "atividades_endereco.id_bairro")
      .innerJoin("setores", "atividades.id_setor", "=", "setores.id")


    if (filtro !== undefined) {
      if (descricao !== "") {
        switch (filtro) {
          case "responsavel":
            db
              .whereLike(app.db.raw("Lower(atividades.responsavel_vendas)"), `%${descricao}%`)
              .orWhereLike(app.db.raw("Lower(atividades.responsavel_medicao)"), `%${descricao}%`)
              .orWhereLike(app.db.raw("Lower(atividades.responsavel_producao_serra)"), `%${descricao}%`)
              .orWhereLike(app.db.raw("Lower(atividades.responsavel_producao_acabamento)"), `%${descricao}%`)
              .orWhereLike(app.db.raw("Lower(atividades.responsavel_entrega)"), `%${descricao}%`)
              .orWhereLike(app.db.raw("Lower(atividades.responsavel_instalacao)"), `%${descricao}%`)
            break;
          case "data_entrega":
            db.where("atividades.data_entrega", "<=", descricao)
            break;
          default:
            db.whereLike(app.db.raw(`Lower(${filtro})`), `%${descricao}%`)
        }
      }
    } else {
      db.where({ 'atividades.id_setor': id })
    }

    db
      .orderBy("atividades.id")
      .then((listaAtividades) => res.json(listaAtividades))
      .catch((e) =>
        res.status(400).send({ resposta: `houve um erro ao buscar atividade: ${e.message}` })
      )
  }

  const persistirAtividade = async (req, res) => {
    let idBairro = -1

    const novaAtividade = !req.body.id || req.body.id <= 0
    const id = req.body.id
    const nome_cliente = req.body.nome_cliente
    const cep = req.body.cep ? req.body.cep.replace("-", "") : ""
    const numero = req.body.numero
    const logradouro = req.body.logradouro
    const complemento = req.body.complemento
    const nome_bairro = req.body.nome_bairro
    const cidade = req.body.cidade
    const uf = req.body.uf
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

    if (!logradouro) {
      res.status(404).send({ resposta: "Favor informar o logradouro do cliente" })
      return
    }

    if (!nome_arquiteto) {
      res.status(404).send({ resposta: "Favor informar o arquiteto" })
      return
    }

    let idBairroEncontrado = -1
    try {
      const bairroExistente = await app
        .db
        .from("bairros")
        .select("id")
        .where("cep", cep)
        .first()
      
      if (bairroExistente) {
        idBairroEncontrado = bairroExistente.id
      }
    } catch (e) {
      console.error("Erro ao buscar bairro:", e.message)
    }

    if (idBairroEncontrado <= 0) {
      // Inserir novo bairro
      const novoBairro = await app
        .db
        .into("bairros")
        .insert({
          nome_bairro: nome_bairro,
          cidade: cidade,
          uf: uf,
          cep: cep
        })
        .returning("id")
      
      idBairro = novoBairro[0].id
    } else {
      idBairro = idBairroEncontrado
    }

    if (novaAtividade) {
      // Inserir nova atividade
      try {
        const idNovaAtividade = await app
          .db
          .insert({
            nome_cliente: nome_cliente,
            nome_arquiteto: nome_arquiteto,
            data_entrega: data_entrega,
            responsavel_vendas: responsavel_vendas,
            observacoes: observacoes,
            id_setor: 1
          })
          .into("atividades")
          .returning("id")

        // Inserir endereço da atividade
        await app
          .db
          .into("atividades_endereco")
          .insert({
            id_bairro: idBairro,
            logradouro: logradouro,
            numero: numero,
            id_atividade: idNovaAtividade[0].id,
            complemento: complemento
          })

        res.status(200).send("Atividade salva!")
        return
      } catch (e) {
        res.status(400).send({ resposta: "Ocorreu um erro: " + e.message })
        return
      }
    } else {
      // Atualizar atividade existente
      try {
        await app
          .db
          .update({
            nome_cliente: nome_cliente,
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

        // Atualizar endereço da atividade
        await app
          .db
          .update({
            id_bairro: idBairro,
            logradouro: logradouro,
            numero: numero,
            complemento: complemento
          })
          .from("atividades_endereco")
          .where({ id_atividade: id })

        res.status(200).send("Atividade alterada!")
        return
      } catch (e) {
        res.status(400).send({ resposta: "Ocorreu um erro: " + e.message })
        return
      }
    }
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

    if (!responsavel_atual) {
      res.status(404).send({ resposta: "Favor informar o responsável" })
      return
    }

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