const cors = require('cors')
const express = require('express')
const mysql = require('mysql')


const port = 8081
const app = express();
app.use(cors())

const db = mysql.createConnection({
    host: 'localhost',
    root: 'root',
    password: '',
    database: 'weblogin'
});

app.post('/signup', (req, res)=>{
    const sql = 'SELECT * FROM users WHERE `email = ?`, `password = ?`, values = (?)'

    const values = [
        req.body.email,
        req.body.password
    ]
    db.query(sql, (values), (err, data)=>{
        if (err){
            console.error(err)
        } else{
            return data.json()
        }
    })
})




app.get('/', (req, res)=>{
    return res.json('The SERVER IS WORKING PROPERLY')
})

app.listen( port, ()=>{
    console.log('Server launched succesfully')
})