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
        res.send(dado.options)
    }).catch(err => {
        return {err}
    })
})

app.post('/cadastrar',async (req, res)=>{
    const {cod, desc, local, fab, qnt} = req.body
    await Produto.create({
        cod,
        desc,
        local,
        fab,
        qnt
    
    }).then(e => {
        res.send(e)
   
    }).catch(err => res.send(err))
})

app.post('/listar', async (req, res)=>{
    const {cod, desc} = req.body
    console.log(req.body)
    if(!cod && !desc){
        const listaProdutos = await Produto.findAll()
        res.send(listaProdutos)

    } else if(cod){
        const listaProdutos = await Produto.findAll({
            where:{
                cod: cod
            }
        })
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
    const {cod, qnt} = req.body
    const produto = await Produto.findByPk(cod)
    produto.qnt += parseInt(qnt)
    produto.save()
    res.send(produto)
})

app.put('/saida',async (req, res) => {
    const {cod, qnt} = req.body
    const produto = await Produto.findByPk(cod)
    produto.qnt -= qnt
    produto.save()
    res.send(produto)
})

app.listen(3333, console.log('Rodando em http://localhost:3333'))

