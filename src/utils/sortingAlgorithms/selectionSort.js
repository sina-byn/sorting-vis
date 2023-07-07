// * utils
import { sleep, swapBars } from '../utils';

const selectionSort = async (bars, length) => {
  let minIdx;

  for (let i = 0; i < length - 1; i++) {
    minIdx = i;

    for (let j = i + 1; j < length; j++) {
      const firstValue = Number(bars[minIdx].dataset.value);
      const secondValue = Number(bars[j].dataset.value);

      bars[minIdx].style.backgroundColor = 'purple';
      bars[j].style.backgroundColor = 'blue';

      await sleep(250);

      if (firstValue > secondValue) {
        bars[minIdx].style.backgroundColor = 'red';
        bars[j].style.backgroundColor = 'purple';
        minIdx = j;
        await sleep(250);
      } else {
        bars[j].style.backgroundColor = 'green';
        await sleep(250);
        bars[j].style.backgroundColor = 'red';
      }
    }

    if (minIdx !== i) {
      swapBars(bars, i, minIdx);
      await sleep(550);
    }

    bars[i].style.backgroundColor = 'red';
    bars[minIdx].style.backgroundColor = 'red';
  }
};

export default selectionSort;
