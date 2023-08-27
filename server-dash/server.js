const cors = require('cors');
const express = require('express');
const bcrypt = require('bcrypt');



const app = express();
app.use(cors());


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: "weblogin"

})


//signup 
app.post('/signup',  async (req, res) =>{
    try{
        const {email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 20);

        // Insert user into database
         const result = await pool.query(
            'INSERT INTO users (email, password) VALUES (?, ?, ?)',
            [email, hashedPassword]
        );
  
         res.json({ message: 'Signup successful' });

    } catch (error) {
        console.log(error)
    }
})

// login
app.get('/users', (req, res)=>{
    const sql = " SELECT * FROM users";
    db.query(sql, (err, data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })

})

app.get('/', (req, res)=> {
    return res.json('backend is working properly')
})

app.listen(8081, () => {
    console.log('logon on this server 8081');
});