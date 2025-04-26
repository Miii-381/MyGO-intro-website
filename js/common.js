// 因为header和footer在每个页面都存在，所以使用这个函数进行动态加载
document.addEventListener('DOMContentLoaded', function() {
    // 加载 header
    fetch('./header.html')
        .then(response => response.text())
        .then(html => {
            document.body.insertAdjacentHTML('afterbegin', html);

            // 手动添加 header 的 CSS
            const headerCss = document.createElement('link');
            headerCss.rel = 'stylesheet';
            headerCss.href = './css/header.css';
            document.head.appendChild(headerCss);

            // 手动加载script
            const headerScript = document.createElement('script');
            headerScript.src = './js/header.js'; // 相对于主页面的路径
            document.head.appendChild(headerScript);
        });
    
    // 加载 footer
    fetch('./footer.html')
        .then(response => response.text())
        .then(html => {
            document.body.insertAdjacentHTML('beforeend', html);

            // 手动添加 footer 的 CSS
            const footerCss = document.createElement('link');
            footerCss.rel = 'stylesheet';
            footerCss.href = './css/footer.css';
            document.head.appendChild(footerCss);
        });
});