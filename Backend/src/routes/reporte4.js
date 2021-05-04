var express = require('express');
var router = express.Router();

const cassandraConnection = require('../cassandra_connection');

router.get('/',  function(req, res, next) {
    const query = 'SELECT entidadFinanciera,abreviacion FROM instituciones_bancarias GROUP BY entidadFinanciera;';    
    cassandraConnection.execute(query, function(err, result, fields) {
        if (err) throw err;
        res.send(result.rows);
    });  
    
});

module.exports = router;
