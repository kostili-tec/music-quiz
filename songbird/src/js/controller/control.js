import { scoreObj, songsObj, currentSongsObj, currentSongObj, memesObj } from '../store/store';
import { createGame, createPickedSong, addDescription } from '../pages/game/gamePage';
import { createStartHeader, createGameHeader } from '../components/header';
import { createWelcome } from '../pages/start/startPage';
import { createFooter } from '../components/footer';

export const saveCurrentRandomObj = (storeObj) => {
  const randomIndex = Math.floor(Math.random() * (storeObj.length));
  Object.assign(currentSongObj.currentSong, storeObj[randomIndex]);
};

export const getRandomMeme = (memeObj) => {
  const keys = Object.keys(memeObj);
  console.log(memeObj[keys[ keys.length * Math.random() << 0]]);
  return memeObj[keys[ keys.length * Math.random() << 0]];
};

export const handleInputChange = (parentObj, e) => {
  let { target } = e;
  const audio = parentObj.querySelector('.audio');
  if (e.target.type !== 'range') {
    target = parentObj.querySelector('#range-progress');
  }
  const { min } = target;
  const { max } = target;
  const val = target.value;

  audio.currentTime = audio.duration * (val / 100);
  target.style.backgroundSize = `${(val - min) * 100 / (max - min)}% 100%`;
};

export const handleInputVolumeChange = (audioEl, e) => {
  let { target } = e;
  const { min } = target;
  const { max } = target;
  const val = target.value;
  audioEl.volume = Number(target.value / 100);
  target.style.backgroundSize = `${(val - min) * 100 / (max - min)}% 100%`;
}

export const fillProgress = (parentObj, e) => {
  const audio = e.target;
  const currentTime = parentObj.querySelector('.audio-current');
  const lengthTime = parentObj.querySelector('.audio-end');
  const progress = parentObj.querySelector('.input-progress__audio');

  progress.value = audio.currentTime / audio.duration * 100;
  const { min } = progress;
  const { max } = progress;
  const val = progress.value;
  progress.style.backgroundSize = `${(val - min) * 100 / (max - min)}% 100%`;

  let minsCurrent = Math.floor(audio.currentTime / 60);
  let secsCurrent = Math.floor(audio.currentTime % 60);
  if (minsCurrent < 10) {
    minsCurrent = `0${minsCurrent}`;
  }
  if (secsCurrent < 10) {
    secsCurrent = `0${secsCurrent}`;
  }
  currentTime.textContent = `${minsCurrent}:${secsCurrent}`;

  let minsFull = parseInt(audio.duration / 60, 10);
  let secsFull = parseInt(audio.duration % 60);
  if (minsFull < 10) {
    minsFull = `0${minsFull}`;
  }
  if (secsFull < 10) {
    secsFull = `0${secsFull}`;
  }
  lengthTime.textContent = `${minsFull}:${secsFull}`;
};

export const updateProgress = (e) => {
  const audio = document.querySelector('.audio');
  console.log((e.offsetX / e.target.clientWidth) * audio.duration);
  audio.currentTime = (e.offsetX / e.target.clientWidth) * audio.duration;
};

export const createNewAudio = () => {
  const audio = new Audio();
  audio.classList.add('audio');
  audio.setAttribute('data-id', currentSongObj.currentSong.id);
  audio.src = currentSongObj.currentSong.audio;
  audio.volume = 0.5;
  return audio;
};

export const createPickedAudio = (obj) => {
  const audio = new Audio();
  audio.classList.add('audio');
  audio.setAttribute('data-id', obj.id);
  audio.src = obj.audio;
  audio.volume = 0.5;
  return audio;
}

