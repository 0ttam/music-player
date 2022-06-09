//1. render songs
//2. Scroll top
//3. Play/Pause/Seek
//4. CD Rotate
//5. Next/Prev
//6. Random
//7. Next/Repeat when Ended
//8. Active song
//9. Scrool active song into view 
//10. Play song when click

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYERS_STORAGE_KEY = 'F8_PLAYER';

const heading = $('h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const cd = $('.cd');
const playBtn = $('.btn.btn-toggle-play');
const player = $('.player');
const progress = $('#progress');
const btnNext = $('.btn-next');
const btnPrev = $('.btn-prev');
const btnRepeat = $('.btn-repeat');
const btnRandom = $('.btn-random');
const playList = $('.playlist');

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: JSON.parse(localStorage.getItem(PLAYERS_STORAGE_KEY)) || {},
  songs: [
    {
      name: "Chiều Thu Họa Bóng Nàng Cover",
      singer: "Double Chau",
      path: "https://tainhac123.com/listen/chieu-thu-hoa-bong-nang-cover-double-chou.DexyNksl2SVY.html",
      image: "https://doisongvaphattrien.vn/uploads/images/huynh-kpat-media/2021/PHU00025_mr1604253148932.jpg"
    },
    {
      name: "Sóng Gió (Lofi Version)",
      singer: "K-ICM x Jack",
      path: "https://tainhac123.com/listen/song-gio-lofi-version-k-icm-ft-jack-j97.uf30OHzwXGZZ.html",
      image: "https://afamilycdn.com/150157425591193600/2020/9/22/jack21-23-160078305074286121921.jpg"
    },
    {
      name: "Cô Đơn Dành Cho Ai",
      singer: "Nal",
      path: "https://play.imusicvn.com/stream/QeJ3LUOzzCOb",
      image:
        "https://yt3.ggpht.com/74TMOnYe65UhhcTOIweLisu999taOoEZUUgrtk4MUhRl3sHGMggJFjOuYvjU1wl2Phg2SJRK2Q=s900-c-k-c0x00ffffff-no-rj"
    },
    {
      name: "Hạ Còn Vương Nắng (Guitar Cover)",
      singer: "Nguyễn Thị Thảo",
      path: "https://tainhac123.com/listen/ha-con-vuong-nang-guitar-cover-nguyen-thi-thao.t9vjeyHVzmtK.html",
      image:
        "https://yt3.ggpht.com/ytc/AKedOLSA1fHlX2-qGkzvq_isl3h03d2qgGWbJvcV7ecT=s900-c-k-c0x00ffffff-no-rj"
    },
    {
      name: "Mưa",
      singer: "M4U x Thùy Chi",
      path:
        "https://tainhac123.com/listen/mua-m4u-ft-thuy-chi.pSwlTwUHs5hT.html",
      image: "https://i.ytimg.com/vi/-yhqOX3bLvQ/maxresdefault.jpg"
    },
    {
      name: "Phố Xa",
      singer: "Miu Lê",
      path:
        "https://tainhac123.com/listen/pho-xa-miu-le.V2qkrRxwbGhM.html",
      image: "https://afamilycdn.com/150157425591193600/2020/6/26/batch000043-4-1593134780129625552806.jpg"
    },
    {
      name: "Giấc Mơ Trưa",
      singer: "Thùy Chi",
      path: "https://tainhac123.com/listen/giac-mo-trua-thuy-chi.GGolRImAI-.html",
      image:
        "https://2sao.vietnamnetjsc.vn/images/2021/05/08/20/58/thuy-chi-01.jpg"
    },
    {
      name: "Đừng Như Thói Quen (Korean Version)",
      singer: "Sara Lưu",
      path:
        "https://play.imusicvn.com/stream/aE2CjhetHHgr",
      image:
        "https://sohanews.sohacdn.com/thumb_w/660/2018/12/4/10-1543899236163625071733.jpg"
    },
    {
      name: "Yêu Là Như Thế (Huyện Thái Gia 9 Tuổi OST)",
      singer: "Tuấn Huy",
      path: "https://tainhac123.com/listen/yeu-la-nhu-the-huyen-thai-gia-9-tuoi-ost-tuan-huy.H8RWVbLOlR.html",
      image:
        "https://bloganchoi.com/wp-content/uploads/2021/10/em-nho.jpg"
    }
  ],
  setConfig: function (key, value) {
    this.config[key] = value;
    localStorage.setItem(PLAYERS_STORAGE_KEY, JSON.stringify(this.config));
  },
  render: function() {
    var htmls = this.songs.map((song, index) =>{
      return `
      <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
      <div class="thumb" style="background-image: url('${song.image}')">
      </div>
      <div class="body">
        <h3 class="title">${song.name}</h3>
        <p class="author">${song.singer}</p>
      </div>
      <div class="option">
        <i class="fas fa-ellipsis-h"></i>
      </div>
    </div>
      `;
    } );
    playList.innerHTML = htmls.join('');
  }, 

  defineProperties: function() {
    Object.defineProperty(this, 'currentSong',{
      get: function() {
        return this.songs[this.currentIndex];
      }
    })
  },

  loadCurrentSong: function() {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },
  loadConfig: function() {
    this.isRandom = this.config.isRandom; 
    this.isRepeat = this.config.isRepeat;
  },
  prevSong: function() {
    this.currentIndex--;
    if(this.currentIndex < 0 ){
      this.currentIndex = this.songs.length -1;
    }
    this.loadCurrentSong();
  },
  nextSong: function() {
    this.currentIndex++;
    if(this.currentIndex >= this.songs.length){
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  playRandomSong: function() {
    let newIndex = 0;
    do{
      newIndex = Math.floor(Math.random() * this.songs.length);
      console.log(newIndex);
    }while(newIndex == this.currentIndex)
    this.currentIndex =newIndex;
    this.nextSong();
  },
  scrollToActiveSong: function() {
    setTimeout(() => {
      $('.song.active').scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        
      });
    },100)
  },
  handleEvent: function() {
    const cdWidth = cd.offsetWidth;
    const _this = this;
    //Handling CD rotation/stop
    const cdThumAnimate = cdThumb.animate([{
      transform: 'rotate(360deg)'}
    ], {duration: 10000, //10second
        iterations: Infinity
    });
    cdThumAnimate.pause();
    //Handle Zoom/Zout CD
    document.onscroll = function() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newcdWidth = cdWidth - scrollTop;
      cd.style.width = newcdWidth > 0 ? newcdWidth + 'px' : 0;
      cd.style.opacity = newcdWidth / cdWidth ;

    }
    //Handle when click play
    playBtn.onclick = function() {
      if(_this.isPlaying){
        audio.pause();
      }else{
        audio.play();
      }
      
    }
    //When song is playing
    audio.onplay = function() {
        _this.isPlaying = true;
        player.classList.add('playing');
        cdThumAnimate.play();
        _this.render();
        _this.scrollToActiveSong();
    }
    //When song is pause
    audio.onpause = function() {
      _this.isPlaying = false;
      player.classList.remove('playing');
      cdThumAnimate.pause();
    }
    //When the song playback progress changes
    audio.ontimeupdate = function() {
      if(audio.duration){
        progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
        progress.value = progressPercent;
      }
    }
    //Handling when rewinding songs
    progress.onchange = function(e) {
      const seek = e.target.value / 100 * audio.duration;
      audio.currentTime = seek;
    }
    //Handle when click Next
    btnNext.onclick = function() {
      if(_this.isRandom) {
        _this.playRandomSong();
      }else{
        _this.nextSong();
      }
      audio.play();
      _this.scrollToActiveSong();
    }
    //Handle when click Prev
    btnPrev.onclick = function() {
      if(_this.isRandom) {
        _this.playRandomSong();
      }else{
        _this.prevSong();
      }
      audio.play();
      _this.scrollToActiveSong();
    }
    //Handle when click Random
    btnRandom.onclick = function() {
      _this.isRandom = !_this.isRandom;
      _this.setConfig('isRandom', _this.isRandom);
      btnRandom.classList.toggle('active', _this.isRandom);
    }
    //Handle next song when audio ended
    audio.onended = function() {
      if(_this.isRepeat){
        audio.play();
      }else{
        _this.nextSong();
        audio.play();
      }
      
    }
    //Handle when click Repeat
    btnRepeat.onclick = function() {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig('isRepeat', _this.isRepeat);
      btnRepeat.classList.toggle('active', _this.isRepeat);
    }
    //Handle when click on playlist
    playList.onclick = function(e) {
      const songNode = e.target.closest('.song:not(.active)');
      if(songNode || e.target.closest('.option')) {
        //Handle when click on songs
        if(songNode) {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          _this.render();
          audio.play();
        }
        //Handle when click on option
      }
    }
  },
  start: function() {
    //Load config
    this.loadConfig();
    //Define properties for Object
    this.defineProperties();
    
    //Playing with Random song
    this.playRandomSong();
    //Load the first Song when star App
    this.loadCurrentSong();
    //Listen/ reject events in DOM
    this.handleEvent();
    //Render htmls for browser
    this.render();
    btnRepeat.classList.toggle('active', this.isRepeat);
    btnRandom.classList.toggle('active', this.isRandom);
  }
}
//start App
app.start();
