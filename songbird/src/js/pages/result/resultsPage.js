import { resultGif } from '../../store/store';

const defineLevel = (score) => {
  if (score === 0) {
    return resultGif.aboluteZero;
  } if (score > 0 && score <= 5) {
    return resultGif.zero;
  } if (score >= 6 && score <= 10) {
    return resultGif.junior;
  } if (score >= 11 && score <= 15) {
    return resultGif.junioirPlus;
  } if (score >= 16 && score <= 20) {
    return resultGif.middle;
  } if (score >= 21 && score <= 25) {
    return resultGif.middlePlus;
  } if (score >= 26 && score <= 30) {
    return resultGif.senior;
  }
  return resultGif.seniorPomidor;
};

export const createResultsPage = (result) => {
  const winnerObj = defineLevel(Number(result));
  const main = document.createElement('main');
  main.classList.add('results-main');

  const resultsBg = document.createElement('div');
  resultsBg.classList.add('results-bg');

  const messageContainer = document.createElement('div');
  messageContainer.classList.add('message-container');

  const levelMessage = document.createElement('p');
  levelMessage.classList.add('p-results');
  levelMessage.textContent = `Your Level: ${winnerObj.message}`;

  const img = document.createElement('img');
  img.src = winnerObj.gif;
  img.classList.add('img-results');
  const p = document.createElement('p');
  p.classList.add('p-results');
  p.textContent = `Your score: ${result}`;

  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('button-container');
  const buttonRestart = document.createElement('a');
  const buttonMenu = document.createElement('a');

  buttonRestart.textContent = 'Restart';
  buttonRestart.href = '#start';
  buttonRestart.classList.add('button', 'button-result');

  buttonMenu.textContent = 'Menu';
  buttonMenu.href = '#main';
  buttonMenu.classList.add('button', 'button-result');

  buttonContainer.append(buttonRestart, buttonMenu);
  messageContainer.append(levelMessage, img, p, buttonContainer);
  main.append(resultsBg, messageContainer);
  return main;
};
