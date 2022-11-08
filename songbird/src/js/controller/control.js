import { birdsObj } from '../store/store';
import { createGame } from '../pages/game/gamePage';

const getRandomBird = (storeObj) => {
  const randomIndex = Math.floor(Math.random() * (storeObj.length - 1));
  return storeObj[randomIndex];
};

export const handleInputChange = (e) => {
  let target = e.target;
  const audio = document.querySelector('.audio');
  if (e.target.type !== 'range') {
    target = document.querySelector('#range-progress');
  } 
  const min = target.min;
  const max = target.max;
  const val = target.value;

  audio.currentTime = audio.duration * (val / 100);  
  target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
}

const fillProgress = (e) => {
  const audio = e.target;
  const currentTime = document.querySelector('.audio-current');
  const lengthTime = document.querySelector('.audio-end');
  const progress = document.querySelector('.input-progress');
  
  progress.value = audio.currentTime / audio.duration * 100;
  const min = progress.min;
  const max = progress.max;
  const val = progress.value;
  progress.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
  
  let minsCurrent = Math.floor(audio.currentTime / 60);
  let secsCurrent = Math.floor(audio.currentTime % 60);
  if (minsCurrent < 10) {
      minsCurrent = '0' + minsCurrent;
  }
  if (secsCurrent < 10) {
      secsCurrent = '0' + secsCurrent;
  }
  currentTime.textContent = `${minsCurrent}:${secsCurrent}`;

  
  let minsFull = parseInt(audio.duration / 60, 10);
  let secsFull = parseInt(audio.duration % 60);
  if (minsFull < 10) {
      minsFull = '0' + minsFull;
  }
  if (secsFull < 10) {
      secsFull = '0' + secsFull;
  }
  lengthTime.textContent = `${minsFull}:${secsFull}`;
}

export const updateProgress = (e) => {
  const audio = document.querySelector('.audio');
  console.log((e.offsetX / e.target.clientWidth) * audio.duration);
  audio.currentTime = (e.offsetX / e.target.clientWidth) * audio.duration;
}

export const createNewAudio = (birdsObj) => {
  const audio = new Audio();
  const randomBird = getRandomBird(birdsObj);
  audio.classList.add('audio');
  audio.setAttribute('data-id', randomBird.id);
  audio.src = randomBird.audio;
  audio.volume = 0.5;
  audio.addEventListener('timeupdate', fillProgress);
  return audio;
};

export const playButtonEvent = (button, audioEl) => {
  let isPlayed = false;
  audioEl.addEventListener('ended', (e) => {
    const audioSvg = document.querySelector('.audio-svg ');
    audioSvg.innerHTML = '<use xlink:href="./copies/sprite.svg#stop-button"></use>';
    audioSvg.id = 'audio-stop';   // e.target.load();
    isPlayed = false;
  })
  button.addEventListener('click', () => {
    const audioSvg = document.querySelector('.audio-svg ');
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

export const hashChangeEvent = () => {
  window.addEventListener('hashchange', () => {
    let nextObj = null;
    const main = document.querySelector('.main');
    const hash = window.location.hash.slice(1);
    switch (hash) {
      case 'start':
        nextObj = birdsObj.start;
        break;
      case 'sparrow':
        nextObj = birdsObj.sparrow;
        break;
      case 'woods':
        nextObj = birdsObj.woods;
        break;
      case 'songs':
        nextObj = birdsObj.songs;
        break;
      case 'hunters':
        nextObj = birdsObj.hunters;
        break;
      case 'sea':
        nextObj = birdsObj.sea;
        break;
      default:
        nextObj = birdsObj.start;
        break;
    }
    main.remove();
    createGame(nextObj);
  });
};

let count = 0;

export const renderNextPage = (nextButton) => {
  const pages = ['start', 'sparrow', 'woods', 'song', 'hunters', 'sea'];
  nextButton.addEventListener('click', () => {
    count++;
    const { hash } = window.location;
    console.log(hash);
    nextButton.href = `#${pages[count]}`;
  });
};
