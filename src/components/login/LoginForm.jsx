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

    // Basic email validation
    if (!email) {
      setError("Email is required");
      return;
    }

    if (!pin || pin.length !== 4) {
      setError("4-digit PIN is required");
      return;
    }

    setIsLoading(true);

    try {
      // Always send the name if provided, regardless of mode
      await login(email, name, pin);
      navigate("/");
    } catch (error) {
      // Handle specific error cases
      if (error.message.includes("Email not found")) {
        setMode("signup");
        setError("Please enter your name to create a new account");
        // Focus the name input if it exists
        document.getElementById("name")?.focus();
      } else if (error.message.includes("Incorrect PIN")) {
        setError("Incorrect PIN. Please try again.");
        setPin("");
        // Focus the PIN input
        document.getElementById("pin")?.focus();
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

  // Helper to determine if form is valid
  const isFormValid = () => {
    if (!email) return false;
    if (mode === "signup" && !name) return false;
    if (!pin || pin.length !== 4) return false;
    return true;
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Soul Sync</h1>
        <p className="login-subtitle">දෙවියො සාක්කුවේ...</p>

        <div className="mode-toggle">
          <Button
            className={`mode-button ${mode === "signin" ? "active" : ""}`}
            onClick={() => {
              setMode("signin");
              setError("");
            }}
            variant="subtle"
          >
            Sign In
          </Button>
          <Button
            className={`mode-button ${mode === "signup" ? "active" : ""}`}
            onClick={() => {
              setMode("signup");
              setError("");
            }}
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
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="Enter your email"
              required
            />
          </div>

          {(mode === "signup" || error?.includes("enter your name")) && (
            <div className="input-group">
              <label htmlFor="name" className="input-label">
                Name <span className="required">*</span>
              </label>
              <input
                id="name"
                type="text"
                className="login-input"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
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

          <button
            type="submit"
            className="login-button"
            disabled={isLoading || !isFormValid()}
          >
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
