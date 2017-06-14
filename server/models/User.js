const mongoose = require('mongoose')
const requiredMsg = '{PATH} is required!'
const enc = require('../../utils/encryption')

let userSchema = mongoose.Schema({
  username: {type: String, unique: true, required: requiredMsg},
  password: {type: String, required: requiredMsg},
  firstName: {type: String},
  lastName: {type: String},
  roles: [{type: String}],
  salt: {type: String},
  date: {type: Date, default: Date.now()},
  posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Article'}]
})

userSchema.method({
  authenticate: function (password) {
    console.log('here')
    if (enc.generateHashPass(this.salt, password) === this.password) {
      return true
    }
    return false
  }
})

let User = mongoose.model('User', userSchema)

User.seedAdmin = () => {
  User.find().then(users => {
    if (users.length > 0) return
    let salt = enc.generateSalt()
    let hashedPass = enc.generateHashPass(salt, 'admin')
    User.create({
      username: 'admin',
      password: hashedPass,
      salt: salt,
      roles: ['Admin']
    }).then(user => {
      console.log('seed created')
      console.log(user)
    })
  })
}

module.exports = User
