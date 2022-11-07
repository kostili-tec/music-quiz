import { birdsObj, getBirds } from './store/store';
import { createHeader } from './components/header';
import { createGame } from './pages/game/gamePage';
import { hashChangeEvent } from './controller/control';

export const run = () => {
  getBirds();
  console.log(birdsObj);
  createHeader();
  createGame(birdsObj.start);
  hashChangeEvent();
};
