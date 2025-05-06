document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.actor-card');
    let cardsArray = Array.from(cards);
    positionChange(cardsArray);
    cardsArray[4].style.opacity = 1;
    window.addEventListener('resize', () => positionChange(cardsArray));

    cardsArray.forEach((card) => {
        card.addEventListener('click', (e) => {
            e.stopPropagation(); // 阻止事件冒泡
            if (card !== cardsArray[0]) {
                cardsArray = moveCards(cardsArray, card);
                positionChange(cardsArray);
            }
        });
    });
});

function positionChange(cards) {
    cards.forEach((card, index) => {
        if (index < cards.length && index === 4) {
            card.style.opacity = 0;
            card.addEventListener('transitionend', () => {
                card.style.opacity = 1;
            });
        }
        card.style.left = index * 2.5 + '%';
        card.style.top =  12 - (index * 3) + '%';
        card.style.zIndex = cards.length - index;
    });
}

function moveCards(currentArray, card) {
    const currentIndex = currentArray.indexOf(card);
    const newCardsArray = [
        ...currentArray.slice(currentIndex),
        ...currentArray.slice(0, currentIndex)
    ];
    return newCardsArray;
}