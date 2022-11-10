import {
  saveCurrentRandomObj, 
  createNewAudio, 
  fillProgress,
  playButtonEvent,
  renderNextPage,
  checkAnswer,
  handleInputChange,
} from '../../controller/control';
import { currentBirdObj } from '../../store/store';

const createLi = (text) => {
  const li = document.createElement('li');
  const spanLi = document.createElement('span');
  spanLi.textContent = text;
  li.append(spanLi);
  return li;
};

const createListBirds = () => {
  const namesArr = ['Разминка', 'Воробьиные', 'Лесные птицы', 'Певчие птицы', 'Хищные птицы', 'Морские птицы'];
  const navContainer = document.createElement('div');
  navContainer.classList.add('birds-container');
  const ul = document.createElement('ul');
  ul.classList.add('nav-birds__ul');

  namesArr.forEach((el) => ul.append(createLi(el)));
  return ul;
};

export const createPlayer = (storeObj, additionClass, isShow = false) => {
  const playerContainer = document.createElement('div');
  playerContainer.classList.add('player-container', `player-container__${additionClass}`);

  const birdImg = document.createElement('img');
  birdImg.classList.add('birds-img');
  birdImg.src = './copies/bird.jpg';

  const rightContainer = document.createElement('div');
  rightContainer.classList.add('right-container');

  const nameBird = document.createElement('h3');
  nameBird.textContent = '*******';
  nameBird.classList.add('name-bird__h3');

  const audioPlayer = document.createElement('div');
  audioPlayer.classList.add('audio-container');

  const audio = createNewAudio(storeObj);
  playerContainer.append(audio);
  audio.addEventListener('timeupdate', fillProgress.bind(null, playerContainer));

  const playButton = document.createElement('button');
  playButton.classList.add('play-button');
  playButtonEvent(playButton, audio, playerContainer);

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('icon-svg', 'audio-svg');
  svg.id = 'audio-stop';
  svg.innerHTML = '<use xlink:href="./copies/sprite.svg#stop-button"></use>';

  playButton.append(svg);

  const progressContainer = document.createElement('div');
  progressContainer.classList.add('progress-container');

  const inputProgress = document.createElement('input');
  inputProgress.type = 'range';
  inputProgress.value = 0;
  inputProgress.min = 0;
  inputProgress.max = 100;
  inputProgress.classList.add('input-progress');
  inputProgress.id = 'range-progress';

  inputProgress.addEventListener('input', handleInputChange.bind(null, playerContainer));

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

  progressContainer.append(inputProgress, timeCointaer);

  audioPlayer.append(playButton, progressContainer);
  rightContainer.append(nameBird, audioPlayer);

  playerContainer.append(birdImg, rightContainer);

  if (isShow === true) {
    birdImg.src = storeObj.image;
    nameBird.textContent = storeObj.name;
  }

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
    const textSpan = document.createElement('span');
    textSpan.classList.add('birds-li__span');
    textSpan.textContent = el.name;
    liBird.append(textSpan);
    birdsUl.append(liBird);
  });
  leftContainer.append(birdsUl);
  birdsUl.addEventListener('click', checkAnswer);
  return leftContainer;
};

const createRightContainer = () => {
  const rightContainer = document.createElement('div');
  rightContainer.classList.add('chose-container__right');
  const pInfo1 = document.createElement('p');
  const pInfo2 = document.createElement('p');
  pInfo1.textContent = 'Послушайте плеер.';
  pInfo2.textContent = 'Выберите птицу из списка';
  rightContainer.append(pInfo1, pInfo2);
  return rightContainer;
};

export const addLatinName = (parendNode) => {
  const nameBirdh3 = parendNode.querySelector('.name-bird__h3');
  const latinText = document.createElement('h4');
  latinText.textContent = currentBirdObj.species;
  latinText.classList.add('name-bird__h3', 'font__H4');
  nameBirdh3.after(latinText);
};

export const addDescription = () => {
  const description = document.createElement('p');
  description.textContent = currentBirdObj.description;
  description.classList.add('description-birds');
  return description;
}

const createChoseContainer = (storeObj) => {
  const choseContainer = document.createElement('div');
  choseContainer.classList.add('chose-container');
  choseContainer.append(createLeftContainer(storeObj), createRightContainer());
  return choseContainer;
};

const createNextButton = () => {
  const nextButton = document.createElement('a');
  nextButton.href = '#start';
  renderNextPage(nextButton);
  nextButton.classList.add('next-button', 'disable-link');
  nextButton.textContent = 'Next Level';
  return nextButton;
};

export const createGame = (storeObj, mainId = 'start') => {
  saveCurrentRandomObj(storeObj);
  const main = document.createElement('main');
  main.classList.add('main');
  main.id = mainId;
  const navContainer = document.createElement('div');
  navContainer.classList.add('birds-container');
  navContainer.append(createListBirds());

  const mediaContainer = createPlayer(currentBirdObj, 'up', false);
  const choseCont = createChoseContainer(storeObj);
  const nextButton = createNextButton();

  main.append(navContainer, mediaContainer, choseCont, nextButton);
  document.body.append(main);
};
