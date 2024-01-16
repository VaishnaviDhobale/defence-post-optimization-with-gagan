import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

export function LogoutComponant() {
  const [sessionID, setSessionID] = useState(null);

  useEffect(() => {
    // Check if a session identifier is stored in cookies
    const storedSessionID = Cookies.get("sessionID");

    // If no session identifier is stored, generate a new one
    if (!storedSessionID) {
      const newSessionID = generateUniqueIdentifier();
      Cookies.set("sessionID", newSessionID, { expires: 7 }); // Set an expiration time
      setSessionID(newSessionID);
    } else {
      setSessionID(storedSessionID);
    }
  }, []);

  // Handle multiple tabs: If the session identifier changes, log the user out
  useEffect(() => {
    const storedSessionID = Cookies.get("sessionID");
    if (storedSessionID !== sessionID) {
      // Log the user out or take appropriate action
      // For example, redirect them to the login page
      // You can also show a message or prompt for reauthentication
      alert("You have been logged out in this tab due to session sharing.");
    }
  }, [sessionID]);

  return (
    <div className="App">
      {/* Your React application content */}
    </div>
  );
}

function generateUniqueIdentifier() {
  // Generate a unique session identifier logic here
  return "your_unique_identifier";
}

