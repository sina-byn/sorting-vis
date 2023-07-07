// * utils
import { isSorted, shuffleBars } from '../utils';

const bogoSort = async (bars, length) => {
  while (!isSorted(bars, length)) {
    await shuffleBars(bars, length);
  }
};

export default bogoSort;
