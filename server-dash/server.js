const cors = require('cors');
const mysql = require('mysql')
const bcrypt = require('bcrypt')
const express = require('express');
const  jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');



const app = express();
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser())

// const verifyUser = ()=>{

// }


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
app.post('/signup',async(req, res)=>{
    const sql = 'INSERT INTO users (email, password) VALUES(?,?) ';

    const {email, password} = req.body;
    const salt =10;

    try{
        const hashPassword = await bcrypt.hash(password, salt);

       const values =[
            email, 
            hashPassword
        ]
        db.query(sql, values, (err, results)=>{
            if (err){
                return res.json("Error")
            }else{
                return res.json({success: true})
            }
        })

    } catch(error){
        console.error(error)
    }

})

app.post('/login', (req, res)=>{
    const sql = "SELECT FROM users WHERE `email`=? "
    db.query(sql, [req.body.email], (err, data)=>{
        if (err){
            return res.json("Error")
        }
        if (data.length > 0){
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response)=>{
                if (err){
                    return res.json("Error")
                }
                if (response){
                    const id = data[0].id;
                    const token = jwt.sign({id}, "secretkey", {expiresIn: '300'});
                    res.cookie('token', token, {httpOnly: true})
                    return res.json({Login:true, token, data})
                }
                return res.json({Login: false})
            })
        }else{
            console.log('error')
            return res.json("Failed")
        }
    })
})




app.get('/', (req, res)=>{
    return res.json('server is working properly')
})

// APP LSITEN TO SERVER
port = process.env.PORT || 8081;
app.listen(port, ()=>{
    console.log('Server is setup properly')
})