import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    referral:{
        type: String,
        require: true,
        unique: true,
    },
    email:{
        type:String,
        require:true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        unique: true,
    }
},{ timestamps: true })

export const User = mongoose.model("User",userSchema)
