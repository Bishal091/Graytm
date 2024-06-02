const { default: mongoose } = require("mongoose");
const Account = require("../models/account-model");

exports.balance = async (req, res, next) => {
  try {
    const account = await Account.findOne({
      userId: req.userId,
    });

    res.json({
      balance: account.balance,
    });
  } catch (error) {
    console.log("Error from Account Route", error);
  }
};




exports.transfer = async (req, res, next) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;

  try {
      // Fetch the accounts within the transaction
      const account = await Account.findOne({ userId: req.userId }).session(session);

      if (!account || account.balance < amount) {
          await session.abortTransaction();
          return res.status(400).json({ message: "Insufficient balance" });
      }

      const toAccount = await Account.findOne({ userId: to }).session(session);

      if (!toAccount) {
          await session.abortTransaction();
          return res.status(400).json({ message: "Invalid account" });
      }

      // Perform the transfer
      await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
      await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

      // Commit the transaction
      await session.commitTransaction();
      res.status(200).json({ message: "Transfer successful" });

  } catch (error) {
      await session.abortTransaction();
      res.status(500).json({ message: "Internal server error", error: error.message });
  } finally {
      session.endSession();
  }
};


