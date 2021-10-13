const fs = require('fs')

const routes = []

fs.readdirSync('./src/api/').filter(file => !file.startsWith('_')).forEach(file => {
    if (file.endsWith('.js')) {
        const Route = require(`../api/${file}`),
              route = new Route()
        routes.push(route)
    } else {
        fs.readdirSync(`./src/api/${file}`).forEach(subFile => {
            const Route = require(`../api/${file}/${subFile}`),
                  route = new Route()
            routes.push(route)
        })
    }
})

module.exports = routes