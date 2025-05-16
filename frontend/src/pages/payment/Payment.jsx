import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Payment.module.css";
import axios from "axios";

const Payment = () => {
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState(null);
  const [paymentType, setPaymentType] = useState("purchase");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    paypalEmail: "",
    bkashNumber: "",
    nagadNumber: ""
  });
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const games = [
    { id: 1, name: "Tic Tac Toe", price: 5.99 },
    { id: 2, name: "Match Game", price: 7.99 },
    { id: 3, name: "Online Multiplayer", price: 9.99 },
  ];

  const paymentMethods = [
    { id: "credit", name: "Credit Card", icon: "💳" },
    { id: "paypal", name: "PayPal", icon: "🔐" },
    { id: "bkash", name: "bKash", icon: "📱" },
    { id: "nagad", name: "Nagad", icon: "📱" }
  ];

  useEffect(() => {
    fetchPaymentHistory();
  }, []);

  const fetchPaymentHistory = async () => {
    try {
      const response = await axios.get("/api/payments/history", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setPaymentHistory(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching payment history:", error);
      setIsLoading(false);
    }
  };

  const handleGameSelect = (game) => {
    setSelectedGame(game);
  };

  const handlePaymentTypeChange = (type) => {
    setPaymentType(type);
  };

  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
  };

  const handleInputChange = (e) => {
    setPaymentDetails({
      ...paymentDetails,
      [e.target.name]: e.target.value
    });
  };

  const handlePayment = async () => {
    if (!selectedGame) {
      alert("Please select a game first");
      return;
    }

    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    try {
      const response = await axios.post("/api/payments/process", {
        gameId: selectedGame.id,
        paymentType,
        paymentMethod,
        paymentDetails
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      if (response.data.success) {
        alert("Payment successful!");
        fetchPaymentHistory();
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Payment failed. Please try again.");
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleBack}>
          ← Back to Home
        </button>
        <h1>Payment Center</h1>
      </div>

      <div className={styles.content}>
        {isLoading ? (
          <div className={styles.loading}>Loading payment information...</div>
        ) : (
          <>
            <div className={styles.paymentOptions}>
              <h2>Select a Game</h2>
              <div className={styles.gameList}>
                {games.map((game) => (
                  <div
                    key={game.id}
                    className={`${styles.gameCard} ${
                      selectedGame?.id === game.id ? styles.selected : ""
                    }`}
                    onClick={() => handleGameSelect(game)}
                  >
                    <h3>{game.name}</h3>
                    <p>${game.price}</p>
                  </div>
                ))}
              </div>

              <div className={styles.paymentType}>
                <h2>Payment Type</h2>
                <div className={styles.typeOptions}>
                  <button
                    className={`${styles.typeButton} ${
                      paymentType === "purchase" ? styles.selected : ""
                    }`}
                    onClick={() => handlePaymentTypeChange("purchase")}
                  >
                    One-time Purchase
                  </button>
                  <button
                    className={`${styles.typeButton} ${
                      paymentType === "subscription" ? styles.selected : ""
                    }`}
                    onClick={() => handlePaymentTypeChange("subscription")}
                  >
                    Monthly Subscription
                  </button>
                </div>
              </div>

              <div className={styles.paymentMethods}>
                <h2>Select Payment Method</h2>
                <div className={styles.methodOptions}>
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      className={`${styles.methodButton} ${
                        paymentMethod === method.id ? styles.selected : ""
                      }`}
                      onClick={() => handlePaymentMethodSelect(method.id)}
                    >
                      <span className={styles.methodIcon}>{method.icon}</span>
                      <span>{method.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {paymentMethod && (
                <div className={styles.paymentDetails}>
                  <h2>Payment Details</h2>
                  {paymentMethod === "credit" && (
                    <>
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="Card Number"
                        value={paymentDetails.cardNumber}
                        onChange={handleInputChange}
                        required
                      />
                      <div className={styles.cardDetails}>
                        <input
                          type="text"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={paymentDetails.expiryDate}
                          onChange={handleInputChange}
                          required
                        />
                        <input
                          type="text"
                          name="cvv"
                          placeholder="CVV"
                          value={paymentDetails.cvv}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </>
                  )}

                  {paymentMethod === "paypal" && (
                    <input
                      type="email"
                      name="paypalEmail"
                      placeholder="PayPal Email"
                      value={paymentDetails.paypalEmail}
                      onChange={handleInputChange}
                      required
                    />
                  )}

                  {(paymentMethod === "bkash" || paymentMethod === "nagad") && (
                    <input
                      type="text"
                      name={`${paymentMethod}Number`}
                      placeholder={`${paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)} Number`}
                      value={paymentDetails[`${paymentMethod}Number`]}
                      onChange={handleInputChange}
                      required
                    />
                  )}
                </div>
              )}

              {selectedGame && (
                <div className={styles.paymentSummary}>
                  <h2>Payment Summary</h2>
                  <p>Game: {selectedGame.name}</p>
                  <p>Type: {paymentType === "subscription" ? "Monthly Subscription" : "One-time Purchase"}</p>
                  <p>Amount: ${paymentType === "subscription" ? selectedGame.price : selectedGame.price}</p>
                  <button className={styles.payButton} onClick={handlePayment}>
                    Proceed to Payment
                  </button>
                </div>
              )}
            </div>

            <div className={styles.historySection}>
              <h2>Payment History</h2>
              {paymentHistory.length > 0 ? (
                paymentHistory.map((payment) => (
                  <div key={payment._id} className={styles.paymentItem}>
                    <div className={styles.paymentInfo}>
                      <h3>{payment.gameId.name}</h3>
                      <p>Amount: ${payment.amount}</p>
                      <p>Type: {payment.paymentType}</p>
                      <p>Status: {payment.status}</p>
                      <p>Date: {new Date(payment.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No payment history available</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Payment; 