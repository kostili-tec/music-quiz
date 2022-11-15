const createHeader = (classHeader) => {
  const header = document.createElement('header');
  header.classList.add(`${classHeader}-header`);
  const logoLink = document.createElement('a');
  logoLink.classList.add('logo-link');
  logoLink.href = '#main';
  const logoContainer = document.createElement('div');
  logoContainer.classList.add('logo-container');

  const metalVersion = document.createElement('h1');
  const songbird = document.createElement('h2');
  metalVersion.classList.add('logo-h1');
  metalVersion.textContent = 'METAL VERSION';
  songbird.classList.add('logo-h2');
  songbird.textContent = 'songbird';

  logoContainer.append(metalVersion, songbird);
  logoLink.append(logoContainer);
  header.append(logoLink);

  return header;
};

export const createStartHeader = () => {
  const header = createHeader('start');
  return header;
};

export const createGameHeader = () => {
  const header = createHeader('game');

  const weweAudio = new Audio();
  weweAudio.classList.add('header-audio');
  weweAudio.volume = 0.5;

  const scoreH5 = document.createElement('h5');
  scoreH5.textContent = 'Score: ';
  const scoreSpan = document.createElement('span');
  scoreSpan.classList.add('score');
  scoreSpan.textContent = '0';
  scoreH5.append(scoreSpan);

  header.append(scoreH5, weweAudio);

  return header;
};
