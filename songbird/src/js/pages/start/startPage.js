export const createWelcome = () => {
  const main = document.createElement('main');
  main.classList.add('main', 'start-main');

  const navContainer = document.createElement('nav');
  navContainer.classList.add('nav-start');

  const startButton = document.createElement('a');
  startButton.classList.add('button', 'start-button');
  startButton.href = '#start';
  startButton.textContent = 'Start';

  const results = document.createElement('a');
  results.classList.add('button', 'results-button');
  results.href = '#results';
  results.textContent = 'Results';

  const archive = document.createElement('a');
  archive.classList.add('button', 'archive-button');
  archive.href = '#archive';
  archive.textContent = 'Archive';

  const disclaimer = document.createElement('a');
  disclaimer.classList.add('button', 'disclaimer-button');
  disclaimer.textContent = 'Disclaimer';

  const bg = document.createElement('div');
  bg.classList.add('start-bg');

  
  navContainer.append(startButton, results, archive, disclaimer);

  main.append(bg, navContainer);

  document.body.append(main);
  return main;
  // document.body.id = 'start-body';
}