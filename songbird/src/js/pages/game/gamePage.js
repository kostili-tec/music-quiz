import {
  saveCurrentRandomObj,
  getRandomMeme,
  createNewAudio,
  createPickedAudio,
  fillProgress,
  playButtonEvent,
  renderNextPage,
  checkAnswer,
  handleInputChange,
  handleInputVolumeChange,
} from '../../controller/control';
import { currentSongObj } from '../../store/store';

const createLi = (text) => {
  const li = document.createElement('li');
  li.classList.add('nav__li');
  const spanLi = document.createElement('span');
  const bg = document.createElement('div');
  bg.classList.add('li-bg');
  spanLi.textContent = text;
  li.append(spanLi, bg);
  return li;
};

const createListBirds = () => {
  const namesArr = ['Classic', 'Thrash', 'Groove', 'Stoner/Doom', 'Nu', 'Prog/Djent', 'Death'];
  const navContainer = document.createElement('div');
  navContainer.classList.add('birds-container');
  const ul = document.createElement('ul');
  ul.classList.add('nav-birds__ul');

  namesArr.forEach((el) => ul.append(createLi(el)));
  return ul;
};

const createTriangularCover = (fullObj) => {
  const coverCont = document.createElement('div');
  coverCont.classList.add('cover-container');
  fullObj.forEach((el) => {
    const img = document.createElement('img');
    img.classList.add('cover-img');
    img.src = el.image;
    img.setAttribute('data-id', el.id);
    coverCont.append(img);
  });
  return coverCont;
};

export const createCover = (currentObj) => {
  const coverCont = document.createElement('div');
  coverCont.classList.add('cover-container__full');
  const img = document.createElement('img');
  img.classList.add('cover-img__full');
  img.src = currentObj.image;
  coverCont.append(img);
  return coverCont;
};

export const createPlayer = (currentObj, fullObj, additionClass) => {
  const playerContainer = document.createElement('div');
  playerContainer.classList.add('player-container', `player-container__${additionClass}`);

  const cover = createTriangularCover(fullObj);

  const winCover = document.createElement('img');
  winCover.classList.add('win-cover');
  winCover.src = currentObj.image;

  cover.append(winCover);

  const rightContainer = document.createElement('div');
  rightContainer.classList.add('right-container');

  const nameSong = document.createElement('h3');
  nameSong.textContent = '*******';
  nameSong.classList.add('name-song__h3');
  nameSong.id = 'hidden-name';

  const audioPlayer = document.createElement('div');
  audioPlayer.classList.add('audio-container');

  const audio = createNewAudio(currentObj);
  playerContainer.append(audio);
  audio.addEventListener('timeupdate', fillProgress.bind(null, playerContainer));

  const playButton = document.createElement('button');
  playButton.classList.add('play-button');
  playButtonEvent(playButton, audio);

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('icon-svg', 'audio-svg');
  svg.id = 'audio-stop';
  svg.innerHTML = '<use xlink:href="./copies/sprite.svg#play-button"></use>';

  playButton.append(svg);

  const progressContainer = document.createElement('div');
  progressContainer.classList.add('progress-container');

  const inputProgress = document.createElement('input');
  inputProgress.type = 'range';
  inputProgress.value = 0;
  inputProgress.min = 0;
  inputProgress.max = 100;
  inputProgress.classList.add('input-progress', 'input-progress__audio');
  inputProgress.id = 'range-progress';

  inputProgress.addEventListener('input', handleInputChange.bind(null, playerContainer));

  const volumeContainer = document.createElement('div');
  volumeContainer.classList.add('volume-container');

  const volumeSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  volumeSvg.classList.add('icon-svg', 'audio-svg');
  volumeSvg.id = 'audio-volume';
  volumeSvg.innerHTML = '<use xlink:href="./copies/sprite.svg#volume"></use>';

  const inputVolume = document.createElement('input');
  inputVolume.type = 'range';
  inputVolume.value = 50;
  inputVolume.min = 0;
  inputVolume.max = 100;

  inputVolume.classList.add('input-progress');
  inputVolume.id = 'volume-progress';
  inputVolume.addEventListener('input', handleInputVolumeChange.bind(null, audio));

  volumeContainer.append(volumeSvg, inputVolume);

  const timeCointaer = document.createElement('div');
  timeCointaer.classList.add('time-container');

  const spanContainer = document.createElement('span-container');
  spanContainer.classList.add('span-container');

  const spanStart = document.createElement('span');
  const spanEnd = document.createElement('span');

  spanStart.classList.add('audio-current');
  spanStart.textContent = '00:00';
  spanEnd.classList.add('audio-end');
  spanEnd.textContent = '00:00';

  spanContainer.append(spanStart, spanEnd);

  timeCointaer.append(spanStart, spanEnd);

  progressContainer.append(volumeContainer, inputProgress, timeCointaer);

  audioPlayer.append(playButton, progressContainer);
  rightContainer.append(nameSong, audioPlayer);

  playerContainer.append(cover, rightContainer);
  return playerContainer;
};

