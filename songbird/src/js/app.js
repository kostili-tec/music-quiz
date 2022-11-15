import { birdsObj, getBirds, songsObj, getSongs } from './store/store';
import { backToMainPage, hashChangeEvent, changeUrlOnLoad } from './controller/control';

export const run = () => {
  getBirds();
  // console.log(birdsObj);
  getSongs();
  console.log(songsObj);
  backToMainPage();
  // createStartHeader();
  // createWelcome();
  // addFooter();
  // createHeader();
  // createGame(birdsObj.start);
  changeUrlOnLoad();
  hashChangeEvent();
};
