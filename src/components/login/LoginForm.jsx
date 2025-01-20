import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, Text } from "@mantine/core";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState("signin"); // "signin" or "signup"
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!email) {
      setError("Email is required");
      return;
    }

    if (mode === "signup" && !name) {
      setError("Name is required for new users");
      return;
    }

    if (!pin || pin.length !== 4) {
      setError("4-digit PIN is required");
      return;
    }

    setIsLoading(true);

    try {
      await login(email, mode === "signup" ? name : "", pin);
      navigate("/");
    } catch (error) {
      if (error.message.includes("Email not found")) {
        setMode("signup");
        setError("Please sign up with your name to create a new account");
      } else {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePinChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setPin(value);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Soul Sync</h1>
        <p className="login-subtitle">දෙවියො සාක්කුවේ...</p>

        <div className="mode-toggle">
          <Button
            className={`mode-button ${mode === "signin" ? "active" : ""}`}
            onClick={() => setMode("signin")}
            variant="subtle"
          >
            Sign In
          </Button>
          <Button
            className={`mode-button ${mode === "signup" ? "active" : ""}`}
            onClick={() => setMode("signup")}
            variant="subtle"
          >
            Sign Up
          </Button>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email" className="input-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          {mode === "signup" && (
            <div className="input-group">
              <label htmlFor="name" className="input-label">
                Name <span className="required">*</span>
              </label>
              <input
                id="name"
                type="text"
                className="login-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
          )}

          <div className="input-group">
            <label htmlFor="pin" className="input-label">
              4-Digit PIN
            </label>
            <input
              id="pin"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="login-input pin-input"
              value={pin}
              onChange={handlePinChange}
              placeholder="0 0 0 0"
              required
            />
            <Text className="input-hint">
              {mode === "signup"
                ? "Choose a 4-digit PIN for your account"
                : "Enter your 4-digit PIN"}
            </Text>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading
              ? "Please wait..."
              : mode === "signin"
              ? "Sign In"
              : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
