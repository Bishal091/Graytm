const { default: mongoose } = require("mongoose");
const Account = require("../models/account-model");
const Transaction = require("../models/transaction-model");

exports.balance = async (req, res, next) => {
  try {
    const account = await Account.findOne({
      userId: req.userId,
    });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.json({
      balance: account.balance,
      acc:account._id,
    });
  } catch (error) {
    console.log("Error from Account Route", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.transfer = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const { amount, to } = req.body;

  try {
    const fromAccount = await Account.findOne({ userId: req.userId }).session(session);

    if (!fromAccount || fromAccount.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Insufficient balance" });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Invalid account" });
    }

    fromAccount.balance -= amount;
    toAccount.balance += amount;

    await fromAccount.save({ session });
    await toAccount.save({ session });

    const transaction = new Transaction({
      from: fromAccount._id,
      to: toAccount._id,
      amount: amount,
    });

    await transaction.save({ session });

    await session.commitTransaction();
    res.status(200).json({ message: "Transfer successful" });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ message: "Internal server error", error: error.message });
  } finally {
    session.endSession();
  }
};

// Controller to get transactions of a specific user
exports.getTransactions = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch transactions where the user is either the sender or the recipient
    const transactions = await Transaction.find({
      $or: [{ from: userId }, { to: userId }]
    })
    .populate({
      path: 'from to',
      populate: {
        path: 'userId',
        select: 'username',
        model: 'User' // Assuming 'User' is your user model name
      }
    });

    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
