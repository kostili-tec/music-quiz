export const playButtonArchiveEvent = (button, audioEl) => {
  button.addEventListener('click', () => {
    if (audioEl.paused === false) {
      audioEl.pause();
    } else {
      audioEl.play();
    }
  });
};

export const nextButtonEvent = (butttonEl, songsArr) => {
  butttonEl.addEventListener('click', () => {
    const cover = document.querySelector('.cover-img__full');
    const selectEl = document.querySelector('.archive-select');
    const audioEl = document.querySelector('.audio');
    audioEl.pause();
    let nextValue = ++selectEl.value;
    if (nextValue >= songsArr.length) {
      nextValue = 0;
    }
    selectEl.value = nextValue;
    const currentSong = songsArr[nextValue];
    audioEl.src = currentSong.audio;
    cover.src = currentSong.image;
    audioEl.play();
  });
};

export const prevButtonEvent = (buttonEl, songsArr) => {
  buttonEl.addEventListener('click', () => {
    const cover = document.querySelector('.cover-img__full');
    const selectEl = document.querySelector('.archive-select');
    const audioEl = document.querySelector('.audio');
    audioEl.pause();
    let prevValue = --selectEl.value;
    if (prevValue <= -1) {
      prevValue = songsArr.length - 1;
    }
    selectEl.value = prevValue;
    const currentSong = songsArr[prevValue];
    audioEl.src = currentSong.audio;
    cover.src = currentSong.image;
    audioEl.play();
  });
};

const buttonPause = (button) => {
  const audioSvg = button.firstChild;
  audioSvg.innerHTML = '<use xlink:href="./copies/sprite.svg#pause-button"></use>';
  audioSvg.id = '';
};

const buttonPlay = (button) => {
  const audioSvg = button.firstChild;
  audioSvg.innerHTML = '<use xlink:href="./copies/sprite.svg#play-button"></use>';
  audioSvg.id = 'audio-play';
};

export const selectEvent = (selectEl, audioEl, arrSongs) => {
  selectEl.addEventListener('change', () => {
    const currentSong = arrSongs[Number(selectEl.value)];
    selectEl.selected = true;
    const cover = document.querySelector('.cover-img__full');
    audioEl.pause();
    audioEl.src = currentSong.audio;
    audioEl.play();
    cover.src = currentSong.image;
  });
};

export const audioEvent = (audioEl) => {
/*   audioEl.addEventListener('progress', (e) => {
    console.log('loading');
  });
  audioEl.addEventListener('loadeddata', (e) => {
    console.log('isLoaded');
  }); */
  audioEl.addEventListener('play', () => {
    const playButton = document.querySelector('.play-button');
    buttonPause(playButton);
  });
  audioEl.addEventListener('pause', () => {
    const playButton = document.querySelector('.play-button');
    buttonPlay(playButton);
  });
};
