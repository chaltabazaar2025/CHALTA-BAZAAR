import { useState } from "react";
import { supabase } from "../lib/supabaseClient"; // apna supabase client import karo

export default function LoginPopup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showForgot, setShowForgot] = useState(false);

  // Login function
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage("Error: " + error.message);
    } else {
      setMessage("Login successful!");
    }
  };

  // Forgot password (send email link)
  const handleForgot = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/update-password", 
      // Deployment ke baad apna domain daalna eg: https://chaltabazaar.in/update-password
    });

    if (error) {
      setMessage("Error: " + error.message);
    } else {
      setMessage("Reset link sent to your email!");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Welcome to Chalta Bazaar</h2>

      {/* Email */}
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", margin: "10px 0", width: "100%" }}
      />

      {/* Password (hide if forgot password selected) */}
      {!showForgot && (
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: "block", margin: "10px 0", width: "100%" }}
        />
      )}

      {/* Buttons */}
      {!showForgot ? (
        <>
          <button onClick={handleLogin} style={{ width: "100%", marginTop: "10px" }}>
            Sign In
          </button>
          <p
            onClick={() => setShowForgot(true)}
            style={{ marginTop: "10px", color: "blue", cursor: "pointer" }}
          >
            Forgot Password?
          </p>
        </>
      ) : (
        <>
          <button onClick={handleForgot} style={{ width: "100%", marginTop: "10px" }}>
            Send Reset Link
          </button>
          <p
            onClick={() => setShowForgot(false)}
            style={{ marginTop: "10px", color: "blue", cursor: "pointer" }}
          >
            Back to Login
          </p>
        </>
      )}

      {/* Message */}
      {message && <p style={{ marginTop: "15px", color: "green" }}>{message}</p>}
    </div>
  );
}