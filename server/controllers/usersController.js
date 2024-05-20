const User = require("../models/usersModel")

const register = async (req, res)=>{
  try {
    const user = await User.create(req.body)
    const token = await user.createToken()
    res.status(201).json({user, token})
  } catch (error) {
    if(error.code === 11000){
      return  res.status(500).json({email: "email already used"})
    }
    return res.status(500).json({error: error.message})
  }
}

const login = async (req, res)=>{
    const {email, password} = req.body
    try {
        if (!email) return res.status(500).json({email: "you must include email"})
        if (!password) return res.status(500).json({password: "you must include password"})
        const user = await User.findOne({email})
        if (!user) return res.status(500).json({email: "email not found"})
        const comparePassword = await user.compare(password)
        if (!comparePassword) return res.status(500).json({password: "incorrect password"})
        const token = await user.createToken()
        res.status(200).json({user, token})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = { register, login }