// * utils
import { sleep } from './utils';

const bubbleSort = async (bars, length) => {
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      const firstValue = Number(bars[j].dataset.value);
      const secondValue = Number(bars[j + 1].dataset.value);

      bars[j].style.backgroundColor = 'purple';
      bars[j + 1].style.backgroundColor = 'blue';
      await sleep(300);

      if (firstValue > secondValue) {
        const temp = bars[j + 1].dataset.transform;

        bars[j + 1].dataset.transform = bars[j].dataset.transform;
        bars[j + 1].style.transform = `translateX(${bars[j].dataset.transform}px)`;

        bars[j].dataset.transform = temp;
        bars[j].style.transform = `translateX(${temp}px)`;

        [bars[j], bars[j + 1]] = [bars[j + 1], bars[j]];
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
      const temp = bars[i].dataset.transform;

      bars[i].dataset.transform = bars[minIdx].dataset.transform;
      bars[i].style.transform = `translateX(${bars[minIdx].dataset.transform}px)`;

      bars[minIdx].dataset.transform = temp;
      bars[minIdx].style.transform = `translateX(${temp}px)`;

      await sleep(550);

      [bars[i], bars[minIdx]] = [bars[minIdx], bars[i]];
    }

    bars[i].style.backgroundColor = 'red';
    bars[minIdx].style.backgroundColor = 'red';
  }
};

export { bubbleSort, selectionSort };
