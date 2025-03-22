document.addEventListener("DOMContentLoaded", () => {
    const socket = io();

    socket.on("update-officer", (tokens) => {
        console.log("📢 Officer received update-officer event!", tokens);

        const tokenList = document.getElementById("tokenList");
        tokenList.innerHTML = ""; // Clear table

        tokens.forEach(token => {
            const row = document.createElement("tr");

            // If the token is already claimed, disable the button or show "Claimed"
            const buttonHTML = token.tokenState === "CLAIMED"
                ? `<span class="text-danger">Claimed</span>`
                : `<button class="claim-button btn btn-primary" data-id="${token._id}">Claim</button>`;

            row.innerHTML = `
                <td>${token.tokenNo}</td>
                <td>${token.name}</td>
                <td>${token.purpose}</td>
                <td>${token.tokenState}</td>
                <td>${buttonHTML}</td>
            `;
            tokenList.appendChild(row);
        });

        attachClickEvents(); // Re-attach events after update
    });

    function attachClickEvents() {
        document.querySelectorAll(".claim-button").forEach(button => {
            button.addEventListener("click", async (event) => {
                event.preventDefault();
                const tokenId = event.target.dataset.id; // Fixing dataset key

                try {
                    const response = await fetch(`/officer/select-token/${tokenId}`, { method: "POST" });
                    if (response.ok) {
                        console.log("✅ Token Claimed:", tokenId);
                    } else {
                        console.error("❌ Error claiming token");
                    }
                } catch (error) {
                    console.error("❌ Network Error:", error);
                }
            });
        });
    }

    attachClickEvents(); // Attach on initial load
});
