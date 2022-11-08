import birdsData from './birds';

export const birdsObj = {};

export const getBirds = () => {
  birdsObj.start = [...birdsData[0]];
  birdsObj.sparrow = [...birdsData[1]];
  birdsObj.woods = [...birdsData[2]];
  birdsObj.songs = [...birdsData[3]];
  birdsObj.hunters = [...birdsData[4]];
  birdsObj.sea = [...birdsData[5]];
};

export const scoreObj = {
  currentScore: 0,
  score: 5,
  fails: 0
}
