document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.actor-card');
    let cardsArray = Array.from(cards);
    positionChange(cardsArray);
    cardsArray[4].style.opacity = 1;
    window.addEventListener('resize', () => positionChange(cardsArray));

    // let autoPlayInterval = null;

    cardsArray.forEach((card) => {
        card.addEventListener('click', (e) => {
            e.stopPropagation(); // 阻止事件冒泡
            if (card !== cardsArray[0]) {
                cardsArray = moveCards(cardsArray, card);
                positionChange(cardsArray);
                // clearInterval(autoPlayInterval);
                // autoPlayInterval = setAutoPlayInterval();
            }
        });

        // card.addEventListener('mouseover', (e) => {
        //     e.stopPropagation(); // 阻止事件冒泡
        //     if (card === cardsArray[0]) {
        //         clearInterval(autoPlayInterval);
        //     }
        // });

        // card.addEventListener('mouseout', (e) => {
        //     e.stopPropagation(); // 阻止事件冒泡
        //     if (card === cardsArray[0]) {
        //         autoPlayInterval = setAutoPlayInterval();
        //     }
        // });
    });

    // autoPlayInterval = setAutoPlayInterval();

    // function setAutoPlayInterval() {
    //     return setInterval(() => {
    //         if (cardsArray.length > 1) { // 确保至少有两个卡片
    //             cardsArray = moveCards(cardsArray, cardsArray[1]); // 移动第二个卡片到首位
    //             positionChange(cardsArray);
    //         }
    //     }, 5000);
    // }
});

function positionChange(cards) {
    cards.forEach((card, index) => {
        if (index < cards.length && index === 4) {
            card.style.opacity = 0;
            card.addEventListener('transitionend', () => {
                card.style.opacity = 1;
            });
        }
        card.style.left = 5 + index * 2.5 + '%';
        card.style.top = 16 - index * 2.5 + '%';
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