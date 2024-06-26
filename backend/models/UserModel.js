const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
   
    username: {
        type: String,
        required: [true, "Please provide a unique Username"],
        unique: [true, "Username Exist"]
    },
    address: {type: String},
     
    // plan: { type: String },
    
    // address: { type: String},
    // profile: { type: String}
});

// Mongoose middleware to hash the password before saving
// UserSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) {
//         return next();
//     }

//     try {
//         const salt = await bcrypt.genSalt(10);
//         this.password = await bcrypt.hash(this.password, salt);
//         return next();
//     } catch (error) {
//         return next(error);
//     }
// });

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
