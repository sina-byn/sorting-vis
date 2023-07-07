// * utils
import { sleep, swapBars } from '../utils';

const selectionSort = async (bars, length, delay) => {
  let minIdx;

  for (let i = 0; i < length - 1; i++) {
    minIdx = i;

    for (let j = i + 1; j < length; j++) {
      const firstValue = Number(bars[minIdx].dataset.value);
      const secondValue = Number(bars[j].dataset.value);

      bars[minIdx].style.backgroundColor = '#5b21b6';
      bars[j].style.backgroundColor = '#60a5fa';

      await sleep(delay - 200);

      if (firstValue > secondValue) {
        bars[minIdx].style.backgroundColor = '#ef4444';
        bars[j].style.backgroundColor = '#5b21b6';
        minIdx = j;
        await sleep(delay - 200);
      } else {
        bars[j].style.backgroundColor = '#4ade80';
        await sleep(delay - 200);
        bars[j].style.backgroundColor = '#ef4444';
      }
    }

    if (minIdx !== i) {
      swapBars(bars, i, minIdx);
      await sleep(delay);
    }

    bars[i].style.backgroundColor = '#ef4444';
    bars[minIdx].style.backgroundColor = '#ef4444';
  }
};

export default selectionSort;
