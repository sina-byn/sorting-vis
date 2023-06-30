// * algorithms
import * as algorithms from './algorithms';

const sort = (algorithm, bars) => {
  const sortFn = algorithms[algorithm];
  const { length } = bars;

  switch (algorithm) {
    case 'quickSort':
      return sortFn(bars, 0, length - 1);
    default:
      sortFn(bars, length);
  }
};

export default sort;
