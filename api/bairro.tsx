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

  function persistirNovoBairro(bairro) {
  
  }

  return {
    buscarCEP: buscarCEP
  }

}