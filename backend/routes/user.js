// backend/routes/user.js
const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");
const { authMiddleware } = require("../middleware");
const { signJwt } = require("../jwt");

const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signupBody.safeParse(body);

  if (!success) {
    return res.status(411).json({
      message: " Incorrect inputs",
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken",
    });
  }

  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      username: req.body.username,
      password: hashPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    const token = signJwt(user._id);

    await Account.create({
      userId: user._id,
      balance: 1 + Math.random() * 10000,
    });

    res.status(201).json({ token, userId: user._id, message: "jwt working" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
});

router.post("/signin", async (req, res) => {
  const body = req.body;
  const { success } = signinBody.safeParse(body);

  if (!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const user = await User.findOne({
    username: body.username,
  });
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const isValidPassword = await bcrypt.compare(body.password, user.password);

  if (!isValidPassword) {
    return res.status(401).json({
      message: "Invalid password",
    });
  }

  const token = signJwt(user._id);

  res.status(200).json({
    msg: "Succesfully Logged in",
    token,
  });
});

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }

  await User.updateOne(req.body, {
    id: req.userId,
  });

  res.json({
    message: "Updated successfully",
  });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
