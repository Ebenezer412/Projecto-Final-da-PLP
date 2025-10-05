
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

// simple MySQL connection (adjust credentials)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pense_logico'
});

db.connect(err => {
  if (err) console.warn('MySQL connection warning (dev):', err); else console.log('MySQL conectado');
});

app.get('/api/courses', (req,res)=>{
  db.query('SELECT * FROM courses', (err, results)=>{
    if(err) return res.status(500).json(err);
    res.json(results);
  });
});

app.listen(3000, ()=>console.log('Servidor a correr em http://localhost:3000'));
