import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true,
        trim: true,
    },

    email: {
        type: String,
        required: [true, 'Please provide a email'],
        unique: true,
        trim: true,
    },

    password: {
        type: String,
        required: [true, 'Please provide a password']
    },

    isVerfied: {
        type: Boolean,
        default: false
    },

    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordExipry: Date,
    verfiedToken: String,
    verifiedTokenExpiry: String,
})

const User = mongoose.models.user || mongoose.model('users', userSchema)

export default User