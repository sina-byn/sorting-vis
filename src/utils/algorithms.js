// * utils
import { sleep } from "./utils";

// * bubble sort
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

export { bubbleSort };
