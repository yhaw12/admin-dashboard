
const express = require('express');
const cors = require('cors');


const app = express();

app.use(cors())
app.use(express.json())


app.get('/message', (req, res)=>{
    res.json({message: 'server started'})
})

app.listen(5137, ()=>{
    console.log(`Server is running on port 5137.`);
})