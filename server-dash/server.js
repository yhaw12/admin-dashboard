const cors = require('cors');
const mysql = require('mysql')
const bcrypt = require('bcrypt')
const express = require('express');
const  jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
const cookieParser = require('cookie-parser');


const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser())


// CONNECTING TO MYSQL DATABASE
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'weblogin'
})

db.connect((err)=>{
    if (err){
        console.log(err, 'Database Error');
    }
    else{
        console.log('MySQL Database Connected Succesfully')
    }
})


// SIGNUP
app.post('/signup', async(req, res)=>{
    const sql = 'INSERT INTO users (email, password) VALUES(?,?) ';

    const {email, password} = req.body;

    try{
        const salt =10;
        const hashPassword = await bcrypt.hash(password, salt);
        const values = [email, hashPassword]

        db.query(sql, values, (err, response)=>{
            if (err){console.log(err,'Error in Database')}
            else{res.status(200).json('Successfully Signed up')} console.log('Signing Database Working')
        } )
    }catch(err){console.error(err)}
})

app.post('/login', (req, res)=>{
    const sql = 'SELECT * FROM users where email = ?';
    const {email, password} = req.body;

    db.query(sql, [email], (err, results)=>{
        if (err){console.log(err,'Error in Database')}
        if (results.length === 0) {
            console.log('User not found');
            return res.status(401).json({ error: 'User not found' });
        }

        const user = results[0]
        bcrypt.compare(password, user.password, ( err, passMatch)=>{
            if (err){ console.log(err, 'Database error')}

            if (passMatch){
                const token = jwt.sign({userID: user.id}, 'secret key', {expiresIn: '1h'})
                res.cookie('token', token, {httpOnly: true})
                return res.status(200).json({ message: 'Login successful' });
            }
            else{
                console.log( err, 'password do not match')
            }

            console.log(user.password)
        })
    })
})



app.get('/', (req, res)=>{
    return res.json('server is working properly')
})


port = process.env.PORT || 8081;
app.listen(port, ()=>{
    console.log('Server is setup properly')
})