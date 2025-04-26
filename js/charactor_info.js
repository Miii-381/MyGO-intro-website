/////////////////////////////////////
// 卡片动效
/////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
    // 跟踪当前展开的卡片
    let currentActiveCard = null;
    // 获取所有卡片（如 .character-card-1, .character-card-2 等）
    const cards = document.querySelectorAll('.character-card > [class^="character-card-"]');
    // 定义关闭卡片的函数
    function closeCard(cardToClose) {

        cardToClose.classList.add('animate-card-out');
        cardToClose.classList.remove('animate-card-in');

        cards.forEach(otherCard => {
            if (currentActiveCard && otherCard !== currentActiveCard) {
                otherCard.classList.add('animate-other-card-in');
                otherCard.classList.remove('animate-other-card-out');
            }
        })
        currentActiveCard = null;
        setTimeout(() => {
            cardToClose.classList.remove('active');
            cardToClose.classList.remove('animate-card-out');
            cards.forEach(otherCard => {
                if (otherCard !== currentActiveCard) {
                    otherCard.classList.remove('animate-other-card-out');
                    otherCard.classList.remove('animate-other-card-in');
                }
            })
        }, 1000); // 根据动画时长设置按钮删除延迟
    }

    // 遍历卡片，设置点击事件
    cards.forEach(card => {
        const closeBtn = card.querySelector('.close-btn');
        const describe = card.querySelector('.character-describe');

        // 点击卡片事件处理函数
        card.addEventListener('click', () => {
            // 展开当前卡片
            card.classList.add('animate-card-in', 'active');
            card.classList.remove('animate-card-out');
            setTimeout(() =>{
                describe.style.opacity = 1;
            }, 200);
            currentActiveCard = card;

            cards.forEach(otherCard => {
                if (otherCard !== currentActiveCard) {
                    otherCard.classList.add('animate-other-card-out');
                    otherCard.classList.remove('animate-other-card-in');
                }
            })
        });

        // 点击关闭按钮事件处理函数
        closeBtn.addEventListener('click', (e) => {
            if (currentActiveCard === card) {
                describe.style.opacity = 0;
                closeCard(card);
            }
            // 阻止关闭按钮的点击事件冒泡到上层的卡片点击事件中
            e.stopPropagation();
        });
    });
});

/////////////////////////////////////
// 令.character-describe 的宽度随图片宽度变化而变化
/////////////////////////////////////

// 获取所有 .character-describe 元素
const describes = document.querySelectorAll('.character-describe');
function updateDescribeWidth(element) {
    // 获取父级卡片元素（如 .character-card-1）
    const card = element.closest('[class^="character-card-"]');
    if (!card) return;

    // 找到同级的图片元素（假设图片的 class 是 .character-pic）
    const image = element.closest('[class^="character-card-"]').querySelector('.character-pic');
    if (!image) return;

    // 确保图片已加载完成（避免获取到 0 宽度）
    if (image.complete && image.naturalWidth) {
    const cardWidth = card.offsetWidth; // 父级卡片的宽度（包含 padding 和 border）
    const imgWidth = image.offsetWidth; // 图片的实际宽度（包含 padding 和 border）
    const describeWidth = cardWidth - imgWidth;

    // 设置 .character-describe 的宽度为计算值
    element.style.width = `${describeWidth}px`;
    } else {
        // 如果图片未加载完成，监听 load 事件后重新计算
        image.addEventListener('load', () => updateDescribeWidth(element));
    }
}

// 监听窗口调整事件，动态更新宽度
window.addEventListener('resize', () => {
    describes.forEach(describe => updateDescribeWidth(describe));
});