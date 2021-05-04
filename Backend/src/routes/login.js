var express = require('express');
var router = express.Router();

const cassandraConnection = require('../cassandra_connection');

router.post('/',  function(req, res, next) {
    console.log(req.body);
    
    const query = 'SELECT * FROM usuario WHERE email = \''+req.body.email+'\' AND contrasenia = \''+req.body.contrasenia+'\' ALLOW FILTERING;';    
    cassandraConnection.execute(query, function(err, result, fields) {
        if (err) throw err;
        res.send(result.rows);
    });  
    
});

module.exports = router;
