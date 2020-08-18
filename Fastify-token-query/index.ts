import * as fastify from 'fastify';
import * as cors from 'fastify-cors';
import * as jwt from 'fastify-jwt';
import * as swagger from 'fastify-swagger';
import * as bcrypt from 'bcrypt';
import { RegisterRequest } from './Models/RegisterRequest';
import { TokenRequest } from './Models/TokenRequest';
import { TokenPayload } from './Models/TokenPayload';
import * as mysql from 'mysql';
var connection = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'Vmware1!',
    database: 'ITS_KENNEDY'
});

const saltRound = 10;


const app = fastify({
    logger: true,
    ignoreTrailingSlash: true
});

app.register(cors);
app.register(jwt, { secret: "chiave-super-segreta" });

app.register(swagger, {
    routePrefix: '/documentation',
    swagger: {
        info: {
            title: 'Test ITS JWT autentication',
            description: 'testing the fastify swagger api',
            version: '0.1.0'
        },
        externalDocs: {
            url: 'https://www.tecnicosuperiorekennedy.it',
            description: 'ITS'
        },
        host: 'localhost:3000',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json']
    },
    exposeRoute: true
});


app.post('/api/register', (request, reply) => {
    var saltRounds = 10;
    var username = request.body.username;
    var password = request.body.password;
    var email = request.body.email;
    var Nome_Admin = request.body.Nome_Admin;
    var Cognome_Admin = request.body.Cognome_Admin;
    var RUOLO=request.body.RUOLO;
    bcrypt.hash(password, saltRound).then(value => {
        connection.query("INSERT INTO admin (username, password, email,Nome_Admin,Cognome_Admin, RUOLO) VALUES(?,?,?,?,?,?)",
            [username, value, email, Nome_Admin, Cognome_Admin,RUOLO],
            (error, results, fields) => {
                reply.status(201).send({ result: true }); // 201 created
            }).catch(reason => {
                reply.status(500).send({
                    result: false,
                    errorText: "Errore nel calcolo dell'hash della password",
                    reason: reason
                });
            });
    });
});


const tokenJsonSchema = {
    type: 'object',
    required: ['username', 'password'],
    properties: {
        username: { type: 'string', minLength: 4 },
        password: { type: 'string', minLength: 4 }
    }
};
app.post('/api/token', { schema: { body: tokenJsonSchema } }, (request, reply) => {
    // some code
    let model = request.body as TokenRequest;

    connection.query("SELECT username,Nome_Admin,Cognome_Admin ,RUOLO, password FROM admin where username = ?", model.username, (error, results, fields) => {
        if (error) {
            reply.status(500).send({ error: error.message });
        }
        else if (results.length == 0) {
            reply.status(401).send({
                statusCode: 401,
                error: "Unauthorized",
                message: "Inavalid username or password."
            });
        }
        else {
            bcrypt.compare(model.password, results[0].password, function (err, result) {
                if (result) {
                    console.log(results[0]);
                    const token = app.jwt.sign({ username: results[0].username, firstname: results[0].Nome_Admin, lastname: results[0].Cognome_Admin,role: results[0].RUOLO });
                    reply.send({ token });
                }
                else {
                    reply.status(401).send({
                        statusCode: 401,
                        error: "Unauthorized",
                        message: "Inavalid username or password.",
                        body: results
                    });
                }
            });
        }
    });
});

app.register(async function (fastify, opts) {
    fastify.addHook("onRequest", async (request, reply) => {
        try {
            await request.jwtVerify()
        } catch (err) {
            reply.send(err)
        }
    });

    fastify.get('/api/time', async (request, reply) => {
        let jwtPayload = request.user;

        return {
            now: new Date(),
            user: jwtPayload
        };
    });
});






app.listen(3000, (err, address) => {
    if (err) throw err
    app.log.info(`server listening on ${address}`)
});