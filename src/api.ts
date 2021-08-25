require('dotenv').config();
import express =require("express");
let api : express.Application =express();
let port =process.env.PORT;
api.get('/api', (req, res) => res.send('¡Holas mundo!'));
api.get('/', (req, res) => res.send('Pantalla de inicio'));
api.listen(port, () => console.log(`Arriba, puerto ${port}`));