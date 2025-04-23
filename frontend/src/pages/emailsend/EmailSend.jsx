import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const EmailSend = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendEmail = async () => {
    if (!email || !subject || !message) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, subject, message }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Email sent successfully!");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        toast.error(result.error || "Failed to send email");
      }
    } catch (err) {
      console.error("Email send error:", err);
      toast.error("Server error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 px-4">
      {/* Toaster Here */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="w-full max-w-xl p-8 bg-gray-900 border border-gray-700 rounded-lg shadow-lg text-white">
        <h2 className="text-3xl font-bold mb-2 text-center text-sky-300">
          Send Invitation by Email
        </h2>
        <p className="text-center text-gray-400 mb-6">
          Write a message and send it ✌️
        </p>

        <div className="mb-4">
          <label className="block text-sm mb-1">Recipient Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject of your email"
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-1">Message</label>
          <textarea
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message here..."
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
          ></textarea>
        </div>

        <button
          onClick={sendEmail}
          disabled={loading}
          className={`w-full py-2 rounded font-semibold transition-colors ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-sky-600 hover:bg-sky-700"
          }`}
        >
          {loading ? "Sending..." : "Send Email"}
        </button>
      </div>
    </div>
  );
};

export default EmailSend;
