const mongoose = require('mongoose')
const requiredMsg = '{PATH} is required'
const enc = require('../../utils/encryption')

let userSchema = mongoose.Schema({
    username:{type:String,unique:true,required:requiredMsg},
    password:{type:String,required:requiredMsg},
    firstName:{type:String},
    lastName:{type:String},
    roles:[{type:String}],
    salt:{type:String},
    date:{type:Date,default:Date.now()},
    posts:[{type:mongoose.Schema.Types.ObjectId,ref:'Article'}]
})

let User = mongoose.model('User',userSchema)

User.authenticate = function(password){
    if(enc.generateHashPass(this.salt,password)===this.password){
        return true
    }
    return false
}

User.seedAdmin =() => {
    User.find().then( users => {
        if(users.length > 0 ) return
        let salt = enc.generateSalt()
        let hashedPass = enc.generateHashPass(salt,'admin')
        User.create({
            username:'admin',
            password:hashedPass,
            salt:salt,
            roles:['Admin']
        })
    })
}
module.exports = User;