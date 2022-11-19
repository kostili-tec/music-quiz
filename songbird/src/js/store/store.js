import birdsData from './birds';
import songsData from './songs';
import memesData from './memes';

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
};

export const memesObj = {};

export const getMemes = () => {
  memesObj.classic = memesData[0];
  memesObj.thrash = memesData[1];
  memesObj.groove = memesData[2];
  memesObj.stoner = memesData[3];
  memesObj.nu = memesData[4];
  memesObj.progressive = memesData[5];
  memesObj.death = memesData[6];
};

export const currentMemesObj = {};

export const currentSongsObj = {};

export const currentSongObj = {
  currentObj: {},
  currentSong: {},
};

export const scoreObj = {
  currentScore: 0,
  score: 5,
  fails: 0,
};

export const resetScore = () => {
  scoreObj.currentScore = 0;
  scoreObj.fails = 0;
  scoreObj.score = 5;
};

export const currentObj = {};
export const currentBirdObj = {};

export const resultGif = {
  aboluteZero: {
    gif: 'https://media.tenor.com/JXPn1JiZ0nwAAAAC/vomit-blood.gif',
    message: 'Abosolute Zero',
  }, // 0
  zero: {
    gif: ' https://media.tenor.com/c_F6MRMHzHEAAAAC/metalocalypse-nathan.gif', // nothing
    message: 'Zero',
  }, // 1-5
  junior: {
    gif: 'https://media.tenor.com/k-kW_4WfapcAAAAC/batmetal-laughing.gif', // laughing
    message: 'Junior',
  }, // 6-10
  junioirPlus: {
    gif: 'https://media.tenor.com/LNr5q10WZ0YAAAAC/metalocalypse-dethklok.gif', // smile
    message: 'Junior+',
  }, // 11 - 15
  middle: {
    gif: 'https://media.tenor.com/vMF-XHazF6AAAAAC/batmetal-batman.gif', // thats right
    message: 'Middle',
  }, // 16 - 20
  middlePlus: {
    gif: 'https://media.tenor.com/ie953z1G1CwAAAAC/batmetal-metal.gif', // headbang bat
    message: 'Middle+',
  }, // 21 - 25
  senior: {
    gif: 'https://media.tenor.com/rbqjIcZLSAcAAAAC/dethklok-metalocalypse.gif', // dark and brutal
    message: 'Senior',
  }, // 26 - 29
  seniorPomidor: {
    gif: 'https://media.tenor.com/jCE4G3sDubAAAAAC/hair-flip-rock-band.gif',
    message: 'Senior Pomidor',
  }, // 30+
};
