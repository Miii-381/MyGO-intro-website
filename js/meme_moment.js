document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.picture-box');
    const imgWidth = 360;
    var columnGap = 10;
    const rowGap = 10; // 行间距

    // 获取图片URL(支持多种格式图片)
    function getValidImageUrl(index) {
        const suffixes = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
        return new Promise((resolve) => {
            let currentSuffix = suffixes[0];
            
            function trySuffixes() {
                const currentUrl = `./resources/img/meme/${index}.${currentSuffix}`;
                const imgTest = new Image();
                imgTest.src = currentUrl;
                
                imgTest.onload = () => resolve(currentUrl);
                imgTest.onerror = () => {
                    const nextIndex = suffixes.indexOf(currentSuffix) + 1;
                    if (nextIndex < suffixes.length) {
                        currentSuffix = suffixes[nextIndex];
                        trySuffixes();
                    } else {
                        resolve('./resources/default.jpg'); // 默认图片路径
                    }
                };
            }
            
            trySuffixes();
        });
    }

    // 初始化列高数组
    let columnHeights = [];
    let columns = 0;

    function calculateLayout() {
        const containerWidth = container.offsetWidth;
        
        // 1. 计算最大可能的列数（忽略列间距）
        columns = Math.floor(containerWidth / imgWidth);
        columns = Math.max(1, columns); // 至少1列
        
        // 2. 根据列数计算列间距
        let totalImgWidth = columns * imgWidth;
        let availableGapSpace = containerWidth - totalImgWidth;
        columnGap = Math.floor(availableGapSpace / (columns + 1)); // 平均分配列间距
        
        // 3. 初始化列高数组
        columnHeights = new Array(columns).fill(0);
        
        // 4. 更新容器高度（后续由 addImage 动态调整）
        container.style.height = "auto";
    }

    // 获取目标列索引
    function getMinColumnIndex() {
        return columnHeights.indexOf(Math.min(...columnHeights));
    }

    // 添加图片到瀑布流
    function addImage(img) {
        const column = getMinColumnIndex();
        const left = (column * (imgWidth + columnGap)) + columnGap;
        const top = columnHeights[column] + 20;
        
        // 设置图片位置
        img.style.left = `${left}px`;
        img.style.top = `${top}px`;
        
        // 更新列高
        columnHeights[column] += img.offsetHeight + rowGap;

        if(!observer) createObserver();
        observer.observe(img);
        
        // 更新容器高度
        container.style.height = `${Math.max(...columnHeights) - rowGap + 50}px`;
    }

    // 异步加载图片
    async function loadImages(count) {
        const images = []; // 存储所有图片对象
        const promises = [];
        
        for (let i = 1; i <= count; i++) {
            promises.push(
                getValidImageUrl(i).then(url => {
                    return new Promise(resolve => {
                        const img = new Image();
                        img.src = url;
                        img.onload = () => {
                            images[i - 1] = img; // 按编号存储
                            resolve();
                        };
                        img.onerror = () => resolve();
                    });
                })
            );
        }
        
        await Promise.all(promises);
        
        // 按编号顺序插入 DOM 并布局
        images.forEach(img => {
            container.appendChild(img);
            addImage(img);
        });
    }

    // 创建观察者
    let observer;

    function createObserver() {
        observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate'); // 触发动画
                    observer.unobserve(entry.target); // 移除监听（只触发一次）
                }
            });
        }, {
            rootMargin: '0px 0px -50px 0px', // 提前50px触发动画
            threshold: 0.1 // 进入视口10%时触发
        });
    }

    // 加载图片（适配多种格式）
    loadImages(54); // 没后端，没法简单获取文件夹内图片数量作为参数...
    // 初始化布局
    calculateLayout();

    // 窗口调整事件
    window.addEventListener("resize", () => {
        columnHeights = []; // 清空列高
        container.innerHTML = ""; // 清空容器
        calculateLayout(); // 重新计算列数
        loadImages(20); // 重新加载图片
    });

    // 监听窗口大小变化，并延迟执行计算布局
    var timer = null;
    window.onresize = () => {
        if(timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(calculateLayout, 300);
    }
});
