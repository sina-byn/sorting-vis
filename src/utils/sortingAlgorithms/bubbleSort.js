// * utils
import { sleep, swapBars } from '../utils';

const bubbleSort = async (bars, length) => {
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      const firstValue = Number(bars[j].dataset.value);
      const secondValue = Number(bars[j + 1].dataset.value);

      bars[j].style.backgroundColor = 'purple';
      bars[j + 1].style.backgroundColor = 'blue';
      await sleep(300);

      if (firstValue > secondValue) {
        swapBars(bars, j, j + 1);
        await sleep(550);
      } else {
        bars[j].style.backgroundColor = 'green';
        bars[j + 1].style.backgroundColor = 'green';
        await sleep(300);
      }

      bars[j].style.backgroundColor = 'red';
      bars[j + 1].style.backgroundColor = 'red';
    }
  }
};

export default bubbleSort;
