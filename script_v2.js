const envelopeWrapper = document.querySelector(".envelope-wrapper");
const card = document.querySelector(".card");

document.addEventListener("click", (e) => {
    const target = e.target;

    // Check if the click is on the envelope, flaps, or heart to toggle the 'abierto' class
    if (target.matches(".envelope") ||
        target.matches(".flap-right") ||
        target.matches(".flap-left") ||
        target.matches(".heart")) {
        envelopeWrapper.classList.toggle("abierto");
    }
    // Check if the click is on any part of the envelope (excluding the card itself when open)
    else if (target.closest(".envelope-wrapper") && !target.closest(".card.open")) {
        if (!card.classList.contains("open")) {
            // Open the card
            card.classList.add("show-card");
            setTimeout(() => {
                card.classList.remove("show-card");
                card.classList.add("open");
            }, 500);
            envelopeWrapper.classList.add("disable-envelope"); // Disable further envelope clicks
        } else {
            // Close the card
            card.classList.add("closing-card");
            envelopeWrapper.classList.remove("disable-envelope"); // Re-enable envelope clicks

            setTimeout(() => {
                card.classList.remove("closing-card");
                card.classList.remove("open");
            }, 500);
        }
    }
});

//------------------------------------------------------------------