import { useState } from "react";
import Header from "./modules/Header";

function App() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    initialBalance: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateUsername = (username) => {
    // Only allow letters, numbers, underscores, min 3 chars
    return /^[a-zA-Z0-9_]{3,}$/.test(username);
  };

  const validateEmail = (email) => {
    // Basic email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const { username, email, initialBalance } = formData;
    if (!validateUsername(username)) {
      setError(
        "Invalid username: only letters, numbers, and underscores allowed, min 3 characters."
      );
      return;
    }
    if (!validateEmail(email)) {
      setError("Invalid email address.");
      return;
    }
    if (!initialBalance || isNaN(Number(initialBalance))) {
      setError("Initial balance must be a number.");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:5000/api/accounts/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            balance: Number(initialBalance),
          }),
        }
      );
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Failed to create account.");
      }
      setSuccess("Account created successfully!");
      setFormData({ username: "", email: "", initialBalance: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <h1 className="text-5xl text-center mb-6">Register</h1>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
            {success}
          </div>
        )}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
          className="block w-full mt-4 p-2 border border-gray-300 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          className="block w-full mt-4 p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          name="initialBalance"
          placeholder="Initial balance"
          value={formData.initialBalance}
          onChange={handleInputChange}
          className="block w-full mt-4 p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="block w-full mt-6 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Account
        </button>
      </form>
    </>
  );
}
export default App;
