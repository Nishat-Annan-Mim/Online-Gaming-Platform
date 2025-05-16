import Payment from "../models/payment.model.js";
import stripe from "stripe";
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
  try {
    const { amount, gameId, paymentType } = req.body;
    const userId = req.user._id;

    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: "usd",
      payment_method_types: ["card"],
    });

    // Create payment record
    const payment = new Payment({
      userId,
      gameId,
      amount,
      paymentType,
      paymentMethod: "card",
      transactionId: paymentIntent.id,
    });

    await payment.save();

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentId: payment._id,
    });
  } catch (error) {
    console.error("Payment error:", error);
    res.status(500).json({ error: "Payment processing failed" });
  }
};

export const getPaymentHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const payments = await Payment.find({ userId })
      .populate("gameId", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(payments);
  } catch (error) {
    console.error("Error fetching payment history:", error);
    res.status(500).json({ error: "Failed to fetch payment history" });
  }
};

export const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentId, status } = req.body;
    const payment = await Payment.findByIdAndUpdate(
      paymentId,
      { status },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    res.status(200).json(payment);
  } catch (error) {
    console.error("Error updating payment status:", error);
    res.status(500).json({ error: "Failed to update payment status" });
  }
}; 