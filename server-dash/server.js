const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const cookie = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.urlencoded());
app.use(express.json());
app.use(cookie());
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// connect to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'weblogin'
});

db.connect((err)=>{
  if (err){
    console.log('Error Connectinng to the database');
    return;
  }
  else{
    console.log('Mysql Database Connected')
  }
})


// Signup users
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // First, check if the user already exists before attempting to insert
  db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
    if (error) {
      console.error('Error checking for existing user:', error);
      return res.status(500).json({ message: 'Error signing up' });
    }
    
    // If there are results (i.e., the user already exists), return an error message
    if (results.length > 0) {
      return res.status(409).json({ message: 'User already exists' });
    } else {
      // If the user doesn't exist, insert the new user
      db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (error, results) => {
        if (error) {
          console.error('Error signing up:', error);
          return res.status(500).json({ message: 'Error signing up' });
        }
        
        return res.status(201).json({ message: 'Signup successful' });
      });
    }
  });
});




// Login users
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await Item.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: 'User not found' });
//     }

//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (passwordMatch) {
//       const token = jwt.sign({ userId: user._id }, 'secret-key', { expiresIn: '1d' });
//       res.cookie('token', token, { httpOnly: true });
//       return res.json({ message: 'Login successful' });
//     } else {
//       return res.status(401).json({ message: 'Incorrect password' });
//     }
//   } catch (error) {
//     console.error('Error logging in:', error);
//     return res.status(500).json({ message: 'Error logging in' });
//   }
// });

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists
  db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
    if (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ message: 'Error during login' });
    }

    // If no user with the given email is found, return an error
    if (results.length === 0) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const user = results[0];

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // If the password is valid, you can create a JWT or a session for authentication
    // For simplicity, we'll just return a success message here
    return res.status(201).json({ message: 'Login successful' });
  });
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
