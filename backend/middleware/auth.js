const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        // @ts-ignore
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId != userId) { //TODO: userId must be mandatory in the request
            throw 'Invalid UserID'
        }
        res.locals.userId = userId;
        next();
    } catch {
        res.status(401).json({
            error: 'Unauthorized request'
        })
    }
}

