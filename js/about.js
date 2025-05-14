document.addEventListener('DOMContentLoaded', function() {
    /* 视频/音频设置 */
    const video = document.querySelector('.about-bg-video');
    const audio = document.querySelector('.about-bg-audio');

    function playVideo() {
        if (video) {
            video.volume = 0.2;
            audio.style.display = 'none';

            // 监听视频加载错误
            video.addEventListener('error', () => {
                console.warn("Video play failed, fallback to audio.");
                playAudio();
            });

            video.play();

        } else {
            playAudio(); // 视频元素不存在，播放音频
        }
    }

    function playAudio() {
        if (audio) {
            audio.volume = 0.2;
            audio.style.display = 'block';
            video.style.display = 'none';
            audio.addEventListener('error', () => {
                console.warn("Audio play failed.");
            });
            audio.play(); // 本来是想让屏幕滚动控制播放的，结果.play()强制用户进行交互才可以执行，否则报错，只好点击content区域进行播放了

        } else {
            console.log('No video or audio element found.');
        }
    }

    const content = document.querySelector('.content');
    content.addEventListener('click', playVideo);

    const closeBtn = document.getElementById('close-btn');
    const card = document.querySelector('.about-card');
    const downButton = document.querySelector('.down-button');

    closeBtn.addEventListener('click', function() {
        card.classList.remove('card-in');
        card.classList.add('card-out');
        downButton.classList.remove('down-button-out');
        downButton.classList.add('down-button-in');
        setTimeout(() => {
            card.style.display = 'none';
        }, 1000);
    });

    downButton.addEventListener('click', function() {
        card.style.display = 'flex';
        card.classList.remove('card-out');
        card.classList.add('card-in');
        downButton.classList.remove('down-button-in');
        downButton.classList.add('down-button-out');
    });
});