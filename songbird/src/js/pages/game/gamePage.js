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

const createPlayer = () => {
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

  const playButton = document.createElement('button');
  playButton.classList.add('play-button');

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

export const createGame = () => {
  const main = document.createElement('main');
  main.classList.add('main');
  const navContainer = document.createElement('div');
  navContainer.classList.add('birds-container');
  navContainer.append(createListBirds());

  const audioPlayer = createPlayer();

  main.append(navContainer, audioPlayer);
  document.body.append(main);
}
