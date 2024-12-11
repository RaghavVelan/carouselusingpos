const cardsContainer = document.querySelector(".cardContainer")
const expandBtn = document.querySelector(".expandBtn")
const prevBtn = document.querySelector(".PrevBtn")
const nextBtn = document.querySelector(".NextBtn")

let currentIndex = 0;
const cardWidth = 300;
const cardGap = 16;

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
}

function stack(){
    const cards = document.querySelectorAll(".card");
    cards.forEach((card, index) => {
        let cardIndex = cards.length - index;
        card.style.zIndex = cardIndex;
        card.style.left = `calc(50% + ${index * 1}rem)`; 
    });
}

nextBtn.addEventListener("click", () => {
    const cards = document.querySelectorAll(".card");
    if(currentIndex < cards.length - 1){
        currentIndex++;
        carousel();
    }
})

prevBtn.addEventListener("click", () => {
    const cards = document.querySelectorAll(".card");
    if(currentIndex > 0){
        currentIndex--;
        carousel();
    }
})