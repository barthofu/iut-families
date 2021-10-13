const //middlewares
      verifyAPIKey = require('./middlewares/verifyAPIKey'),
      isAdmin = require('./middlewares/isAdmin'),
      nullMiddleware = (req, res, next) => next(),

      //routes loader
      routes = require('./loaders/routes.loader')

const router = require('express').Router()

for (const route of routes) {

    //binding the daughter class instance context to the mother class method 'verifyRequiredArgs'
    const verifyRequiredArgs = route.verifyRequiredArgs.bind(route)

    router[route.type](
        `/${route.name}`,
        (route.verifyAPIKey ? verifyAPIKey : nullMiddleware),
        (route.admin ? isAdmin : nullMiddleware),
        (route.requiredArgs.length > 0 ? verifyRequiredArgs : nullRoute),
        route.run
        )
}

module.exports = router