const cardsContainer = document.querySelector(".cardContainer")
const expandBtn = document.querySelector(".expandBtn")
const prevBtn = document.querySelector(".PrevBtn")
const nextBtn = document.querySelector(".NextBtn")

let currentIndex = 0;
const cardWidth = 300;
const cardGap = 16;

let touchStartX = 0;
let touchEndX = 0;

stack();

expandBtn.addEventListener("click", () => {
    currentIndex = 0;
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
        card.style.left = `${((index * cardWidth) + (cardGap * (index + 1))) - ((cardWidth + cardGap) * currentIndex)}px`; 
    })
    toggleButtons()
}

function stack(){
    const cards = document.querySelectorAll(".card");
    cards.forEach((card, index) => {
        let cardIndex = cards.length - index;
        card.style.zIndex = cardIndex;
        card.style.left = `calc(50% + ${index * 1}rem)`; 
    })
    toggleButtons()
}

function toggleButtons() {
    const cards = document.querySelectorAll(".card");
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === cards.length - 1;
}

// next slide
nextBtn.addEventListener("click", () => {
    const cards = document.querySelectorAll(".card");
    if(currentIndex < cards.length - 1){
        currentIndex++;
        carousel();
    }
})

// previous slide
prevBtn.addEventListener("click", () => {
    const cards = document.querySelectorAll(".card");
    if(currentIndex > 0){
        currentIndex--;
        carousel();
    }
})

// Detect swipe events
cardsContainer.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

cardsContainer.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX) {
        // Swiped left, move to next card
        if (currentIndex < document.querySelectorAll(".card").length - 1) {
            currentIndex++;
            carousel();
        }
    }
    if (touchEndX > touchStartX) {
        // Swiped right, move to previous card
        if (currentIndex > 0) {
            currentIndex--;
            carousel();
        }
    }
}
