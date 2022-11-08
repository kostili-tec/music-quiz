export const createHeader = () => {
  const header = document.createElement('header');
  header.classList.add('header');
  const weweAudio = new Audio();
  weweAudio.classList.add('header-audio');
  weweAudio.volume = 0.5;
  const linkHeader = document.createElement('a');
  linkHeader.classList.add('link-header');
  linkHeader.href = '#start';
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
