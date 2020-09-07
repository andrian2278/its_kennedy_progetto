"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fastify = require("fastify");
var cors = require("fastify-cors");
var jwt = require("fastify-jwt");
var swagger = require("fastify-swagger");
var bcrypt = require("bcrypt");
var mysql = require("mysql");
var connection = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'Vmware1!',
    database: 'ITS_KENNEDY'
});
var saltRound = 10;
var app = fastify({
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
app.post('/api/register', function (request, reply) {
    var saltRounds = 10;
    var username = request.body.username;
    var password = request.body.password;
    var email = request.body.email;
    var Nome_Admin = request.body.Nome_Admin;
    var Cognome_Admin = request.body.Cognome_Admin;
    var RUOLO = request.body.RUOLO;
    var Admin_Status = request.body.Admin_Status;
    bcrypt.hash(password, saltRound).then(function (value) {
        connection.query("INSERT INTO admin (username, password, email,Nome_Admin,Cognome_Admin, RUOLO,Admin_Status) VALUES(?,?,?,?,?,?,?)", [username, value, email, Nome_Admin, Cognome_Admin, RUOLO, Admin_Status], function (error, results, fields) {
            reply.status(201).send({ result: true }); // 201 created
        })["catch"](function (reason) {
            reply.status(500).send({
                result: false,
                errorText: "Errore nel calcolo dell'hash della password",
                reason: reason
            });
        });
    });
});
var tokenJsonSchema = {
    type: 'object',
    required: ['username', 'password'],
    properties: {
        username: { type: 'string', minLength: 4 },
        password: { type: 'string', minLength: 4 }
    }
};
app.post('/api/token', { schema: { body: tokenJsonSchema } }, function (request, reply) {
    // some code
    var model = request.body;
    connection.query("SELECT username,idADMIN,Nome_Admin,Cognome_Admin ,RUOLO,Admin_Status, password FROM admin where username = ?", model.username, function (error, results, fields) {
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
                    var token = app.jwt.sign({ Username: results[0].username, Nome_Admin: results[0].Nome_Admin, Cognome_Admin: results[0].Cognome_Admin, RUOLO: results[0].RUOLO, idADMIN: results[0].idADMIN, Admin_Status: results[0].Admin_Status });
                    reply.send({ token: token });
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
app.register(function (fastify, opts) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            fastify.addHook("onRequest", function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, request.jwtVerify()];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            err_1 = _a.sent();
                            reply.send(err_1);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            fastify.get('/api/time', function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var jwtPayload;
                return __generator(this, function (_a) {
                    jwtPayload = request.user;
                    return [2 /*return*/, {
                            now: new Date(),
                            user: jwtPayload
                        }];
                });
            }); });
            return [2 /*return*/];
        });
    });
});
// --------------------------------------------------------------------------------------------------------------------------------------
app.get('/api/sede', function (request, reply) {
    connection.query("select * from sede ", function (error, results, fields) {
        app.log.info(results);
        app.log.info(fields);
        if (error) {
            reply.status(500).send({ error: error.message });
            return;
        }
        reply.send(results);
    });
});
app.post('/api/sede', function (request, reply) {
    var sede = request.body;
    connection.query('insert into sede (Sede) values(?)', [sede.SEDE], function (error, results, fields) {
        if (error) {
            reply.status(500).send({ error: error.message });
            return;
        }
        app.log.info('Inserimento riuscito!');
        reply.status(201).send();
    });
});
app.get('/api/sede/admin/:id', function (request, reply) {
    connection.query("select ad.Sede_IdSede,ad.Admin_IdAdmin,a.Nome_Admin,a.Cognome_Admin,a.username,a.email,a.RUOLO, s.SEDE,s.IdSede from admin_has_sede as ad inner join sede as s on ad.SEDE_idSEDE=s.idSEDE  inner join admin as a on ad.Admin_IdAdmin=a.IdAdmin where Admin_IdAdmin=?", [request.params.id], function (error, results, fields) {
        app.log.info(results);
        app.log.info(fields);
        if (error) {
            reply.status(500).send({ error: error.message });
            return;
        }
        reply.send(results);
    });
});
app.get('/api/sede/admin/all/:id', function (request, reply) {
    connection.query("select admin.Nome_Admin,admin.Cognome_Admin,admin.RUOLO from admin_has_Sede inner join admin on admin_Has_Sede.Admin_IdAdmin=admin.IdAdmin where Sede_idSede=?", [request.params.id], function (error, results, fields) {
        app.log.info(results);
        app.log.info(fields);
        if (error) {
            reply.status(500).send({ error: error.message });
            return;
        }
        reply.send(results);
    });
});
app.post("/api/sede/admin", function (request, reply) {
    var a = request.body;
    connection.query("Insert into admin_has_sede (Admin_IdAdmin,Sede_IdSede)Values(?,?)", [a.Admin_IdAdmin, a.Sede_IdSede], function (error, results, fields) {
        if (error) {
            reply.status(500).send({ error: error.message });
            return;
        }
        reply.status(204).send(results);
    });
});
// ---------------------------------------------------------------------------------------------------------------------------------------
app.get('/api/admin', function (request, reply) {
    connection.query("select idADMIN, Nome_Admin, Cognome_Admin,username, email,RUOLO,Admin_Status from admin ", function (error, results, fields) {
        app.log.info(results);
        app.log.info(fields);
        if (error) {
            reply.status(500).send({ error: error.message });
            return;
        }
        reply.send(results);
    });
});
app.get('/api/admin/:id', function (request, reply) {
    connection.query("select Nome_Admin,Cognome_Admin,username,email,RUOLO,Admin_Status from admin  where idADMIN=?", [request.params.id], function (error, results, fields) {
        app.log.info(results);
        app.log.info(fields);
        if (error) {
            reply.status(500).send({ error: error.message });
            return;
        }
        if (results.length == 0)
            reply.status(404).send();
        else
            reply.send(results[0]);
    });
});
// ---------------studente-------------------------------------------------------------------------------------------------------------------------
app.get('/api/students/:id', function (request, reply) {
    connection.query("select u.idUTENTE,u.nome,u.cognome,u.data_nascita,u.luogo_nascita,u.via,u.civico,u.comune,u.provincia_sigla, c.corso from utente as u inner join CORSO as c on u.CORSO_idCORSO=c.idCORSO inner join  sede as s on c.SEDE_idSEDE=s.idSEDE where c.SEDE_idSEDE=? order by u.nome asc ", [request.params.id], function (error, results, fields) {
        app.log.info(results);
        app.log.info(fields);
        if (error) {
            reply.status(500).send({ error: error.message });
            return;
        }
        reply.send(results);
    });
});
// studenti in base al corso
app.get('/api/:id/students/frequentazione', function (request, reply) {
    connection.query("select u.idUTENTE,u.nome,u.cognome,u.data_nascita,u.luogo_nascita,u.via,u.civico,u.comune,u.provincia_sigla,u.frequentazione,c.corso from utente as u inner join CORSO as c on u.CORSO_idCORSO=c.idCORSO inner join  sede as s on c.SEDE_idSEDE=s.idSEDE where c.SEDE_idSEDE=? and frequentazione=?;", [request.params.id], function (error, results, fields) {
        app.log.info(results);
        app.log.info(fields);
        if (error) {
            reply.status(500).send({ error: error.message });
            return;
        }
        reply.send(results);
    });
});
app.get('/api/sede/movimento/:id', function (request, reply) {
    connection.query("select distinct(m.data_consegna),m.cavo_rete,m.alimentatore,m.borsa,m.mouse,m.hdd,m.con_ethernet,m.con_usb,m.note,m.note_movimento,m.data_consegna,u.nome,u.cognome from movimento as m inner join  utente as u on m.UTENTE_idUTENTE=u.idUTENTE inner join pc on m.PC_idpc=pc.idpc inner join sede on pc.SEDE_idSEDE=sede.idSEDE where sede.idSEDE=?", [request.params.id], function (error, results, fields) {
        app.log.info(results);
        app.log.info(fields);
        if (error) {
            reply.status(500).send({ error: error.message });
            return;
        }
        reply.send(results);
    });
});
app.post('/api/students', function (request, reply) {
    var u = request.body;
    var date = new Date(u.data_nascita);
    connection.query('Insert into utente (nome,cognome,data_nascita,luogo_nascita,via,civico,comune,provincia_sigla,CORSO_idCORSO,frequentazione) Values(?,?,?,?,?,?,?,?,?,?)', [u.nome, u.cognome, date, u.luogo_nascita, u.via, u.civico, u.comune, u.provincia_sigla, u.CORSO_idCORSO, u.frequentazione], function (error, results, fields) {
        if (error) {
            reply.status(500).send({ error: error.message });
            return;
        }
        reply.status(204).send(results);
    });
});
// ----------corso------------------------------------------------------------------------------------------------------------------------------------
app.get('/api/corso/:id', function (request, reply) {
    connection.query("select * from corso  where Sede_idSede=?", [request.params.id], function (error, results, fields) {
        app.log.info(results);
        app.log.info(fields);
        if (error) {
            reply.status(500).send({ error: error.message });
            return;
        }
        reply.send(results);
    });
});
app.post('/api/corso', function (request, reply) {
    var C = request.body;
    connection.query('insert into corso (CORSO,SEDE_idSEDE) values(?,?)', [C.CORSO, C.SEDE_idSEDE], function (error, results, fields) {
        if (error) {
            reply.status(500).send({ error: error.message });
            return;
        }
        app.log.info('Inserimento riuscito!');
        reply.status(201).send();
    });
});
// -----stato----------------------------------------------------------------------------------------------------------------------------------------------------------------------
app.get('/api/stato/ritiro', function (request, reply) {
    connection.query("select idSTATO,ritiro from stato where ritiro=1;", function (error, results, fields) {
        app.log.info(results);
        app.log.info(fields);
        if (error) {
            reply.status(500).send({ error: error.message });
            return;
        }
        if (results.length == 0)
            reply.status(404).send();
        else
            reply.send(results[0]);
    });
});
app.get('/api/stato/consegna', function (request, reply) {
    connection.query("select idSTATO,consegna from stato where consegna=1;", function (error, results, fields) {
        app.log.info(results);
        app.log.info(fields);
        if (error) {
            reply.status(500).send({ error: error.message });
            return;
        }
        if (results.length == 0)
            reply.status(404).send();
        else
            reply.send(results[0]);
    });
});
app.get('/api/stato/guasto', function (request, reply) {
    connection.query("select idSTATO,guasto from stato where guasto=1;", function (error, results, fields) {
        app.log.info(results);
        app.log.info(fields);
        if (error) {
            reply.status(500).send({ error: error.message });
            return;
        }
        if (results.length == 0)
            reply.status(404).send();
        else
            reply.send(results[0]);
    });
});
app.get('/api/stato/riparazione', function (request, reply) {
    connection.query("select idSTATO,riparazione from stato where riparazione=1;", function (error, results, fields) {
        app.log.info(results);
        app.log.info(fields);
        if (error) {
            reply.status(500).send({ error: error.message });
            return;
        }
        if (results.length == 0)
            reply.status(404).send();
        else
            reply.send(results[0]);
    });
});
app.get('/api/stato/KO', function (request, reply) {
    connection.query("select idSTATO,KO from stato where KO=1;", function (error, results, fields) {
        app.log.info(results);
        app.log.info(fields);
        if (error) {
            reply.status(500).send({ error: error.message });
            return;
        }
        if (results.length == 0)
            reply.status(404).send();
        else
            reply.send(results[0]);
    });
});
// ---------Inserimento---------------------------------------------------------------------------------------
app.get('/api/sede/hw', function (request, reply) {
    connection.query("select * from hw ", function (error, results, fields) {
        app.log.info(results);
        app.log.info(fields);
        if (error) {
            reply.status(500).send({ error: error.message });
            return;
        }
        reply.send(results);
    });
});
app.post('/api/sede/hw', function (request, reply) {
    var hw = request.body;
    connection.query("INSERT INTO HW (Cpu,Ram,Memoria,Tipo_Memoria,marca,Modello) VALUES(?,?,?,?,?,?)", [hw.Cpu, hw.Ram, hw.Memoria, hw.Tipo_memoria, hw.marca, hw.modello], function (error, results, fields) {
        if (error) {
            reply.status(500).send({ error: error.message });
            return;
        }
        reply.status(201).send();
    });
});
// --------------------------------------------------------------------------------------------------------------------------------
app.get('/api/sede/:id/pc', function (request, reply) {
    connection.query("select pc.idpc,pc.HW_idHW,pc.Seriale,pc.n_inventario,pc.n_fattura,pc.data_Acquisto,pc.note,pc.SEDE_idSEDE,pc.STATO_idSTATO,stato.ritiro,stato.consegna,stato.guasto,stato.riparazione,stato.ko,hw.cpu,hw.ram,hw.Memoria,hw.Tipo_memoria,hw.marca,hw.modello from pc inner join stato on pc.stato_idStato=stato.IdStato inner join hw on pc.HW_idHW=hw.IDhw where sede_idsede=? ", [request.params.id], function (error, results, fields) {
        app.log.info(results);
        app.log.info(fields);
        if (error) {
            reply.status(500).send({ error: error.message });
            return;
        }
        reply.send(results);
    });
});
app.post('/api/sede/pc', function (request, reply) {
    var pc = request.body;
    var date = new Date(pc.data_Acquisto);
    connection.query("insert into pc (HW_idHW,Seriale,n_inventario,n_fattura,data_Acquisto,note,SEDE_idSEDE,STATO_idSTATO) values(?,?,?,?,?,?,?,?)", [pc.HW_idHW, pc.Seriale, pc.n_inventario, pc.n_fattura, date, pc.note, pc.SEDE_idSEDE, pc.STATO_idSTATO], function (error, results, fields) {
        if (error) {
            reply.status(500).send({ error: error.message });
            return;
        }
        reply.status(201).send();
    });
});
app.get('/api/sede/:id/pc/:id', function (request, reply) {
    connection.query("select pc.idpc,pc.HW_idHW,pc.Seriale,pc.n_inventario,pc.n_fattura,pc.data_Acquisto,pc.note,pc.SEDE_idSEDE,pc.STATO_idSTATO,stato.ritiro,stato.consegna,stato.guasto,stato.riparazione,stato.ko,hw.cpu,hw.ram,hw.Memoria,hw.Tipo_memoria,hw.marca,hw.modello from pc inner join stato on pc.stato_idStato=stato.IdStato inner join hw on pc.HW_idHW=hw_IDhw where sede_idsede=? and idpc=?", [request.params.id, request.params.id], function (error, results, fields) {
        app.log.info(results);
        app.log.info(fields);
        if (error) {
            reply.status(500).send({ error: error.message });
            return;
        }
        reply.send(results);
    });
});
//------movimenti----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
app.post('/api/sede/movimenti', function (request, reply) {
    connection.query("INSERT INTO MOVIMENTO (data_consegna,cavo_rete,alimentatore,borsa,mouse,hdd,con_ethernet,con_usb,note,note_movimento,PC_idPC,UTENTE_idUTENTE,ADMIN_idADMIN) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)", [request.body.data_consegna, request.body.cavo_rete, request.body.alimentatore, request.body.borsa, request.body.mouse, request.body.hdd, request.body.con_ethernet, request.body.con_usb, request.body.note, request.body.note_movimento, request.body.PC_idpc, request.body.UTENTE_idUTENTE, request.body.ADMIN_idADMIN], function (error, results, fields) {
        if (error) {
            reply.status(500).send({ error: error.message });
            return;
        }
        reply.status(201).send();
    });
});
app.get('/api/sede/:id/movimento', function (request, reply) {
    connection.query("select distinct(m.data_consegna),m.cavo_rete,m.alimentatore,m.borsa,m.mouse,m.hdd,m.con_ethernet,m.con_usb,m.note,m.note_movimento,m.data_consegna,u.nome,u.cognome,pc.seriale,pc.IDpc from movimento as m inner join  utente as u on m.UTENTE_idUTENTE=u.idUTENTE inner join pc on m.PC_idpc=pc.idpc inner join sede on pc.SEDE_idSEDE=sede.idSEDE where sede.idSEDE=?", [request.params.id], function (error, results, fields) {
        app.log.info(results);
        app.log.info(fields);
        if (error) {
            reply.status(500).send({ error: error.message });
            return;
        }
        reply.send(results);
    });
});
app.listen(3000, function (err, address) {
    if (err)
        throw err;
    app.log.info("server listening on " + address);
});
