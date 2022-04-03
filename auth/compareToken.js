const jwt = require('jsonwebtoken');


module.exports.compareToken = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
        await jwt.verify(token, 'mySecretKey', (err, decoded) => {
            if (err) {
                res.status(401).json({ message: "token is not valid" });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.status(401).json({ message: "not have access token" });
    }
}

