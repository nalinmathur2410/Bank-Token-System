document.addEventListener("DOMContentLoaded", () => {
  const socket = io();
  const tokenDisplay = document.getElementById("current-token");
  const tokenName = document.getElementById("token-name");
  const tokenPurpose = document.getElementById("token-purpose");

  socket.on("token-claim", (token) => {
      console.log("📢 Token claimed:", token);
      tokenDisplay.textContent = token.tokenNo || "Waiting...";
      tokenName.textContent = token.name || "-";
      tokenPurpose.textContent = token.purpose || "-";
  });
});
