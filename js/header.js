// header变形
const header = document.querySelector('.header');
// 监听滚动事件
window.addEventListener('scroll', () => {
    if (window.scrollY > header.style.height) {
        // 一旦滚动超过header高度时，添加 fixed 类，使header贴边
        header.classList.add('fixed');
    } else {
        // 滚动回到顶部时，移除 fixed 类
        header.classList.remove('fixed');
    }
});

// 点击头像跳转至个人GitHub
const icon = document.querySelector('.header-left-img');
    icon.addEventListener('click', ()=>{
        const url = "https://github.com/Miii-381"
        window.open(url, '_blank');
    });

// 点击网页标题跳转至首页
const webTitle = document.querySelector('.header-left-title');
    webTitle.addEventListener('click', ()=>{
        window.location.href = './index.html'
    });