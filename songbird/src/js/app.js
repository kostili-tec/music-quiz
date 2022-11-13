import { birdsObj, getBirds, songsObj, getSongs } from './store/store';
import { createWelcome } from './pages/start/startPage';
import { createHeader, createStartHeader } from './components/header';
import { createGame } from './pages/game/gamePage';
import { addFooter } from './components/footer';
import { hashChangeEvent, changeUrlOnLoad } from './controller/control';

export const run = () => {
  getBirds();
  // console.log(birdsObj);
  getSongs();
  console.log(songsObj);
  createStartHeader();
  createWelcome();
  addFooter();
  // createHeader();
  // createGame(birdsObj.start);
  changeUrlOnLoad();
  hashChangeEvent();
};
