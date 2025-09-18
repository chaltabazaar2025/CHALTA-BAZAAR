import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdate = async () => {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setMessage("Error: " + error.message);
    } else {
      setMessage("Password updated successfully! Now you can log in.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Set New Password</h2>
      <input
        type="password"
        placeholder="Enter new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", margin: "10px 0", width: "100%" }}
      />
      <button onClick={handleUpdate} style={{ width: "100%", marginTop: "10px" }}>
        Update Password
      </button>
      {message && <p style={{ marginTop: "15px", color: "green" }}>{message}</p>}
    </div>
  );
}