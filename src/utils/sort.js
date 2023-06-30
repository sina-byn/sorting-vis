// * algorithms
import * as algorithms from './algorithms';

// * custom events
const sortStartEvent = new CustomEvent('sortstart');
const sortEndEvent = new CustomEvent('sortend');

const sort = async (algorithm, bars) => {
  const sortFn = algorithms[algorithm];
  const { length } = bars;

  dispatchEvent(sortStartEvent);

  switch (algorithm) {
    case 'quickSort':
      await sortFn(bars, 0, length - 1);
      break;
    default:
      await sortFn(bars, length);
  }

  dispatchEvent(sortEndEvent);
};

export default sort;
