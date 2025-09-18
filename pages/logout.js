// pages/logout.js
import { useEffect } from "react";
import { supabase } from "../lib/supabaseClient";  // path sahi hona zaroori hai

export default function Logout() {
  useEffect(() => {
    const doLogout = async () => {
      await supabase.auth.signOut();
      window.location.href = "/"; // logout ke baad home page
    };
    doLogout();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Logging out...</h1>
    </div>
  );
}