// * utils
import { sleep, swapBars } from './utils';

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

const lomutoPartition = async (bars, low, high) => {
  const pivotBar = bars[high];
  const pivot = Number(pivotBar.dataset.value);
  pivotBar.style.backgroundColor = 'purple';

  let i = low;

  for (let j = low; j < high; j++) {
    const secondBar = bars[j];
    const secondValue = Number(secondBar.dataset.value);

    secondBar.style.backgroundColor = 'blue';

    if (secondValue <= pivot) {
      bars[i].style.backgroundColor = 'blue';
      swapBars(bars, i, j);
      await sleep(550);
      bars[j].style.backgroundColor = 'red';
      bars[i].style.backgroundColor = 'red';
      i++;
    } else {
      secondBar.style.backgroundColor = 'red';
    }
  }

  bars[high].style.backgroundColor = 'purple';
  bars[i].style.backgroundColor = 'blue';
  swapBars(bars, i, high);
  await sleep(550);
  bars[high].style.backgroundColor = 'red';
  bars[i].style.backgroundColor = 'red';

  return i;
};

const quickSort = async (bars, low, high) => {
  if (low < high) {
    const pivotIdx = await lomutoPartition(bars, low, high);

    await quickSort(bars, low, pivotIdx - 1);
    await quickSort(bars, pivotIdx + 1, high);
  }
};

export { bubbleSort, selectionSort, quickSort };
