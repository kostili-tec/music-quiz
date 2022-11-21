import { songsObj } from '../store/store';
import {
  handleInputChange, handleInputVolumeChange, fillProgress,
} from '../controller/control';
import { createCover } from './game/gamePage';
import {
  playButtonArchiveEvent, selectEvent, audioEvent, nextButtonEvent, prevButtonEvent,
} from '../controller/controllArchive';

const createArchiveAudio = () => {
  const audio = new Audio();
  audio.classList.add('audio');
  audio.volume = 0.5;
  return audio;
};

const createSelect = (array) => {
  const selectEl = document.createElement('select');
  selectEl.classList.add('archive-select');
  selectEl.size = 10;
  array.forEach((el, id) => {
    const optionEl = document.createElement('option');
    optionEl.value = id;
    optionEl.textContent = el.name;
    selectEl.append(optionEl);
  });
  selectEl.value = 0;
  return selectEl;
};

export const createArchivePage = () => {
  const main = document.createElement('main');
  main.classList.add('archive-main');
  const containerEl = document.createElement('div');
  containerEl.classList.add('archive-container');
  const arrSongs = [
    songsObj.classic,
    songsObj.thrash,
    songsObj.groove,
    songsObj.nu,
    songsObj.stoner,
    songsObj.progressive,
    songsObj.death,
  ];
  const fullArrSongs = [];

  arrSongs.forEach((el) => {
    el.forEach((item) => fullArrSongs.push(item));
  });

  const allControl = document.createElement('div');
  allControl.classList.add('all-controll');

  const audioPlayer = document.createElement('div');
  audioPlayer.classList.add('archive-player');

  const audioEl = createArchiveAudio();
  audioEl.src = fullArrSongs[0].audio;

  const cover = createCover(fullArrSongs[0]);
  cover.classList.add('cover-container__archive');

  const controlContainer = document.createElement('div');
  controlContainer.classList.add('control-container');

  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('buttons-container');

  const prevButton = document.createElement('button');
  prevButton.classList.add('prev-button', 'player-button');
  prevButtonEvent(prevButton, fullArrSongs);

  const nextButton = document.createElement('button');
  nextButton.classList.add('next-button1', 'player-button');
  nextButtonEvent(nextButton, fullArrSongs);

  const playButton = document.createElement('button');
  playButton.classList.add('play-button');
  playButtonArchiveEvent(playButton, audioEl);
  audioEl.addEventListener('timeupdate', fillProgress.bind(null, audioPlayer));

  const nextSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  nextSvg.classList.add('icon-svg', 'audio-svg');
  nextSvg.innerHTML = '<use xlink:href="./copies/sprite.svg#next-button"></use>';
  const prevSvg = nextSvg.cloneNode(true);
  nextButton.append(nextSvg);

  prevSvg.classList.add('reverse-next');
  prevButton.append(prevSvg);

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
  inputProgress.classList.add('input-progress', 'input-progress__audio');
  inputProgress.id = 'range-progress';

  inputProgress.addEventListener('input', handleInputChange.bind(null, audioPlayer));

  const volumeContainer = document.createElement('div');
  volumeContainer.classList.add('volume-container');

  const volumeSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  volumeSvg.classList.add('icon-svg', 'audio-svg');
  volumeSvg.id = 'audio-volume';
  volumeSvg.innerHTML = '<use xlink:href="./copies/sprite.svg#volume"></use>';

  const inputVolume = document.createElement('input');
  inputVolume.type = 'range';
  inputVolume.value = 50;
  inputVolume.min = 0;
  inputVolume.max = 100;

  inputVolume.classList.add('input-progress');
  inputVolume.id = 'volume-progress';
  inputVolume.addEventListener('input', handleInputVolumeChange.bind(null, audioEl));

  volumeContainer.append(volumeSvg, inputVolume);

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

  progressContainer.append(volumeContainer, inputProgress, timeCointaer);

  buttonsContainer.append(prevButton, playButton, nextButton);
  controlContainer.append(cover, buttonsContainer, progressContainer);

  const selectEl = createSelect(fullArrSongs);
  selectEvent(selectEl, audioEl, fullArrSongs);

  audioEvent(audioEl);

  // allControl.append(audioEl, controlContainer, selectEl);

  const pDescription = document.createElement('p');
  pDescription.classList.add('description', 'archive-description');
  pDescription.textContent = fullArrSongs[0].descriptionEn;

  // audioPlayer.append(allControl, pDescription);
  audioPlayer.append(audioEl, controlContainer, selectEl);
  main.append(audioPlayer, pDescription);
  return main;
};
