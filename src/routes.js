const //middlewares
      verifyAPIKey = require('./middlewares/verifyAPIKey'),
      isAdmin = require('./middlewares/isAdmin'),
      fillotsOnly = require('./middlewares/fillotsOnly'),
      nullMiddleware = (req, res, next) => next(),

      //routes loader
      routes = require('./loaders/routes.loader')

const router = require('express').Router()

for (const route of routes) {

    //binding the daughter class instance context to the mother class method 'verifyArgs'
    const verifyArgs = route.verifyArgs.bind(route)

    router[route.type](
        `/${route.name}`,
        (route.verifyAPIKey ? verifyAPIKey : nullMiddleware),
        (route.fillotsOnly ? fillotsOnly : nullMiddleware),
        (route.admin ? isAdmin : nullMiddleware),
        (route.args.length > 0 ? verifyArgs : nullRoute),
        route.run
        )
}

module.exports = router