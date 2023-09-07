const jwt = require('jsonwebtoken');
require('dotenv').config()

const jwtFunc = {};

jwtFunc.signJwt = async(req, res) => {
    const body = req.body;
    const tokenKey = process.env.TOKEYN_KEY;
    const token = jwt.sign(body, tokenKey, { expiresIn: 60 * 60 });
    res.send(token);
}

jwtFunc.verifyJWT = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).send("unautorization access")
    }
    const fromClintSideToken = authorization.split(" ")[1]
    jwt.verify(fromClintSideToken, process.env.TOKEYN_KEY, (err, decoded) => {
        if (err) {
            return res.status(402).send(err)
        }
        req.decoded = decoded;
        next();
    })
}

module.exports = jwtFunc;