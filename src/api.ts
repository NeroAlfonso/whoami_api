require('dotenv').config();
import express =require("express");
let api : express.Application =express();
let port =process.env.PORT;
api.get('/api', (req, res) => res.send('¡Holas mundo!'));
api.listen(port, () => console.log(`Arriba, puerto ${port}`));