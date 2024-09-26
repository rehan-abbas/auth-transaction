const express = require("express");
const userRoutes = require("./user");
const accountsRoutes = require("./accounts");

const router = express.Router();

router.use("/user", userRoutes);
router.use("/account", accountsRoutes);

module.exports = router;
