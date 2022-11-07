import { birdsObj } from '../store/store';
import { createGame } from '../pages/game/gamePage';

const getRandomBird = (storeObj) => {
  const randomIndex = Math.floor(Math.random() * (storeObj.length - 1));
  return storeObj[randomIndex];
};

export const createNewAudio = (birdsObj) => {
  const audio = new Audio();
  const randomBird = getRandomBird(birdsObj);
  audio.classList.add('audio');
  audio.setAttribute('data-id', randomBird.id);
  audio.src = randomBird.audio;
  audio.volume = 0.5;
  return audio;
};

export const playButtonEvent = (button, audioEl) => {
  let isPlayed = false;
  button.addEventListener('click', () => {
    if (!isPlayed) {
      isPlayed = true;
      audioEl.play();
    } else {
      isPlayed = false;
      audioEl.pause();
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
