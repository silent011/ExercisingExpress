const enc = require('../../utils/encryption')
const User = require('../models/User')

module.exports = {
  getReg: (req, res) => {
    res.render('user/register')
  },
  postReg: (req, res) => {
    let salt = enc.generateSalt()
    let user = {
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      salt: salt,
      password: enc.generateHashPass(salt, req.body.password)
    }

    User.create(user).then(user => {
      req.logIn(user, (err, user) => {
        if (err) {
          res.locals.globalError = err
          res.render('user/register', user)
          return
        }

        res.redirect('/')
      })
    }).catch(err => {
      if (err.code === 11000) {
        res.locals.globalError = 'Username is already taken'
        res.render('user/register', user)
        return
      }
      res.status(502).send('Something went wrong on the our end')
    })
  },
  getLogin: (req, res) => {
    res.render('user/login')
  },
  postLogin: (req, res) => {
    let reqUser = req.body

    User.findOne({username: reqUser.username}).then(user => {
      let reqPass = enc.generateHashPass(user.salt, reqUser.password)
      if (reqPass === user.password) {
        req.logIn(user, (err, user) => {
          if (err) {
            res.locals.globalError = err
            res.render('user/login', user)
            return
          }

          res.redirect('/')
        })
      } else {
        res.locals.globalError = 'Invalid credentials'
        res.render('user/login', user)
      }
    })
  },
  logout: (req, res) => {
    req.logout()
    res.redirect('/')
  }
}
