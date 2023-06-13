 const jwt = require('jsonwebtoken')
 require('dotenv').config();


function AuthValidator(req, res, next) {
    jwt.verify(
        req.headers["x-access-token"],
        process.env.TOKEN_SECRET,
        // req.app.get("secretKey"),
        function (err, decoded) {
            if (err) {
                res.send(err.message);
            } else {
                req.currentUser = decoded;
                next()
                // res.send(responseFormatter(null, 0, "Invalid Token " + req.headers["x-access-token"]));
            }
        }
    );
}
module.exports={
    AuthValidator
}