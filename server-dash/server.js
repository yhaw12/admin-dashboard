// const express = require('express');
// const cors = require('cors');
// const mysql = require('mysql');
// // const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken')
// const cookie = require('cookie-parser')
// const session = require('express-session')


// const app = express();
// app.use(cors({
//   origin: 'http://localhost:5173',
//   methods: ['GET', 'POST'],
//   credentials: true
// }));
// app.use(express.json());

// app.use(session({
//   secret: 'secret-key',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true } // secure should be true in a production environment
// }));

// // CONNECTION TO THE DATABASE
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'weblogin',
// });

// // SIGNUP USERS TO THE DATABASE
// app.post('/signup', (req, res) => {
//   const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';

//   const { email, password } = req.body;

//   const values = [email, password];

//   db.query(sql, values, (err, response) => {
//     if (err) {
//       console.error('Error signing up:', err);
//       return res.status(500).json({ message: 'Error signing up to the database' });
//     }

//     if (response.affectedRows > 0) {
//       console.log('Signup success');
//       return res.status(201).json({ message: 'Signup successful' });
//     } else {
//       console.error('Error signing up: No rows affected');
//       return res.status(500).json({ message: 'Error signing up to the database' });
//     }
//   });
// });


// // LOGIN USERS TO THE DATABASE
// app.post('/login', (req, res) => {
//   const sql = 'SELECT * FROM users WHERE email = ?';
//   const { email, password } = req.body;

//   db.query(sql, [email], (err, results) => {
//     if (err) {
//       console.error('Error logging in:', err);
//       return res.status(500).json({ message: 'Error logging in' });
//     }

//     if (results.length === 0) {
//       return res.status(401).json({ message: 'User not found' });
//     }

//     const user = results[0];

//     if (password === user.password) {
//       const token = jwt.sign({userId: user.id}, 'secret-key', {expiresIn: '1d'});
//       res.cookie('token', token, {httpOnly: true}) 
//       return res.json({ message: 'Login successful' });
//     } else {
//       return res.status(401).json({ message: 'Incorrect password' });
//     }
//   });
// });


// // Check for MYSQL CONNECTION
// db.connect((err) => {
//   if (err) {
//     console.error('Error Connecting to the Database:', err);
//   } else {
//     console.log('Successfully connected to the database');
//   }
// });


// app.get('/', (req, res, next)=>{
//   const token = req.cookies.token;

//   if(!token){
//     return res.status(401).json({ message: 'Token not found' });
//   }

//   try{
//     const decoded = jwt.verify(token, 'secret-key');
//     const userId = decoded.userId
//     res.json({ message: 'Token verification successful', userId });
//   }catch (error) {
//     return res.status(401).json({ message: 'Invalid token' });
//   }

//   next()  
// })

// // HANDLE LOGOUT
// app.get('/logout', (req, res) => {
//   req.session.destroy(err => { // use session.destroy, not session.remove
//     if (err) {
//       return res.status(500).json({message: 'Error logging out'});
//     }

//     res.clearCookie('token');
//     res.json({message: 'Logout successful'});
//   });
// });


// // SERVER LISTENING
// app.listen(8081, () => {
//   console.log('Server Connected');
// });

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cookie = require('cookie-parser');
const session = require('express-session');

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());
app.use(cookie());
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
// connect to the database
mongoose.connect('mongodb://localhost/27017', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

  // create a user schema
  const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String, 
        required: true,
    }
});
// create a model
const User = mongoose.model('User', UserSchema)

// Signup users
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    console.log('Signup success');
    return res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    console.error('Error signing up:', error);
    return res.status(500).json({ message: 'Error signing up' });
  }
});

// Login users
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const token = jwt.sign({ userId: user._id }, 'secret-key', { expiresIn: '1d' });
      res.cookie('token', token, { httpOnly: true });
      return res.json({ message: 'Login successful' });
    } else {
      return res.status(401).json({ message: 'Incorrect password' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ message: 'Error logging in' });
  }
});

// Check for MySQL connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Successfully connected to the database');
  }
});

app.get('/', (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, 'secret-key');
    const userId = decoded.userId;
    res.json({ message: 'Token verification successful', userId });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  next();  
});

// Handle logout
app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({message: 'Logout successful'});
});


// Server listening
app.listen(8081, () => {
  console.log('Server connected');
});
