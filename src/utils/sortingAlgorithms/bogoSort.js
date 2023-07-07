// * utils
import { isSorted, shuffleBars } from '../utils';

const bogoSort = async (bars, length, delay) => {
  while (!isSorted(bars, length)) {
    await shuffleBars(bars, length, delay);
  }
};

export default bogoSort;
