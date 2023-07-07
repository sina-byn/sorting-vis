// * algorithms
import bubbleSort from './sortingAlgorithms/bubbleSort';
import selectionSort from './sortingAlgorithms/selectionSort';
import quickSort from './sortingAlgorithms/quickSort';
import mergeSort from './sortingAlgorithms/mergeSort';
import bogoSort from './sortingAlgorithms/bogoSort';

const algorithms = {
  bubbleSort,
  selectionSort,
  quickSort,
  mergeSort,
  bogoSort,
};

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
