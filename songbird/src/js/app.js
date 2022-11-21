import { getSongs, getMemes } from './store/store';
import { backToMainPage, hashChangeEvent, changeUrlOnLoad } from './controller/control';

export const run = () => {
  getMemes();
  getSongs();
  backToMainPage();
  changeUrlOnLoad();
  hashChangeEvent();
};
