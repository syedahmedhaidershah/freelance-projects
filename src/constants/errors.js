const errors = {
    users: {
        alreadyExists: {
            message: 'user_already_exists',
            status: 409
        },
        loginError: {
            message: 'cannot_log_in',
            status: 401
        },
        invalidCredentials: {
            message: 'invalid_credentials',
            status: 403
        },
        trialExpired: {
            message: 'trial_expired',
            status: 403
        },
        markedSignin: {
            message: 'marked_signin',
            status: 503
        }
    },
    types: [
        "ValidationError",
        "Error",
        "TypeError",
        'ReferenceError',
        'MongoError'
    ]
}

module.exports = errors;