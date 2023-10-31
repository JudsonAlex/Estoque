const express = require('express')
const criarDB  = require('./controllers/controler-produto.js')
const Produto = require('./models/produto.js')
const cors =require('cors')
const {Op}  = require('sequelize')
var bodyParser = require('body-parser')

const path = require('path')
// const  fileURLToPath = require('url');

// const __filename = fileURLToPath(import.meta.url);

// const __dirname = path.dirname(__filename);

const app = express()

app.use(bodyParser.json({limit: "100mb"}))
app.use(express.json())
app.use(cors({}))
app.use(express.static(__dirname + '/public'))

app.get('/home', async function(req, res){
    const result = criarDB()
    result.then(async ()=>{
        // console.log(dado)
        const countProducts = await Produto.count()
        const produtosZerados = await Produto.count({
            where: {
                qnt: 0
            }
        })
        console.log("esses sao os produtos",countProducts)
        console.log("esses sao os produtos zerados",produtosZerados)
        res.send({countProducts, produtosZerados})
    }).catch(err => {
        return {err}
    })

})


app.post('/cadastrar',async (req, res)=>{
    
    const lista = req.body
    try{
        for (var item of lista){
            await Produto.create({
                cod: item.cod,
                desc: item.desc,
                local: item.local,
                fab: item.fab,
                qnt: item.qnt
            })
        }

        res.status(200).send("sucesso")
    } catch(error){
        console.log("\n\nEsse é o erro\n\n", error.name)
        res.status(422).send(error.name)
    }
})

app.post('/listar', async (req, res)=>{
    const {cod, desc} = req.body
    //console.log(req.body)
    if(!cod && !desc){
        const listaProdutos = await Produto.findAll()
        res.send(listaProdutos)

    } else if(cod){
        const listaProdutos = await Produto.findAll({
            where:{
                cod: cod
            }
        })
        // console.log("esse é o resuult", listaProdutos)
        res.send(listaProdutos)
    } else{
        const listaProdutos = await Produto.findAll({
            where: {
                desc: {
                    [Op.like]: '%'+desc+"%"
                }
            }
        })
        res.send(listaProdutos)
    }
})

app.put('/entrada',async (req, res) => {
    var mudancas = []
    for(var i in req.body){
        const {cod, qnt} = req.body[i]
        const produto = await Produto.findByPk(cod)
        produto.qnt += parseInt(qnt)
        await produto.save()
        mudancas.push(produto)
    }
    res.send(mudancas)
})

app.put('/saida',async (req, res) => {
    var mudancas = []
    for(var i in req.body){
        const {cod, qnt} = req.body[i]
        const produto = await Produto.findByPk(cod)
        produto.qnt -= parseInt(qnt)
        await produto.save()
        mudancas.push(produto)
    }
    res.send(mudancas)
})

app.put('/editar', async(req, res) =>{
    const dados = req.body
    const produto = await Produto.findByPk(dados.cod)
    produto.update(dados)
    res.send(produto)
})
    
app.listen(3333, console.log('Rodando em http://localhost:3333'))

module.exports = app
