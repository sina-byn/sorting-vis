// * utils
import { sleep, swapBars } from '../utils';

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

export default quickSort;
