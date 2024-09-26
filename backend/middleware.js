const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  console.log("Auth middleware executed");
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({
      message: "verification failed",
    });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "verification failed",
      error: error.message,
    });
  }
};

module.exports = {
  authMiddleware,
};
