const controllers = require('../controllers')
const auth = require('./auth')

module.exports = (app) => {
  app.get('/', controllers.home.index)
  app.get('/about', controllers.home.about)

  app.get('/user/register', auth.isNotAuth, controllers.user.getReg)
  app.post('/user/register', auth.isNotAuth, controllers.user.postReg)

  app.get('/user/login', auth.isNotAuth, controllers.user.getLogin)
  app.post('/user/login', auth.isNotAuth, controllers.user.postLogin)

  app.get('/articles', auth.isAuth, controllers.article.get)

  app.get('/user/logout', auth.isAuth, controllers.user.logout)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found')
    res.end()
  })
}
