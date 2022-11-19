import { getBirds, songsObj, getSongs, getMemes } from './store/store';
import { backToMainPage, hashChangeEvent, changeUrlOnLoad } from './controller/control';

export const run = () => {
  getBirds();
  getMemes();
  getSongs();
  console.log(songsObj);
  backToMainPage();
  changeUrlOnLoad();
  hashChangeEvent();
};
