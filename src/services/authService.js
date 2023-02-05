const User = require('../models/User.js')
const jwt = require('../lib/jsonwebtoken.js')
const config = require('../configurations/configPorts')


exports.getUserByEmail =  (email) => User.findOne({email})

exports.register = async (firstName, lastName, email, password) => {
   const newUser = await User.create({firstName, lastName, email, password})
   console.log(newUser)
   const payLoad = {_id: newUser._id, email: newUser.email, firstName: newUser.firstName, lastName: newUser.lastName}
   const token = await jwt.sign(payLoad, config.SECRET, {expiresIn: '2h'})

   return token

} 

exports.login = async (existingUser, password) => {
   const isValid = await existingUser.validatePassword(password)

   if(!isValid){
      throw new Error("Invalid username or password!")
   }
  
   const payLoad = {_id: existingUser._id, email: existingUser.email, firstName: existingUser.firstName, lastName: existingUser.lastName}
   const token = await jwt.sign(payLoad, config.SECRET, {expiresIn: '2h'})

   return token
}