export const playButtonEvent = (button, audioEl, parentEl) => {
  let isPlayed = false;
  audioEl.addEventListener('ended', () => {
    const audioSvg = parentEl.querySelector('.audio-svg ');
    audioSvg.innerHTML = '<use xlink:href="./copies/sprite.svg#stop-button"></use>';
    audioSvg.id = 'audio-stop';
    isPlayed = false;
  });
  button.addEventListener('click', () => {
    const audioSvg = parentEl.querySelector('.audio-svg ');
    if (!isPlayed) {
      isPlayed = true;
      audioEl.play();
      audioSvg.innerHTML = '<use xlink:href="./copies/sprite.svg#pause-button"></use>';
      audioSvg.id = '';
    } else {
      isPlayed = false;
      audioEl.pause();
      audioSvg.innerHTML = '<use xlink:href="./copies/sprite.svg#play-button"></use>';
      audioSvg.id = 'audio-play';
    }
  });
};

export const backToMainPage = () => {
  document.body.replaceChildren();
  const header = createStartHeader();
  const main = createWelcome();
  const footer = createFooter();
  document.body.append(header, main, footer);
}

const highlightCategory = (number) => {
  const li = document.querySelectorAll('.nav__li');
  li[number].classList.add('highlight-box');
  li[number].lastChild.classList.add('li-bg__active');
}

let numberPage = -1;

export const hashChangeEvent = () => {
  window.addEventListener('hashchange', () => {
    let nextObj = null;
    let nextMain = null;
    let nextMemeObj = null;
    const main = document.querySelector('.main-game');
    const hash = window.location.hash.slice(1);
    console.log(window.location.hash);
    if (hash !== 'main') {
      numberPage++;
      console.log(numberPage);
    } else {
      numberPage = -1;
      console.log(numberPage);
    }    
    switch (hash) {
      case 'main': 
        nextObj = songsObj.classic;
        currentSongObj.currentObj = songsObj.classic;
        backToMainPage();
        break;
      case 'start':
        nextObj = songsObj.classic;
        nextMemeObj = memesObj.classic;
        currentSongObj.currentObj  = songsObj.classic;
        document.body.replaceChildren();
        const header = createGameHeader();
        const bg = document.createElement('div');
        const footer = createFooter();
        nextMain = createGame(nextObj, nextMemeObj);
        bg.classList.add('game-bg');
        document.body.append(header, bg, nextMain, footer);
        highlightCategory(numberPage);
        break;
      case 'thrash':
        nextObj = songsObj.thrash;
        nextMemeObj = memesObj.thrash;
        currentSongObj.currentObj  = songsObj.thrash;
        nextMain = createGame(nextObj, nextMemeObj);
        main.replaceWith(nextMain);
        highlightCategory(numberPage);
        break;
      case 'groove':
        nextObj = songsObj.groove;
        currentSongObj.currentObj = songsObj.groove;
        nextMemeObj = memesObj.groove;
        nextMain = createGame(nextObj, nextMemeObj);
        main.replaceWith(nextMain);
        highlightCategory(numberPage);
        break;
      case 'stoner':
        nextObj = songsObj.stoner;
        currentSongObj.currentObj = songsObj.stoner;
        nextMemeObj = memesObj.stoner;
        nextMain = createGame(nextObj, nextMemeObj);
        main.replaceWith(nextMain);
        highlightCategory(numberPage);
        break;
      case 'nu':
        nextObj = songsObj.nu;
        currentSongObj.currentObj  = songsObj.nu;
        nextMemeObj = memesObj.nu;
        nextMain = createGame(nextObj, nextMemeObj);
        main.replaceWith(nextMain);
        highlightCategory(numberPage);
        break;
      case 'progressive':
        nextObj = songsObj.progressive;
        currentSongObj.currentObj  = songsObj.progressive;
        nextMemeObj = memesObj.progressive;
        nextMain = createGame(nextObj, nextMemeObj);
        main.replaceWith(nextMain);
        highlightCategory(numberPage);
        break;
      case 'death':
        nextObj = songsObj.death;
        currentSongObj.currentObj = songsObj.death;
        nextMemeObj = memesObj.death;
        nextMain = createGame(nextObj, nextMemeObj);
        main.replaceWith(nextMain);
        highlightCategory(numberPage);
        break;
    }
  });
};

