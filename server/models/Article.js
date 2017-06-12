const mongoose = require('mongoose')

let articleSchema = mongoose.Schema({
  title: {type: String, required: true},
  body: {type: String},
  date: {type: Date, default: Date.now()},
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

let Article = mongoose.model('Article', articleSchema)

module.exports = Article
