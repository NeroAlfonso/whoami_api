require('dotenv').config();
const { Client } = require('pg')

const port =process.env.PORT;
const dbName =process.env.DB_NAME;
const dbUser =process.env.DB_USER;
const dbPass =process.env.DB_PASS;
const dbHost =process.env.DB_HOST;
const dbPort =process.env.DB_PORT;

const client = new Client(
    {
        user:       dbUser,
        host:       dbHost,
        database:   dbName,
        password:   dbPass,
        port:       dbPort
    }
)
import express =require("express");

interface ResponseI
{
    payload: any;
    msg: string;
    success: boolean;
}

let api : express.Application =express();
api.get('/', (req, res) => res.send('¡Hola mundo!'));
api.get('/visit', async (req, res) => res.send(await applyVisit()));
api.listen(port, () => console.log(`Arriba, puerto ${port}`));
async function applyVisit() : Promise<ResponseI>
{
    var response : ResponseI;
    try
    {
        if(!client._connected) await client.connect();        
        const dbResponseIns =await client.query(`
            INSERT INTO 
                visitors 
                    (
                        visited, 
                        current_visitors
                    ) 
                    values (
                        current_timestamp,
                        (select 
                            count(*)+1 
                        from 
                            visitors)
                    )`);
        const success : boolean = dbResponseIns.rowCount >=1 ? true : false;
        const msg : string = success ? '' : 'Ha ocurrido un error';
        if(!success) throw msg;    
        const dbResponseCou =await client.query(`
            select 
                count(*) VISITS
            from 
                visitors`);
        if(dbResponseCou.rows.lenght == 0) throw msg;
        const payload ={
            visitors : dbResponseCou.rows[0]['visits']
        }
        response ={payload: payload, msg: msg, success: success};
    }
    catch(e)
    {
        console.error(e);
        response ={payload: null, msg: JSON.stringify(e), success: false};
    }
    return response;
}