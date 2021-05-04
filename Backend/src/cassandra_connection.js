const cassandra = require('cassandra-driver');

const cassandraConnection = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'bases2proyecto'
});

cassandraConnection.connect(function (err){
  if(err){
      console.log(' Error al conectarse a la base de datos ',err);
  } else {
      console.log(' Conexión a la base de datos exitosa ');
  }
});


module.exports = cassandraConnection;
