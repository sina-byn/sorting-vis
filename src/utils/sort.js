// * algorithms
import * as algorithms from './algorithms';

const sort = (algorithm, bars) => {
  const { length } = bars;
  algorithms[algorithm](bars, length);
};

export default sort;
