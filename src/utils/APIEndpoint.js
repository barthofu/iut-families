const { MissingArgError, ArgTypeError } = require("./errors")

module.exports = class {

    constructor ({
        name,
        type,
        aliases,
        args,
        verifyAPIKey,
        fillotsOnly,
        admin
    }) {

        this.name = name
        this.type = type
        this.argsOrigin = type === 'post' ? 'body' : 'query'
        this.aliases = aliases
        this.args = args
        this.verifyAPIKey = verifyAPIKey
        this.fillotsOnly = fillotsOnly
        this.admin = admin
    }

    verifyArgs (req, res, next) {

        for (const arg of this.args.filter(arg => !arg.optional)) {

            const rawArg = req[this.argsOrigin][arg.name]

            if (!rawArg) return next(new MissingArgError(arg))
            // else if (typeof arg !== requiredArg.type) return next(new ArgTypeError(requiredArg))
        }

        next()
    }
}