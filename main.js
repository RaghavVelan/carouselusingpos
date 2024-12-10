const cardsContainer = document.querySelector(".cardContainer")
const expandBtn = document.querySelector(".expandBtn")
const prevBtn = document.querySelector(".PrevBtn")
const nextBtn = document.querySelector(".NextBtn")

stack();


expandBtn.addEventListener("click", () => {
    if(cardsContainer.classList.contains("carouselToggle")){
        cardsContainer.classList.remove("carouselToggle");
        requestAnimationFrame(carousel);
        expandBtn.innerHTML = "Collapse";
    } else {
        cardsContainer.classList.add("carouselToggle");
        requestAnimationFrame(stack);
        expandBtn.innerHTML = "Expand";
    }
})

function carousel(){
    const cards = document.querySelectorAll(".card");
    cards.forEach((card, index) => {
        card.style.zIndex = 0;
        card.style.left = `${(index * 300) + (16 * (index + 1))}px`;
    })
}

function stack(){
    const cards = document.querySelectorAll(".card");
    cards.forEach((card, index) => {
        let cardIndex = cards.length - index;
        card.style.zIndex = cardIndex;
        card.style.left = `calc(50% + ${index * 1}rem)`; 
    });
}

// nextBtn.addEventListener("click", () => {
//     const firstCard = cardsContainer.querySelector(".card");
//     if (firstCard) {
//         cardsContainer.removeChild(firstCard);
//         cardsContainer.appendChild(firstCard);
//         carousel();
//     }
// });

nextBtn.addEventListener("click", () => {
    const firstCard = cardsContainer.querySelector(".card");
    if (firstCard) {
        firstCard.style.transition = "transform 0.25s ease, opacity 0.25s ease";
        firstCard.style.transform = "translate(0%, -50%)";
        firstCard.style.opacity = "0"; // Fade out effect

        setTimeout(() => {
            firstCard.style.transition = "none";
            firstCard.style.transform = "translate(-0%, -50%);";
            firstCard.style.opacity = "1"; // Reset opacity
            cardsContainer.removeChild(firstCard);
            cardsContainer.appendChild(firstCard);
            carousel(); // Re-apply the carousel layout after the DOM changes
        }, 1000); // Match the duration of the transition
    }
});