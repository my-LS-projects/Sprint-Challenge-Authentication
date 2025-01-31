/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization; 
  const secret = process.env.JWT_SECRET || "rapper viper"; 

  if (token) {
    jwt.verify(token, secret, (error, decodedToken) => {
      error ? res.status(401).json({ you: "shall not pass!" }) : next();
    });
  } else {
    res.status(400).json({ message: "no credentials provided" });
  }
};
