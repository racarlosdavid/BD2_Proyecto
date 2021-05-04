var express = require('express');
var router = express.Router();

const cassandraConnection = require('../cassandra_connection');

router.post('/',  function(req, res, next) {
    const query = 'INSERT INTO usuario (cui,nombre,apellido,email,contrasenia) VALUES ('+
    req.body.cui+','+
    '\''+req.body.nombre+'\','+
    '\''+req.body.apellido+'\','+
    '\''+req.body.email+'\','+
    '\''+req.body.contrasenia+'\''+
    ')';    

    cassandraConnection.execute(query, function(err, result, fields) {
        if (err) throw err;
        res.send({mensaje:'usuario registrado con exito'});
    });  
    
});

module.exports = router;
