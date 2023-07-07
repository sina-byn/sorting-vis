// * utils
import { sleep, swapMainAndSubBars } from '../utils';

const merge = async (bars, start, mid, end, delay) => {
  let left = bars.slice(start, mid + 1);
  let right = bars.slice(mid + 1, end + 1);

  let i = 0;
  let j = 0;
  let k = start;

  while (i < left.length && j < right.length) {
    left[i].style.backgroundColor = 'blue';
    right[j].style.backgroundColor = 'blue';

    if (Number(left[i].dataset.value) <= Number(right[j].dataset.value)) {
      const swappedBars = swapMainAndSubBars(bars, k, left, i);
      await sleep(delay);
      swappedBars.forEach(bar => (bar.style.backgroundColor = 'green'));
      await sleep(delay - 200);
      swappedBars.forEach(bar => (bar.style.backgroundColor = 'red'));

      i++;
    } else {
      const swappedBars = swapMainAndSubBars(bars, k, right, j);
      await sleep(delay);
      swappedBars.forEach(bar => (bar.style.backgroundColor = 'green'));
      await sleep(delay - 200);
      swappedBars.forEach(bar => (bar.style.backgroundColor = 'red'));

      j++;
    }
    k++;
  }

  while (i < left.length) {
    left[i].style.backgroundColor = 'blue';
    bars[k].style.backgroundColor = 'blue';
    const swappedBars = swapMainAndSubBars(bars, k, left, i);
    await sleep(delay);
    swappedBars.forEach(bar => (bar.style.backgroundColor = 'green'));
    await sleep(delay - 200);
    swappedBars.forEach(bar => (bar.style.backgroundColor = 'red'));

    i++;
    k++;
  }

  while (j < right.length) {
    right[j].style.backgroundColor = 'blue';
    bars[k].style.backgroundColor = 'blue';
    const swappedBars = swapMainAndSubBars(bars, k, right, j);
    await sleep(delay);
    swappedBars.forEach(bar => (bar.style.backgroundColor = 'green'));
    await sleep(delay - 200);
    swappedBars.forEach(bar => (bar.style.backgroundColor = 'red'));

    j++;
    k++;
  }
};

const mergeSort = async (bars, length, delay) => {
  for (let currSize = 1; currSize < length; currSize *= 2) {
    for (let start = 0; start < length - 1; start += 2 * currSize) {
      const mid = start + currSize - 1;
      const end = Math.min(start + 2 * currSize - 1, length - 1);

      await merge(bars, start, mid, end, delay);
    }
  }
};

export default mergeSort;
