const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://rehanhello20:MlBFaH4iV7zJ09rw@paytm.rzuxg.mongodb.net/paytm"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxlenght: 20,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    maxlenght: 20,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minlenght: 3,
    maxlenght: 20,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlenght: 6,
  },
});

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  balance: {
    type: Number,
    require: true,
  },
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);
module.exports = { User, Account };
