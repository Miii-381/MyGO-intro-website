document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.episode-card');
    const observedCards = new Set(); // 记录已弹出的卡片

    function checkCards() {
        cards.forEach((card, index) => {
            if (!observedCards.has(card)) {
                const rect = card.getBoundingClientRect();
                if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                    observedCards.add(card);
    
                    // 在添加动画类之后初始化轮播
                    // 因为卡片飞入时，图片已被浏览器获取并加载，从而不会出现获取不到图片宽度的问题
                    // 使用DomContentLoaded时，可能会出现dom结构构建完成，但图片并未加载出来的问题，从而导致图片宽度获取为0
                    if (card.querySelector('.episode-imgs-inner')) {
                        initCarousel(card, index);
                    }

                    // 添加飞入动画
                    if(index % 2 === 0){
                        card.classList.add('active-left');
                    } else {
                        card.classList.add('active-right');
                    }
                }
            }
        });
    }

    // 初始加载时检查
    checkCards();
    // 监听滚动事件
    window.addEventListener('scroll', checkCards);
});

// 轮播图
function initCarousel(card, index) {
    const imgContainer = card.querySelector('.episode-imgs-inner');
    const originalImgs = Array.from(imgContainer.children);
    const indicators = card.querySelectorAll('.indicator');
    const prevBtn = card.querySelector('#left');
    const nextBtn = card.querySelector('#right');
    let currentSlide = 1; // 初始显示最前面的图片（首尾各一张复制后，原本的第一张图片索引为1）
    const originalLength = originalImgs.length; // 原始图片数量（排除首尾复制的）
    const imgWidth = imgContainer.children[0].offsetWidth; // 图片宽度

    // 复制首尾图片到容器两端
    imgContainer.appendChild(originalImgs[0].cloneNode(true)); // 尾部添加第一张
    imgContainer.prepend(originalImgs[originalLength - 1].cloneNode(true)); // 头部添加最后一张

    // 初始化位置（显示原始图片的第一张）
    if(imgContainer.children[0]){
        imgContainer.style.transform = `translateX(-${imgWidth}px)`;
    }

    // 初始化指示器
    indicators[0].classList.add('active'); // 默认显示第一张

    // 切换图片函数
    function switchSlide(direction) {
        currentSlide += direction;

        // 处理边界情况（跳转到复制的首尾时，立即重置位置）
        if (currentSlide === -1) { // 滑到数组的第一张（原始最后一张的复制）
            currentSlide = originalLength; // 跳转到原始的最后一张（无过渡）
            imgContainer.style.transition = 'none';
            imgContainer.style.transform = `translateX(-${currentSlide * imgWidth}px)`;
            imgContainer.clientWidth; // 新做法：浏览器在读取任何几何位置属性时，会触发强制渲染，从而实现浏览器的布局更新
            currentSlide -= 1;
        } else if (currentSlide === originalLength + 2) { // 滑到数组的最后一张（原始第一张的复制）
            currentSlide = 1; // 跳转到复制的第一张（无过渡）
            imgContainer.style.transition = 'none';
            imgContainer.style.transform = `translateX(-${currentSlide * imgWidth}px)`;
            imgContainer.clientWidth;
            currentSlide += 1;
        }

        // 更新位置
        imgContainer.style.transition = 'transform 1s ease-in-out';
        imgContainer.style.transform = `translateX(-${currentSlide * imgWidth}px)`;

        // 更新指示器（根据原始索引）
        const actualSlide = (currentSlide - 1) % originalLength;
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === actualSlide);
        });

        autoPlay();
    }

    // 自动播放函数
    let autoPlayInterval;
    function autoPlay() {
        clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(() => {switchSlide(1)}, customRandom(3000, 5000));
    }

    // 绑定按钮事件
    prevBtn.addEventListener('click', () => switchSlide(-1));
    nextBtn.addEventListener('click', () => switchSlide(1));

    // 绑定指示器事件
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index + 1;
            imgContainer.style.transition = 'transform 1s ease-in-out';
            imgContainer.style.transform = `translateX(-${currentSlide * imgWidth}px)`;

            // 更新指示器（根据原始索引）
            const actualSlide = (currentSlide - 1) % originalLength;
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === actualSlide);
            });

            autoPlay();
        })
    })

    // 初始化自动播放
    autoPlay();
}
function customRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
