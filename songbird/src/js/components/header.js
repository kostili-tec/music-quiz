export const createHeader = () => {
  const header = document.createElement('header');
  header.classList.add('header');
  const h1 = document.createElement('h1');
  h1.textContent = 'SongBird';
  const scoreH5 = document.createElement('h5');
  scoreH5.textContent = 'Score: ';
  const scoreSpan = document.createElement('span');
  scoreSpan.classList.add('score');
  scoreSpan.textContent = '0';
  scoreH5.append(scoreSpan);
  header.append(h1);
  header.append(scoreH5);
  document.body.append(header);
};
