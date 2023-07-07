// * utils
import { sleep, swapBars } from '../utils';

const lomutoPartition = async (bars, low, high) => {
  const pivotBar = bars[high];
  const pivot = Number(pivotBar.dataset.value);
  pivotBar.style.backgroundColor = '#5b21b6';

  let i = low;

  for (let j = low; j < high; j++) {
    const secondBar = bars[j];
    const secondValue = Number(secondBar.dataset.value);

    secondBar.style.backgroundColor = '#60a5fa';

    if (secondValue <= pivot) {
      bars[i].style.backgroundColor = '#60a5fa';
      swapBars(bars, i, j);
      await sleep(delay);
      bars[j].style.backgroundColor = '#ef4444';
      bars[i].style.backgroundColor = '#ef4444';
      i++;
    } else {
      secondBar.style.backgroundColor = '#ef4444';
    }
  }

  bars[high].style.backgroundColor = '#5b21b6';
  bars[i].style.backgroundColor = '#60a5fa';
  swapBars(bars, i, high);
  await sleep(delay);
  bars[high].style.backgroundColor = '#ef4444';
  bars[i].style.backgroundColor = '#ef4444';

  return i;
};

const quickSort = async (bars, low, high, delay) => {
  if (low < high) {
    const pivotIdx = await lomutoPartition(bars, low, high, delay);

    await quickSort(bars, low, pivotIdx - 1, delay);
    await quickSort(bars, pivotIdx + 1, high, delay);
  }
};

export default quickSort;
