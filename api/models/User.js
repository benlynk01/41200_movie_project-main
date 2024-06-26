const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: {
            first: String,
            last: String
        },
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

UserSchema.pre('save', async function(next){
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

UserSchema.methods.isValidPassword = async function(encryptedPassword){
    const user = this;
    const compare = await bcrypt.compare(encryptedPassword, user.password);
    return compare;
};

const UserModel = mongoose.model('User', UserSchema, 'users');

module.exports = UserModel;
