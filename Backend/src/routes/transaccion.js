var express = require('express');
var router = express.Router();

const cassandraConnection = require('../cassandra_connection');

router.post('/addTransacccion',  function(req, res, next) {
    console.log(req.body);

    const query = 'INSERT INTO operaciones_cuentahabiente (nombre, apellido, cui, entidadFinanciera, tipoCuenta, saldo_inicial, nombre2, apellido2, cui2, entidadFinanciera2, tipoCuenta2, saldo_inicial2, montoTransferencia, fecha) VALUES ('+
    
    '\''+req.body.nombre+'\','+
    '\''+req.body.apellido+'\','+
    req.body.cui+','+
    '\''+req.body.entidadFinanciera+'\','+
    '\''+req.body.tipoCuenta+'\','+
    req.body.saldo_inicial+','+
    '\''+req.body.nombre2+'\','+
    '\''+req.body.apellido2+'\','+
    req.body.cui2+','+
    '\''+req.body.entidadFinanciera2+'\','+
    '\''+req.body.tipoCuenta2+'\','+
    req.body.saldo_inicial2+','+
    req.body.montoTransferencia+','+
    'dateof(now()))';   

    cassandraConnection.execute(query, function(err, result, fields) {
        if (err) throw err;
        res.send({mensaje:'Transferencia Realizada con exito'});
    });  
    
});

router.post('/getSaldo',  function(req, res, next) {
    console.log(req.body);
    const query = 'SELECT saldo_inicial FROM operaciones_cuentahabiente WHERE '+ 
    'cui = '+req.body.cui+' AND '+
    'nombre = \''+req.body.nombre+'\' AND '+
    'apellido = \''+req.body.apellido+'\' AND '+
    'entidadFinanciera = \''+req.body.entidadFinanciera+'\' AND '+
    'tipoCuenta = \''+req.body.tipoCuenta+'\' '+
    'ALLOW FILTERING;';   
    cassandraConnection.execute(query, function(err, result, fields) {
        if (err) throw err;
        res.send(result.rows);
    });  
    
});



module.exports = router;
