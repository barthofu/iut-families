module.exports = {

    NotFoundError: class extends Error {

        constructor (message, error) {
    
            super(message)
    
            this.data = error
            this.statusCode = 404
        }
    },


    BadRequestError: class extends Error {

        constructor (message, error) {

            super(message)

            this.data = error
            this.statusCode = 400
        }
    },


    DatabaseError: class extends Error {

        constructor (error) {

            super(error.message)

            this.data = error
            this.statusCode = 500
        }
    },


    ForbiddenError: class extends Error {

        constructor (message = 'Accès interdit') {

            super(message)

            this.statusCode = 403
        }
    },


    MissingArgError: class extends Error {
        
        constructor (arg) {

            super(`Argument manquant (${arg.name})`)

            this.statusCode = 400
        }
    },


    ArgTypeError: class extends Error {

        constructor (arg) {
            super(`Erreur de type: ${arg.name} devrait être un ${arg.type}`)
        }
    }


}