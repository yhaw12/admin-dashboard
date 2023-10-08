const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
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
mongoose.connect("mongodb://localhost:27017/labwebsite", {
     useNewUrlParser: true,
     useUnifiedTopology: true,
})
  .then(() => {
    console.log('Successfully connected to MongoDB');
  } )
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

  // CHECK MONGODB CONNECTION
  mongoose.connection.on('connected', function() {
    console.log('Mongoose connected successfully');
  });
  
  mongoose.connection.on('error', function(err) {
    console.error('Mongoose connection error:', err);
  });
  
  mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
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
const Items = mongoose.model("users", UserSchema)

// Signup users
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    
    const user = await Items.findOne({email});
    if (user){
      return res.json('User EXist');
    }
    await Items.create({
      email:email,
      password:hashedPassword
    });
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
    const user = await items.findOne({ email });
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
