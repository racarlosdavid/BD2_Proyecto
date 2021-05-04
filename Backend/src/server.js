const express = require('express');
const app = express();
var morgan = require('morgan');
var cors = require('cors');

//Settings
const port = 3000;

//Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

//Routes
app.use('/',require('./routes/index'))
app.use('/saludo',require('./routes/saludo'));
app.use('/login',require('./routes/login'));
app.use('/newuser',require('./routes/newuser'));
app.use('/reporte1',require('./routes/reporte1'));
app.use('/reporte2',require('./routes/reporte2'));
app.use('/reporte3',require('./routes/reporte3'));
app.use('/reporte4',require('./routes/reporte4'));
app.use('/reporte5',require('./routes/reporte5'));
app.use('/transaccion',require('./routes/transaccion'));


app.listen(port,()=>{
    console.log('Servidor en el puerto', port);
}); 