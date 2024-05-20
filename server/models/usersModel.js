const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")





const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "you must provide username"]
    },
    email: {
        type: String,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "please provide valid email"
        ],
        unique: true,
        required: [true, "you must provide email"]
    },
    password: {
        type: String,
        required: [true, "you must provide password"]
    },
},{
    timestamps: true
})
userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})
userSchema.methods.createToken = function(){
    return jwt.sign({name: this.name, email: this.email, userId: this._id}, process.env.JWT, {expiresIn: "30d"})
} 
userSchema.methods.compare = async function(password){
    const match = await bcrypt.compare(password, this.password)
    return match
}

module.exports = mongoose.model("User", userSchema)