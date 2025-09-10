const axios = require("axios")

module.exports = (app) => {
  const buscarCEP = async (req, res) => {
    const cep = String(req.params.cep).replace(".", "").replace("-", "")
    let consultaCompleta = {}
    if (cep.length <= 0) {
      res.status(404).send({ resposta: "Favor preencher o CEP." })
      return
    }

    await axios
      .get(`https://viacep.com.br/ws/${cep}/json/`)
      .then(r => {
        if (r && r.status === 200) {
          consultaCompleta = r.data

          if (consultaCompleta) {
            const bairroNormalizado = {
              nome_bairro: consultaCompleta.bairro,
              logradouro: consultaCompleta.logradouro,
              cidade: consultaCompleta.localidade,
              // cep: consultaCompleta.cep,
              uf: consultaCompleta.uf
            }
            res.status(200).send(bairroNormalizado)

           
          }
        }
        else {
          res.status(404).send({ resposta: "CEP inválido, favor verificar." })
          return
        }
      })
      .catch(e => {
        res.status(404).send({ resposta: "CEP inválido, favor verificar." })
        return
      })


  }

  const persistirNovoBairro = async (req, res) => {
    const { nome_bairro, cidade, uf, cep } = req.body

    if (!nome_bairro || !cidade || !uf || !cep) {
      res.status(400).send({ resposta: "Todos os campos são obrigatórios" })
      return
    }

    try {
      // Verificar se o bairro já existe
      const bairroExistente = await app
        .db
        .from("bairros")
        .where("cep", cep.replace("-", ""))
        .first()

      if (bairroExistente) {
        res.status(409).send({ resposta: "Bairro com este CEP já existe" })
        return
      }

      // Inserir novo bairro
      const novoBairro = await app
        .db
        .into("bairros")
        .insert({
          nome_bairro,
          cidade,
          uf,
          cep: cep.replace("-", "")
        })
        .returning("*")

      res.status(201).send({ resposta: "Bairro salvo com sucesso", bairro: novoBairro[0] })
    } catch (e) {
      res.status(400).send({ resposta: "Erro ao salvar bairro: " + e.message })
    }
  }

  return {
    buscarCEP: buscarCEP,
    persistirNovoBairro: persistirNovoBairro
  }

}