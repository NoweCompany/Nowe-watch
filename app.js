require('dotenv').config()

//chama a aplicacao
const express = require('express')
const moongose = require('mongoose')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

const app = express()

// rota 
app.get('/', (req, res) => {
    res.status(200).json({msg: 'Ola mundo! <3'})
})


//credencial
const dbUser = process.env.BD_USER
const dbPassword = process.env.BD_PASSWORD


moongose
.connect(`mongodb+srv://${dbUser}:<${dbPassword}>@cluster0.hg1cpce.mongodb.net/?retryWrites=true&w=majority`)
.then(() => {
    app.listen(3000) //acesso a api
    console.log('conexao ok show')
})
.catch((err) => console.log(err)) //conecao e erros




