const mongoose = require("mongoose");
const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");

const router = express.Router();

//displaying balance
router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const account = await Account.findOne({ userId: req.user.userId });
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    const formattedBalance = parseFloat(account.balance).toFixed(2);

    res.json({
      balance: formattedBalance,
    });
  } catch (error) {
    console.error("Error fetching account balance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// transaction

// router.post("/transaction", authMiddleware, async (req, res) => {
//   const session = await mongoose.startSession();

//   session.startTransaction();
//   const { amount, to } = req.body;

//   const account = await Account.findOne({ userID: req.userId }).session(
//     session
//   );

//   if (!account || amount.balance < amount) {
//     await session.abortTransaction();
//     return res.status(401).json({
//       message: "insufficent amount",
//     });
//   }
//   const toAccount = await Account.findOne({ userId: to }).session(session);

//   if (!toAccount) {
//     await session.abortTransaction();
//     return res.status(401).json({
//       message: "invalid account",
//     });
//   }
//   await Account.updateOne(
//     { userID: req.userId },
//     { $inc: { balance: -amount } }
//   ).session(session);
//   await Account.updateOne(
//     { userID: to },
//     { $inc: { balance: amount } }
//   ).session(session);
//   await session.commitTransaction();
//   res.json({
//     message: "Tranfered succesful",
//   });
// });
router.post("/transaction", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const { amount, to } = req.body;

    const account = await Account.findOne({ userID: req.userId }).session(
      session
    );
    if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(401).json({ message: "insufficient balance" });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);
    if (!toAccount) {
      await session.abortTransaction();
      return res.status(401).json({ message: "invalid account" });
    }

    await Account.updateOne(
      { userID: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);

    await Account.updateOne(
      { userID: to },
      { $inc: { balance: amount } }
    ).session(session);

    await session.commitTransaction();
    session.endSession(); // End the session

    // Fetch updated balance after transaction
    const updatedAccount = await Account.findOne({ userID: req.userId });

    res.json({
      message: "Transfer successful",
      updatedBalance: updatedAccount.balance.toFixed(2), // Send updated balance
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error during transaction:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
