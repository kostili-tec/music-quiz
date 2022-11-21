const createDisclaimer = () => {
  const disclaimerCont = document.createElement('div');
  disclaimerCont.classList.add('disclaimer-container');

  const disclaimerP = document.createElement('p');
  const disclaimerP2 = document.createElement('p');
  const disclaimerP3 = document.createElement('p');
  const disclaimerP4 = document.createElement('p');

  disclaimerP.textContent = `All the divisions into genres are made in accordance with the author's opinion.`;
  disclaimerP2.textContent = `Criticism of the choice of songs is unacceptable!`;  
  disclaimerP3.textContent = `All songs have been converted to 192 kbit/s to reduce the size.`;
  disclaimerP4.textContent = `Click me to hide!`;
  disclaimerCont.append(disclaimerP, disclaimerP2, disclaimerP3, disclaimerP4);
  disclaimerCont.addEventListener('click', () => disclaimerCont.remove());
  return disclaimerCont;
}

export const createWelcome = () => {
  const main = document.createElement('main');
  main.classList.add('start-main');

  const navContainer = document.createElement('nav');
  navContainer.classList.add('nav-start');

  const startButton = document.createElement('a');
  startButton.classList.add('button', 'start-button');
  startButton.href = '#start';
  startButton.textContent = 'Start';

  const archive = document.createElement('a');
  archive.classList.add('button', 'archive-button');
  archive.href = '#archive';
  archive.textContent = 'Archive';

  const disclaimer = document.createElement('a');
  disclaimer.classList.add('button', 'disclaimer-button');
  disclaimer.textContent = 'Disclaimer';
  disclaimer.addEventListener('click', () => {
    main.append(createDisclaimer());
  })

  const bg = document.createElement('div');
  bg.classList.add('start-bg');

  navContainer.append(startButton, archive, disclaimer);

  main.append(bg, navContainer);

  document.body.append(main);
  return main;
};
