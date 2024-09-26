const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");
const jwtPassword = JWT_SECRET;

function signJwt(userId) {
  const token = jwt.sign(
    {
      username: userId,
    },
    jwtPassword
  );
  return token;
}

function verifyjwt(token) {
  return jwt.verify(token, jwtPassword);
}

function decode(token) {
  return jwt.decode(token).username;
}

module.exports = { signJwt, verifyjwt, decode };
