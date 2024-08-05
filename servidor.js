import express from 'express'
import {PrismaClient} from '@prisma/client'

// Criação de uma instância do Prisma Client para interagir com o banco de dados
const prisma = new PrismaClient()

// Inicialização do aplicativo Express
const app = express()
app.use(express.json())

// Rota POST para criar um novo usuário
app.post('/usuarios', async (req, res) => {

    // Criação de um novo usuário no banco de dados com base nos dados recebidos no corpo da requisição
    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        } 
    })
    // Retorno de uma resposta com status 201 (Criado) e os dados do usuário criado
    res.status(201).json(req.body)
})

// Rota GET para listar todos os usuários ou filtrar por nome
app.get('/usuarios', async (req, res) => {
    let user = []
    
    // Verifica se há parâmetros de consulta (query) na requisição
    if(req.query) {
        user = await prisma.user.findMany({
            where: {
                name: req.query.name
            }
        })
    }
    // Lista todos os usuários
    const users = await prisma.user.findMany()
    res.status(200).json(users)
})

app.put('/usuarios/:id', async (req, res) => {


    await prisma.user.update({
    where: {
        id: req.params.id
    },
    data: {
        email: req.body.email,
        name: req.body.name,
        age: req.body.age
    } 
    })
    res.status(201).json(req.body)
})

// Deletar dados do usuários
app.delete('/usuarios/:id', async (req, res) => {
    // Exclusão do usuário com o ID especificado
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })
    // Retorno de uma resposta com status 200 (OK) e uma mensagem de sucesso
    res.status(200).json({ message: ' Usuário deletado com sucesso!'})
})
// Inicialização do servidor na porta 3000
app.listen(3000)
