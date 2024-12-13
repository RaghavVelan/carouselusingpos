const cardsContainer = document.querySelector(".cardContainer")
const expandBtn = document.querySelector(".expandBtn")
const prevBtn = document.querySelector(".PrevBtn")
const nextBtn = document.querySelector(".NextBtn")

let currentIndex = 0;
const cardWidth = 300;
const cardGap = 16;

let touchStartX = 0;
let touchEndX = 0;
let dragStartX = 0;
let dragEndX = 0;
let isDragging = false;

let isStacked = true;

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
    isStacked = false;
    const cards = document.querySelectorAll(".card");
    cards.forEach((card, index) => {
        card.style.zIndex = 0;
        card.style.left = `${((index * cardWidth) + (cardGap * (index + 1))) - ((cardWidth + cardGap) * currentIndex)}px`; 
    })
    toggleButtons()
}

function stack(){
    isStacked = true;
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
    if (touchEndX < touchStartX && isStacked === false) {
        // Swiped left, move to next card
        if (currentIndex < document.querySelectorAll(".card").length - 1) {
            currentIndex++;
            carousel();
        }
    }
    if (touchEndX > touchStartX && isStacked === false) {
        // Swiped right, move to previous card
        if (currentIndex > 0) {
            currentIndex--;
            carousel();
        }
    }
}

cardsContainer.addEventListener("mousedown", (e) => {
    // e.target.style.cursor = "grabbing";
    document.querySelectorAll(".card").forEach((card) => {
        card.style.cursor = "grabbing";
    })
    dragStartX = e.clientX;
    isDragging = true;
});

cardsContainer.addEventListener("mouseup", (e) => {
    dragEndX = e.clientX;
    handleDrag()
});

function handleDrag(){
    if (isDragging && isStacked === false) {
        isDragging = false;
        if(dragStartX > dragEndX){
            // Swiped left, move to next card
            if (currentIndex < document.querySelectorAll(".card").length - 1) {
                currentIndex++;
                carousel();
            }
        }
        if(dragStartX < dragEndX){
            // Swiped right, move to previous card
            if (currentIndex > 0) {
                currentIndex--;
                carousel();
            }
        }
    }
}
