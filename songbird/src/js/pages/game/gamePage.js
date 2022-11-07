
import { birdsObj } from "../../store/store";
import { createNewAudio, playButtonEvent } from "../../controller/control";

const createLi = (text) => {
  const li = document.createElement('li');
  const spanLi = document.createElement('span');
  spanLi.textContent = text;
  li.append(spanLi);
  return li;
}

const createListBirds = () => {
  const namesArr = ['Разминка', 'Воробьиные', 'Лесные птицы', 'Певчие птицы', 'Хищные птицы', 'Морские птицы'];
  const navContainer = document.createElement('div');
  navContainer.classList.add('birds-container');
  const ul = document.createElement('ul');
  ul.classList.add('nav-birds__ul');

  namesArr.forEach((el) => ul.append(createLi(el)));
  return ul;
}

const createPlayer = (birdsObj) => {
  const playerContainer = document.createElement('div');
  playerContainer.classList.add('player-container');

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

  const audio = createNewAudio(birdsObj);
  playerContainer.append(audio);

  const playButton = document.createElement('button');
  playButton.classList.add('play-button');
  playButtonEvent(playButton, audio);

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('icon-svg');
  svg.innerHTML = `<use xlink:href="./copies/sprite.svg#pause-button"></use>`;

  playButton.append(svg);

  const progressContainer = document.createElement('div');
  progressContainer.classList.add('progress-container');

  const progresBar = document.createElement('div');
  progresBar.classList.add('progres-bar');
  const progress = document.createElement('div');
  progress.classList.add('progress');
  progresBar.append(progress);

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

  progressContainer.append(progresBar, timeCointaer);

  audioPlayer.append(playButton, progressContainer);
  rightContainer.append(nameBird, audioPlayer);

  playerContainer.append(birdImg, rightContainer);

  return playerContainer;
}

const createLeftContainer = (birdsObj) => {
  const leftContainer = document.createElement('div');
  leftContainer.classList.add('chose-container__left');

  const birdsUl = document.createElement('birds-ul');
  birdsUl.classList.add('birds-ul');
  birdsObj.forEach((el) => {
    const liBird = document.createElement('li');
    liBird.classList.add('birds-li');
    const textSpan = document.createElement('span');
    textSpan.classList.add('birds-li__span');
    textSpan.textContent = el.name;
    liBird.append(textSpan);
    birdsUl.append(liBird);
  })
  leftContainer.append(birdsUl);
  return leftContainer;
}

const createRightContainer = () => {
  const rightContainer = document.createElement('div');
  rightContainer.classList.add('chose-container__right');
  const pInfo1 = document.createElement('p');
  const pInfo2 = document.createElement('p');
  pInfo1.textContent = 'Послушайте плеер.';
  pInfo2.textContent = 'Выберите птицу из списка';
  rightContainer.append(pInfo1, pInfo2);
  return rightContainer;  
}

const createChoseContainer = (birdsObj) => {
  const choseContainer = document.createElement('div');
  choseContainer.classList.add('chose-container');
  choseContainer.append(createLeftContainer(birdsObj), createRightContainer());
  return choseContainer;
}

const createNextButton = () => {
  const nextButton = document.createElement('button');
  nextButton.classList.add('next-button');
  nextButton.textContent = 'Next Level';
  return nextButton;
}

export const createGame = (birdsObj, mainId = 'start') => {
  const main = document.createElement('main');
  main.classList.add('main');
  const navContainer = document.createElement('div');
  navContainer.classList.add('birds-container');
  navContainer.append(createListBirds());

  const audioPlayer = createPlayer(birdsObj);
  const choseCont = createChoseContainer(birdsObj);
  const nextButton = createNextButton();

  main.append(navContainer, audioPlayer, choseCont, nextButton);
  document.body.append(main);
}
