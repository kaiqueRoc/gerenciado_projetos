const express = require('express');
const cors = require('cors');
const projetoRoutes = require('./routes/projetoRoutes');
const tarefaRoutes = require('./routes/tarefaRoutes');

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Rotas
app.use('/api/projetos', projetoRoutes);
app.use('/api/tarefas', tarefaRoutes);

const port = process.env.PORT || 3002;

const server = app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

module.exports = server;