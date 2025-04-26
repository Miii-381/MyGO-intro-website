document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.actor-card');
    let cardsArray = Array.from(cards);
    positionChange(cardsArray);

    window.addEventListener('resize', () => positionChange(cardsArray));

    cardsArray.forEach((card) => {
        card.addEventListener('click', () => {
            cardsArray = moveCards(cardsArray, card);
            positionChange(cardsArray);
            clearInterval(autoPlayInterval);
            autoPlayInterval = setAutoPlauInterval(cardsArray);
        });
    });

    let autoPlayInterval = null;
    autoPlayInterval = setAutoPlauInterval(cardsArray);
});

function positionChange(cards) {
    cards.forEach((card, index) => {
        if(index === 4) {
            card.style.opacity = 0;
            card.addEventListener('transitionend', () => {
                card.style.opacity = 1;
            })
        }
        card.style.left = 5 +  index * 2.5 + '%';
        card.style.top = 16 - index * 2.5 + '%';
        card.style.zIndex = cards.length - index;
    })
}

function moveCards(cardsArray, card) {
    // 1. 获取当前卡片在数组中的索引
    const currentIndex = cardsArray.indexOf(card);
    // 2. 重组数组：将当前卡片及之后的移到前面，之前的移到末尾
    const newCardsArray = [
        ...cardsArray.slice(currentIndex),  // 当前卡片及之后
        ...cardsArray.slice(0, currentIndex) // 当前卡片之前
    ];
    // 3. 返回更新后的卡片数组
    return newCardsArray;
}

function setAutoPlauInterval(cardsArray) {
    setInterval(() => {
        if(cardsArray.length > 0) {
            cardsArray = moveCards(cardsArray, cardsArray[1]);
            positionChange(cardsArray);
        }
    }, 3000);
}