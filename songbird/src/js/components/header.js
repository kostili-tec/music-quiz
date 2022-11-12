export const createHeader = () => {
  const header = document.createElement('header');
  header.classList.add('header');
  const weweAudio = new Audio();
  weweAudio.classList.add('header-audio');
  weweAudio.volume = 0.5;
  const linkHeader = document.createElement('a');
  linkHeader.classList.add('link-header');
  linkHeader.href = '#main';
  const h1 = document.createElement('h1');
  h1.textContent = 'SongBird';
  const scoreH5 = document.createElement('h5');
  scoreH5.textContent = 'Score: ';
  const scoreSpan = document.createElement('span');
  scoreSpan.classList.add('score');
  scoreSpan.textContent = '0';
  scoreH5.append(scoreSpan);
  linkHeader.append(h1);
  header.append(weweAudio, linkHeader, scoreH5);  
  document.body.append(header);
};

export const createStartHeader = () => {
  const header = document.createElement('header');
  header.classList.add('start-header');
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

  // return header;
  document.body.append(header);
}