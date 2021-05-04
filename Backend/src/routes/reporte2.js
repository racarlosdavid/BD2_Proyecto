var express = require('express');
var router = express.Router();

const cassandraConnection = require('../cassandra_connection');

router.post('/debitos',  function(req, res, next) {
    console.log(req.body);
    const query = 'SELECT entidadFinanciera,SUM(montoTransferencia) AS TOTAL_DEBITOS  FROM creditos_debitos_instituciones WHERE '+ 
    'entidadFinanciera = \''+req.body.entidad_financiera+'\' ALLOW FILTERING;';
    cassandraConnection.execute(query, function(err, result, fields) {
        if (err) throw err;
        res.send(result.rows);
    });  
});

router.post('/creditos',  function(req, res, next) {
    console.log(req.body);
    const query = 'SELECT entidadFinanciera2,SUM(montoTransferencia) AS TOTAL_CREDITOS  FROM creditos_debitos_instituciones WHERE '+ 
    'entidadFinanciera2 = \''+req.body.entidad_financiera+'\' ALLOW FILTERING;';
    cassandraConnection.execute(query, function(err, result, fields) {
        if (err) throw err;
        res.send(result.rows);
    });  
});

module.exports = router;
