import express from 'express'

const app = express()
const PORT = 3000

let usuarios = [];
let contador = 1;

app.use(express.json())

//ROTA DE TESTE
app.get("/status", (req, res) => {
  res.json({message: "API Online"})
})

//ROTA GET Listar todos os itens 
app.get("/status", (req, res) => {
  res.json(usuarios)
})

//ROTA POST Criar novo usuario
app.post("/usuarios", (req, res) => {
  const { nome } = req.body;

  const novoUsuario = {
    id: contador++,
    nome
  };
  
  usuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})