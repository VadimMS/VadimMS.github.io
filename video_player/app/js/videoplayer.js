class VideoPlayer {
    constructor(settings) {
        this.__settings = Object.assign
        (VideoPlayer.getDefaultSettings(), settings);
        this.__videoContainer = null;
        this.__video = null;
        this.__playBtn = null;
        this.__progressBar = null;
        this.__progressContainer = null;
        this.__volumeBar = null;
        this.__playbackBar = null;
        this.__skipBtns = null;
        this.__mouseDown = false;
    }

    static getDefaultSettings() {
        /**
        * Cписок настроек по умолчанию
        */
        return {
            videoUrl: '',
            videoContainer: '.mplayer',
            volume: 1,
        };
    }

    init() {
        //Проверить добавлено ли видео URL
        if(!this.__settings.videoUrl) {
            return console.error('Передайте адресс видео');
        }
        //Проверить передан ли контейнер
        if (!this.__settings.videoContainer) {
            return console.error('Передайте контейнер для плеера');
        }
        //Добавить HTML разметку на страницу
        this.__addTemplate();

        //Найти все элементы управления
        this.__defineElements();

        //Установить обработчики событий
        this.__addEvents();
    }

    __addTemplate() {
        const template = this.__createVideoTemplate();
        this.__videoContainer = document.querySelector(this.__settings.videoContainer);
        this.__videoContainer.insertAdjacentHTML('afterbegin', template);
   } 

   __defineElements() {
        this.__video = this.__videoContainer.querySelector('video');
        this.__playBtn = this.__videoContainer.querySelector('.player__button');
        this.__progressBar = this.__videoContainer.querySelector('.progress__filled');
        this.__progressContainer = this.__videoContainer.querySelector('.progress');
        this.__volumeBar = this.__videoContainer.querySelector('[name="volume"]');
        this.__playbackBar = this.__videoContainer.querySelector('[name="playbackRate"]');
        this.__skipBtns = this.__videoContainer.querySelector('.skip__group');
   }

   togglePlay() {
        const method = this.__video.paused ? 'play' : 'pause';
        this.__playBtn.textContent = this.__video.paused ? '❚ ❚' :  '►';
        this.__video[method]();
   }

   __handleProgress() {
        const percent = (this.__video.currentTime / this.__video.duration) * 100;
        this.__progressBar.style.flexBasis = `${percent}%`;
   }

   __scrub(e) {
        this.__video.currentTime = (e.offsetX / this.__progressContainer.offsetWidth) * this.__video.duration;
   }

   __goToStart() {
        this.__video.currentTime = 0;
        this.__playBtn.textContent = '►';
   }

   __volumeChange() {
        this.__video.volume = this.__volumeBar.value;
        
   }

   __playbackChange() {
        this.__video.playbackRate = this.__playbackBar.value;
   }

   __skipChange(e) {
         if(e.target.classList.contains('skip__btn')){
            this.__video.currentTime = this.__video.currentTime + +e.target.dataset.skip; 
        }
   }

   __addEvents() {
        this.__video.addEventListener('click', () => this.togglePlay());
        this.__playBtn.addEventListener('click', () => this.togglePlay());
        this.__video.addEventListener('timeupdate', () => this.__handleProgress());
        this.__progressContainer.addEventListener('click', e => this.__scrub(e));
        this.__progressContainer.addEventListener('mousedown', () => this.__mouseDown = true);
        this.__progressContainer.addEventListener('mousemove', e => this.__mouseDown && this.__scrub(e));
        this.__progressContainer.addEventListener('mouseup', () => this.__mouseDown = false);
        this.__video.addEventListener('ended', () => this.__goToStart());
        this.__volumeBar.addEventListener('input', () => this.__volumeChange());
        this.__playbackBar.addEventListener('input', () => this.__playbackChange());
        this.__skipBtns.addEventListener('click', e => this.__skipChange(e));

   }

    __createVideoTemplate() {
        return `
//         <div class="player">
//           <video class="player__video viewer" src="${this.__settings.videoUrl}"> </video>
//           <div class="player__controls">
//             <div class="progress">
//                 <div class="progress__filled"></div>
//             </div>
//             <button class="player__button toggle" title="Toggle Play">►</button>
//             <input type="range" name="volume" class="player__slider" min=0 max="1" step="0.05" value="${this.__settings.volume}">
//             <input type="range" name="playbackRate" class="player__slider" min="0.1" max="2" step="0.1" value="1">
//             <div class="skip__group">
//                 <button data-skip="-1" class="player__button skip__btn">« 1s</button>
//                 <button data-skip="1" class="player__button skip__btn">1s »</button>
//             </div>
//           </div>
//         </div>
//         `;
    }

}