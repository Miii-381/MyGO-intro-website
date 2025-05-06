document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('bg-video');
    const audio = document.querySelector('.about-bg-audio');

    function playVideo() {
        if (video) {
            video.volume = 0.3;
            audio.style.display = 'none';

            // 监听视频加载错误
            video.addEventListener('error', () => {
                console.warn("Video load failed, fallback to audio.");
                playAudio();
            });

            video.play().catch(err => {
                console.error("Video playback failed", err);
                playAudio(); // 视频播放失败，尝试播放音频
            });
        } else {
            playAudio(); // 视频元素不存在，播放音频
        }
    }

    function playAudio() {
        if (audio) {
            audio.volume = 0.3;
            audio.style.display = 'block';
            video.style.display = 'none';
            audio.play().catch(err => {
                console.error("Audio playback failed", err);
            });
        } else {
            console.log('No video or audio element found.');
        }
    }

    window.addEventListener('scroll', playVideo);

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