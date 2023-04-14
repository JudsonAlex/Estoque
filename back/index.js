import express, { json } from 'express'
import { criarDB } from './controllers/controler-produto.js'
import { Produto } from './models/produto.js'
import cors from 'cors'
import { Op } from 'sequelize'

const app = express()

app.use(json())
app.use(cors())

app.get('/', function(req, res){
    const result = criarDB()
    result.then((dado)=>{
        //console.log(dado.options)
        res.send(dado.status)
    }).catch(err => {
        return {err}
    })
})

app.post('/cadastrar',async (req, res)=>{
    // const {cod, desc, local, fab, qnt} = req.body
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

        res.send("sucesso")
    } catch(error){
        res.send(error)
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
    const {cod, qnt} = req.body
    const produto = await Produto.findByPk(cod)
    produto.qnt -= qnt
    produto.save()
    res.send(produto)
})

app.listen(3333, console.log('Rodando em http://localhost:3333'))

