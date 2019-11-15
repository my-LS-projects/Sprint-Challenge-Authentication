const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require('./authenticate-middleware')

const Users = require("../database/users/users-model");

router.post("/register", (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);

  user.password = hash;
  Users.add(user)
    .then(user => res.status(201).json(user))
    .catch(error => res.status(500).json({ error: "Error registering user" }));
});

router.post("/login", (req, res) => {
  // implement login
  let { username, password } = req.body;

  Users.findBy({ username })
  .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = getToken(user.id);
        console.log(token);
        res.status(200).json({ message: `welcome back, here's your token: `, token })
      } else {
        res.status(401).json({ error: "invalid credentials" })
      }
    })
    
});

function getToken(id) {
  const payload = {
    id
  };

  const secret = process.env.JWT_SECRET || "rapper viper";

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
