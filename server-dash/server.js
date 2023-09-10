const express = require('express');
const cors = require('cors')
const mysql = require('mysql')


const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'weblogin'
})
// CHECK MYSQL SERVER CONNECTION
db.connect((err)=>{
    if (err){
        console.log('Error Message', err)
    }
    else{
        console.log('Connection to Mysql setup properly')
    }
})

app.post('/signup', (req, res) => {
    const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    const values = [req.body.email, req.body.password];
  
    db.query(sql, values, (err, response) => {
      if (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log('User registered successfully');
        res.status(200).json({ success: true });
      }
    });
  });

app.post('/login', (req, res) =>{
  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  const values = [req.body.email, req.body.password];

  db.query(sql, [values], (err, results)=>{

    if (err) return res.status(500).json({ error: 'Internal Server Error', Error: 'Error in running' }); else {
    if (results.length > 0){
        console.log('User login successfully');
        return res.json({ success: true });
      }else{
        return res.json({Status:'Error', Error: 'Wrong Email or Password'})
      }
    }
  })

})


app.get('/', (req, res)=>{
    res.json('Yh the server is working properly')
})

const port = process.env.PORT || 8081;

app.listen(port, ()=>{
    console.log('SERVER  SETUP PROPERLY', port)
})