// * utils
import { sleep, swapBars } from '../utils';

const bubbleSort = async (bars, length, delay) => {
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      const firstValue = Number(bars[j].dataset.value);
      const secondValue = Number(bars[j + 1].dataset.value);

      bars[j].style.backgroundColor = '#5b21b6';
      bars[j + 1].style.backgroundColor = '#60a5fa';
      await sleep(delay - 200);

      if (firstValue > secondValue) {
        swapBars(bars, j, j + 1);
        await sleep(delay);
      } else {
        bars[j].style.backgroundColor = '#4ade80';
        bars[j + 1].style.backgroundColor = '#4ade80';
        await sleep(delay - 200);
      }

      bars[j].style.backgroundColor = '#ef4444';
      bars[j + 1].style.backgroundColor = '#ef4444';
    }
  }
};

export default bubbleSort;
