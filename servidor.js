import express from 'express'
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())

app.post('/usuarios', async (req, res) => {
    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        } 
    })
    res.status(201).json(req.body)
})

app.get('/usuarios', async (req, res) => {
    let user = []

    if(req.query) {
        user = await prisma.user.findMany({
            where: {
                name: req.query.name
            }
        })
    }
    // lista todos os usuários
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
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({ message: ' Usuário deletado com sucesso!'})
})

app.listen(3000)
