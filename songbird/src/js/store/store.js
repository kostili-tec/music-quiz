import birdsData from './birds';
import songsData from './songs';

export const birdsObj = {};

export const getBirds = () => {
  birdsObj.start = [...birdsData[0]];
  birdsObj.sparrow = [...birdsData[1]];
  birdsObj.woods = [...birdsData[2]];
  birdsObj.songs = [...birdsData[3]];
  birdsObj.hunters = [...birdsData[4]];
  birdsObj.sea = [...birdsData[5]];
};

export const songsObj = {};

export const getSongs = () => {
  songsObj.classic = [...songsData[0]];
  songsObj.thrash = [...songsData[1]];
  songsObj.groove = [...songsData[2]];
  songsObj.nu = [...songsData[3]];
  songsObj.stoner = [...songsData[4]];
  songsObj.progressive = [...songsData[5]];
  songsObj.death = [...songsData[6]];
}

export const currentSongsObj = {};

export const scoreObj = {
  currentScore: 0,
  score: 5,
  fails: 0
}

export let currentObj = {};
export let currentBirdObj= {};