let count = 0;

export const renderNextPage = (nextButton) => {
  const pages = ['start', 'thrash', 'groove', 'stoner', 'nu', 'progressive', 'death'];
  nextButton.addEventListener('click', () => {
    highlightCategory(count);
    count++;
    const { hash } = window.location;
    console.log(hash);
    nextButton.href = `#${pages[count]}`;
  });
};

const enableNextButton = () => {
  const nextButton = document.querySelector('.next-button');
  nextButton.classList.remove('disable-link');
  nextButton.classList.add('play-animation');
  nextButton.textContent = 'A New Level!';
};

const turnOffList = (winId) => {
  const list = document.querySelectorAll('.birds-li');
  list.forEach((el) => {
    const listDataId = el.getAttribute('data-id');
    listDataId !== winId ? el.classList.add('birds-li__disable') : null;
  });
};

const reduceScore = () => {
  scoreObj.score -= 1;
  scoreObj.fails += 1;
};
const saveScore = () => {
  scoreObj.currentScore += scoreObj.score;
  const headerScore = document.querySelector('.score');
  headerScore.textContent = scoreObj.currentScore;
  scoreObj.score = 5;
};

const playAudioWhenFail = () => {
  const weweAudio = document.querySelector('.header-audio');
  weweAudio.src = './copies/sound/wewewewe_cut.mp3';
  weweAudio.currentTime = 0;
  weweAudio.play();
};

const playAudioWhenWin = () => {
  const weweAudio = document.querySelector('.header-audio');
  weweAudio.src = './copies/sound/kashing.mp3';
  weweAudio.currentTime = 0.5;
  weweAudio.play();
};

const showName = () => {
  const nameH3 = document.querySelector('#hidden-name');
  nameH3.textContent = currentSongObj.currentSong.name;
};

const replaceMainMediaContainer = () => {
/*   const newMediaContainer = createPlayer(currentSongsObj, 'up', true);
  mediaContainer.replaceWith(newMediaContainer); */
  const covers = document.querySelectorAll('.cover-img');
  const winCover = document.querySelector('.win-cover');
  covers.forEach((cover, ind) => {
    cover.addEventListener('animationend', (e) => {
      winCover.classList.add('win-cover__show');
      e.target.classList.remove(`anim${ind+1}`);
      e.target.classList.add('hide-cover');
      showName();
    })
    cover.classList.add(`anim${ind+1}`, 'hide-cover');
  })
};

const newDownMediaContainer = (id) => {
  const downMedia = document.querySelector('.chose-container__right');
  // const newMediaContainer = createPlayer(currentSongsObj, 'down', true); // bool was removed
  const newMediaContainer = createPickedSong(id);
  const description = addDescription(id);
  // addLatinName(newMediaContainer);
  downMedia.replaceChildren();
  downMedia.append(newMediaContainer, description);
};

export const checkAnswer = (e) => {
  const { target } = e;
  const liEl = target.closest('.birds-li');
  const audio = document.querySelector('.audio');
  const audioId = audio.getAttribute('data-id');

  if (liEl) {
    const dataId = liEl.getAttribute('data-id');
    if (dataId === audioId) {
      liEl.classList.add('birds-li__win');
      liEl.firstChild.classList.add('span-cyrcle__win');
      turnOffList(dataId);
      saveScore();
      enableNextButton();
      playAudioWhenWin();
      replaceMainMediaContainer();
      showName();
      // newDownMediaContainer();
    } else {
      liEl.classList.add('birds-li__fail');
      liEl.firstChild.classList.add('span-cyrcle__fail');
      reduceScore();
      playAudioWhenFail();
    }
    newDownMediaContainer(dataId - 1);
  }
};


export const changeUrlOnLoad = () => {
  window.addEventListener('load', () => {
    // const hash = window.location.hash.slice(1);
    window.location.hash = '#main';
  })
}