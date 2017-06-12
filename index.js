const env = process.env.NODE_ENV || 'development'
const settings = require('./server/config/settings')[env]
const express = require('express')
let app = express()

require('./server/config/database')(settings)
require('./server/config/express.config')(app)
require('./server/config/routes')(app)
require('./server/config/passport')()

app.listen(settings.port)

// User.seedAdmin()
