// * utils
import { sleep, swapMainAndSubBars } from '../utils';

const merge = async (bars, start, mid, end, delay) => {
  let left = bars.slice(start, mid + 1);
  let right = bars.slice(mid + 1, end + 1);

  let i = 0;
  let j = 0;
  let k = start;

  while (i < left.length && j < right.length) {
    left[i].style.backgroundColor = '#60a5fa';
    right[j].style.backgroundColor = '#60a5fa';

    if (Number(left[i].dataset.value) <= Number(right[j].dataset.value)) {
      const swappedBars = swapMainAndSubBars(bars, k, left, i);
      await sleep(delay);
      swappedBars.forEach(bar => (bar.style.backgroundColor = '#4ade80'));
      await sleep(delay - 200);
      swappedBars.forEach(bar => (bar.style.backgroundColor = '#ef4444'));

      i++;
    } else {
      const swappedBars = swapMainAndSubBars(bars, k, right, j);
      await sleep(delay);
      swappedBars.forEach(bar => (bar.style.backgroundColor = '#4ade80'));
      await sleep(delay - 200);
      swappedBars.forEach(bar => (bar.style.backgroundColor = '#ef4444'));

      j++;
    }
    k++;
  }

  while (i < left.length) {
    left[i].style.backgroundColor = '#60a5fa';
    bars[k].style.backgroundColor = '#60a5fa';
    const swappedBars = swapMainAndSubBars(bars, k, left, i);
    await sleep(delay);
    swappedBars.forEach(bar => (bar.style.backgroundColor = '#4ade80'));
    await sleep(delay - 200);
    swappedBars.forEach(bar => (bar.style.backgroundColor = '#ef4444'));

    i++;
    k++;
  }

  while (j < right.length) {
    right[j].style.backgroundColor = '#60a5fa';
    bars[k].style.backgroundColor = '#60a5fa';
    const swappedBars = swapMainAndSubBars(bars, k, right, j);
    await sleep(delay);
    swappedBars.forEach(bar => (bar.style.backgroundColor = '#4ade80'));
    await sleep(delay - 200);
    swappedBars.forEach(bar => (bar.style.backgroundColor = '#ef4444'));

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
