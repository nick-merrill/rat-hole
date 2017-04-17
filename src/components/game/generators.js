import _ from 'lodash';

const greatWordShortSetup = [
  {word: 'Yep!', weight: 30},
  {word: 'Good work.', weight: 30},
  {word: 'Awesome!', weight: 10},
  {word: 'Great job!', weight: 10},
  {word: 'You are incredible!', weight: 5},
  {word: 'Amazing!', weight: 5},
];
const greatWordShortPool = [];
greatWordShortSetup.forEach((obj) => {
  _.range(obj.weight).forEach(() => {
    greatWordShortPool.push(obj.word);
  });
});

/**
 * Returns some small encouragement.
 * DESIGN: Random niceties to keep people happy.
 */
export const getGreatWordShort = () => {
  return _.sample(greatWordShortPool);
};
