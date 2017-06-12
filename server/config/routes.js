const controllers = require('../controllers')

module.exports = (app) => {
  app.get('/', controllers.home.index)
  app.get('/about', controllers.home.about)

  app.get('/user/register', controllers.user.getReg)
  app.post('/user/register', controllers.user.postReg)

  app.get('/user/login',controllers.user.getLogin)
  app.post('/user/login',controllers.user.postLogin)
  
  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found')
    res.end()
  })
}
