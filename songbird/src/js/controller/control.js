import { birdsObj } from "../store/store";

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
}

export const playButtonEvent = (button, audioEl) => {
  let isPlayed = false;
  // const audio = document.querySelector('.audio');
  button.addEventListener('click', () => {
    if (!isPlayed) {
      isPlayed = true;
      audioEl.play();
    } else {
      isPlayed = false;
      audioEl.pause();
    }    
  })
}

const renderNextPage = () => {
  const pages = ['start', 'sparrow', 'woods', 'song', 'hunters', 'sea'];
}