export const createPickedSong = (id) => {
  const obj = currentSongObj.currentObj[id];
  const currentId = id--;
  const playerContainer = document.createElement('div');
  playerContainer.classList.add('player-container', 'player-container__down');
  const cover = createCover(obj);

  const rightContainer = document.createElement('div');
  rightContainer.classList.add('right-container');

  const nameSong = document.createElement('h3');
  nameSong.textContent = obj.name;
  nameSong.classList.add('name-song__h3', 'name-song__h3-second');

  const audioPlayer = document.createElement('div');
  audioPlayer.classList.add('audio-container');

  const audio = createPickedAudio(obj);
  playerContainer.append(audio);
  audio.addEventListener('timeupdate', fillProgress.bind(null, playerContainer));

  const playButton = document.createElement('button');
  playButton.classList.add('play-button');
  playButtonEvent(playButton, audio);

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('icon-svg', 'audio-svg');
  svg.id = 'audio-stop';
  svg.innerHTML = '<use xlink:href="./copies/sprite.svg#play-button"></use>';

  playButton.append(svg);

  const progressContainer = document.createElement('div');
  progressContainer.classList.add('progress-container');

  const inputProgress = document.createElement('input');
  inputProgress.type = 'range';
  inputProgress.value = 0;
  inputProgress.min = 0;
  inputProgress.max = 100;
  inputProgress.classList.add('input-progress', 'input-progress__audio');
  inputProgress.id = 'range-progress';

  inputProgress.addEventListener('input', handleInputChange.bind(null, playerContainer));

  const volumeContainer = document.createElement('div');
  volumeContainer.classList.add('volume-container');

  const volumeSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  volumeSvg.classList.add('icon-svg', 'audio-svg');
  volumeSvg.id = 'audio-volume';
  volumeSvg.innerHTML = '<use xlink:href="./copies/sprite.svg#volume"></use>';

  const inputVolume = document.createElement('input');
  inputVolume.type = 'range';
  inputVolume.value = 50;
  inputVolume.min = 0;
  inputVolume.max = 100;

  inputVolume.classList.add('input-progress');
  inputVolume.id = 'volume-progress';
  inputVolume.addEventListener('input', handleInputVolumeChange.bind(null, audio));

  volumeContainer.append(volumeSvg, inputVolume);

  const timeCointaer = document.createElement('div');
  timeCointaer.classList.add('time-container');

  const spanContainer = document.createElement('span-container');
  spanContainer.classList.add('span-container');

  const spanStart = document.createElement('span');
  const spanEnd = document.createElement('span');

  spanStart.classList.add('audio-current');
  spanStart.textContent = '00:00';
  spanEnd.classList.add('audio-end');
  spanEnd.textContent = '00:00';

  spanContainer.append(spanStart, spanEnd);

  timeCointaer.append(spanStart, spanEnd);

  progressContainer.append(volumeContainer, inputProgress, timeCointaer);

  audioPlayer.append(playButton, progressContainer);
  rightContainer.append(nameSong, audioPlayer);

  playerContainer.append(cover, rightContainer);
  return playerContainer;
};

const createLeftContainer = (storeObj) => {
  const leftContainer = document.createElement('div');
  leftContainer.classList.add('chose-container__left');

  const birdsUl = document.createElement('ul');
  birdsUl.classList.add('birds-ul');
  storeObj.forEach((el) => {
    const liBird = document.createElement('li');
    liBird.classList.add('birds-li');
    liBird.setAttribute('data-id', el.id);
    liBird.setAttribute('ischecked', 'false');
    const cyrcleSpan = document.createElement('span');
    cyrcleSpan.classList.add('span-cyrcle');
    const textSpan = document.createElement('span');
    textSpan.classList.add('birds-li__span');
    textSpan.textContent = el.name;
    liBird.append(cyrcleSpan, textSpan);
    birdsUl.append(liBird);
  });
  leftContainer.append(birdsUl);
  birdsUl.addEventListener('click', checkAnswer);
  return leftContainer;
};

const createRightContainer = (memeSrc) => {
  const rightContainer = document.createElement('div');
  rightContainer.classList.add('chose-container__right');
  const imgCont = document.createElement('div');
  imgCont.classList.add('meme-container');
  const memeImg = document.createElement('img');
  memeImg.classList.add('meme-img');
  memeImg.src = memeSrc;
  imgCont.append(memeImg);
  rightContainer.append(imgCont);
  return rightContainer;
};

export const addDescription = (id) => {
  const description = document.createElement('p');
  description.textContent = currentSongObj.currentObj[id].descriptionEn;
  description.classList.add('description-song');
  return description;
};

const createChoseContainer = (storeObj, memeSrc) => {
  const choseContainer = document.createElement('div');
  choseContainer.classList.add('chose-container');
  choseContainer.append(createLeftContainer(storeObj), createRightContainer(memeSrc));
  return choseContainer;
};

const createNextButton = () => {
  const nextButton = document.createElement('a');
  nextButton.href = '#start';
  renderNextPage(nextButton);
  nextButton.classList.add('next-button', 'disable-link');
  nextButton.textContent = 'Pick the song';
  return nextButton;
};

export const createGame = (storeObj, memeObj, mainId = 'start') => {
  saveCurrentRandomObj(storeObj);
  const randomMemeSrc = getRandomMeme(memeObj);
  const main = document.createElement('main');
  main.classList.add('main-game');
  main.id = mainId;
  const navContainer = document.createElement('div');
  navContainer.classList.add('birds-container');
  navContainer.append(createListBirds());

  const mediaContainer = createPlayer(currentSongObj.currentSong, storeObj, 'up');
  const choseCont = createChoseContainer(storeObj, randomMemeSrc);
  const nextButton = createNextButton();
  main.append(navContainer, mediaContainer, choseCont, nextButton);
  document.body.append(main);
  return main;
};
