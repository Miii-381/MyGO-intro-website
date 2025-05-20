document.addEventListener('DOMContentLoaded', function () {
    /*  背景视频/音频加载 */
    const about_bg_img = document.querySelector('.about-bg-img');
    const about_bg_video = '<video class="about-bg-video" id="bg-video" src="./resources/mayoiuta.mp4" controls loop preload="auto"></video>'
    const about_bg_audio = '<audio class="about-bg-audio" id="bg-audio" src="./resources/mayoiuta.mp3" controls loop preload="auto"></audio>'
    let video = null;
    let audio = null;

    async function checkFileExists(url) {
        try {
            const res = await fetch(url, { method: 'HEAD' });
            return res.ok; 
        } catch (error) {
            console.error('检查文件失败:文件不存在或无法访问', error);
            return false;
        }
    }

    async function add_bg_elements() {
        const videoExists = await checkFileExists('./resources/mayoiuta.mp4');
        const audioExists = await checkFileExists('./resources/mayoiuta.mp3');

        if (videoExists) {
            about_bg_img.insertAdjacentHTML('afterend', about_bg_video);
            video = document.getElementById('bg-video');
            
            video.volume = 0.2;

            // 监听视频加载错误
            video.addEventListener('error', () => {
                console.warn("视频加载失败，开始加载音频。");
            });
        } else if (audioExists) {
            about_bg_img.insertAdjacentHTML('afterend', about_bg_audio);
            audio = document.getElementById('bg-audio');

            audio.volume = 0.2;

            // 监听音频加载错误
            audio.addEventListener('error', () => {
                console.warn("音频加载失败！")
            })
        } else {
            console.warn("视频和音频文件都不存在，无法播放背景视频或音频!");
        }
    }

    add_bg_elements();

    /* 背景音乐播放 */
    const content = document.querySelector('.content');
    content.addEventListener('click', () => {
        if (video)
            video.play().catch(err => { console.log('视频播放失败！', err) });
        else {
            video.style.display = 'none';
            if (audio)  { audio.play().catch(err => { console.log('音频播放失败！', err)}) }
            else        { console.log('No video or audio element found.') };
        }
    }); // 本来是想让屏幕滚动控制播放的，结果.play()强制用户进行交互才可以执行，否则报错，只好点击content区域进行播放了

    /* 控制卡片出现和隐藏的功能 */
    const closeBtn = document.getElementById('close-btn');
    const card = document.querySelector('.about-card');
    const downButton = document.querySelector('.down-button');

    closeBtn.addEventListener('click', function () {
        card.classList.remove('card-in');
        card.classList.add('card-out');
        downButton.classList.remove('down-button-out');
        downButton.classList.add('down-button-in');
        setTimeout(() => {
            card.style.display = 'none';
        }, 1000);
    });

    downButton.addEventListener('click', function () {
        card.style.display = 'flex';
        card.classList.remove('card-out');
        card.classList.add('card-in');
        downButton.classList.remove('down-button-in');
        downButton.classList.add('down-button-out');
    });
});