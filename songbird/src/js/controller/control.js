import { birdsObj, scoreObj, currentBirdObj, songsObj, currentSongsObj } from '../store/store';
import { createGame, createPlayer, addLatinName, addDescription } from '../pages/game/gamePage';
import { createHeader, createStartHeader } from '../components/header';
import { createWelcome } from '../pages/start/startPage';

export const saveCurrentRandomObj = (storeObj) => {
  const randomIndex = Math.floor(Math.random() * (storeObj.length - 1));
  Object.assign(currentSongsObj, storeObj[randomIndex]);
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

export const fillProgress = (parentObj, e) => {
  const audio = e.target;
  const currentTime = parentObj.querySelector('.audio-current');
  const lengthTime = parentObj.querySelector('.audio-end');
  const progress = parentObj.querySelector('.input-progress');

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
  audio.setAttribute('data-id', currentSongsObj.id);
  audio.src = currentSongsObj.audio;
  audio.volume = 0.5;
  return audio;
};

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

const backToMainPage = () => {
  document.body.replaceChildren();
  createStartHeader();
  createWelcome();
}

export const hashChangeEvent = () => {
  window.addEventListener('hashchange', () => {
    let nextObj = null;
    const main = document.querySelector('.main');
    const hash = window.location.hash.slice(1);
    console.log(window.location.hash);
    switch (hash) {
      case 'main': 
        nextObj = songsObj.classic;
        backToMainPage();
        break;
      case 'start':
        nextObj = songsObj.classic;
        // main.remove();
        document.body.replaceChildren();
        createHeader();
        createGame(nextObj);
        break;
      case 'thrash':
        nextObj = songsObj.thrash;
        main.remove();
        createGame(nextObj);
        break;
      case 'groove':
        nextObj = songsObj.groove;
        main.remove();
        createGame(nextObj);
        break;
      case 'stoner':
        nextObj = songsObj.stoner;
        main.remove();
        createGame(nextObj);
        break;
      case 'nu':
        nextObj = songsObj.nu;
        main.remove();
        createGame(nextObj);
        break;
      case 'progressive':
        nextObj = songsObj.progressive;
        main.remove();
        createGame(nextObj);
        break;
      case 'death':
        nextObj = songsObj.death;
        main.remove();
        createGame(nextObj);
        break;
  /*     default:
        nextObj = birdsObj.start;
        main.remove();
        createGame(nextObj);
        break; */
    }

  });
};

let count = 0;

export const renderNextPage = (nextButton) => {
  const pages = ['start', 'thrash', 'groove', 'stoner', 'nu', 'progressive', 'death'];
  nextButton.addEventListener('click', () => {
    count++;
    const { hash } = window.location;
    console.log(hash);
    nextButton.href = `#${pages[count]}`;
  });
};

const enableNextButton = () => {
  const nextButton = document.querySelector('.next-button');
  nextButton.classList.remove('disable-link');
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

const replaceMainMediaContainer = () => {
  const mediaContainer = document.querySelector('.player-container');
  const newMediaContainer = createPlayer(currentSongsObj, 'up', true);
  mediaContainer.replaceWith(newMediaContainer);
};

const newDownMediaContainer = () => {
  const downMedia = document.querySelector('.chose-container__right');
  const newMediaContainer = createPlayer(currentSongsObj, 'down', true);
  const description = addDescription();
  addLatinName(newMediaContainer);
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
      // newDownMediaContainer();
    } else {
      liEl.classList.add('birds-li__fail');
      liEl.firstChild.classList.add('span-cyrcle__fail');
      reduceScore();
      playAudioWhenFail();
    }
  }
};


export const changeUrlOnLoad = () => {
  window.addEventListener('load', () => {
    // const hash = window.location.hash.slice(1);
    window.location.hash = '#main';
  })
}