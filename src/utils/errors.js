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
    }

}