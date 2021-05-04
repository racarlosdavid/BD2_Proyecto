var express = require('express');
var router = express.Router();

const cassandraConnection = require('../cassandra_connection');

router.post('/debitos',  function(req, res, next) {
    console.log(req.body);
    const query = 'SELECT nombre,apellido,cui,entidadFinanciera,tipoCuenta,saldo_inicial,montoTransferencia,fecha FROM operaciones_cuentahabiente WHERE '+ 
    'cui = '+req.body.cui+' AND '+
    'nombre = \''+req.body.nombre+'\' AND '+
    'apellido = \''+req.body.apellido+'\' '+
    'ALLOW FILTERING;';   
    cassandraConnection.execute(query, function(err, result, fields) {
        if (err) throw err;
        res.send(result.rows);
    });  
    
});

router.post('/creditos',  function(req, res, next) {
    console.log(req.body);
    const query = 'SELECT nombre2,apellido2,cui2,entidadFinanciera2,tipoCuenta2,saldo_inicial2,montoTransferencia,fecha FROM operaciones_cuentahabiente WHERE '+ 
    'cui2 = '+req.body.cui+' AND '+
    'nombre2 = \''+req.body.nombre+'\' AND '+
    'apellido2 = \''+req.body.apellido+'\' '+
    'ALLOW FILTERING;';   
    cassandraConnection.execute(query, function(err, result, fields) {
        if (err) throw err;
        res.send(result.rows);
    });  
    
});

module.exports = router;
