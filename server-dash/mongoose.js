const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema(
    {
        email: String,
        password: String
    },
    {
        collection: 'UserInfo'
    }
);

mongoose.model('UserInfo', UserSchema)