const { MissingArgError, ArgTypeError } = require("./errors")

module.exports = class {

    constructor ({
        name,
        type,
        aliases,
        requiredArgs,
        verifyAPIKey,
        admin
    }) {

        this.name = name
        this.type = type
        this.argsOrigin = type === 'post' ? 'body' : 'query'
        this.aliases = aliases
        this.requiredArgs = requiredArgs
        this.verifyAPIKey = verifyAPIKey
        this.admin = admin
    }

    verifyRequiredArgs (req, res, next) {

        for (const requiredArg of this.requiredArgs) {

            const arg = req[this.argsOrigin][requiredArg.name]

            if (!arg) return next(new MissingArgError(requiredArg))
            // else if (typeof arg !== requiredArg.type) return next(new ArgTypeError(requiredArg))
        }

        next()
    }
}