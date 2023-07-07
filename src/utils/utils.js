const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const getRandomArray = ({ length, min, max }) => {
  const randomArray = [];

  for (let i = 0; i < length; i++) {
    randomArray.push(getRandomInt(min, max));
  }

  return randomArray;
};

const sleep = delay =>
  new Promise(resolve => {
    setTimeout(() => resolve(), delay);
  });

const capitalize = str => str.slice(0, 1).toUpperCase() + str.slice(1);

const swapBars = (bars, i, j) => {
  const temp = bars[i].dataset.transform;

  bars[i].dataset.transform = bars[j].dataset.transform;
  bars[i].style.transform = `translateX(${bars[j].dataset.transform}px)`;

  bars[j].dataset.transform = temp;
  bars[j].style.transform = `translateX(${temp}px)`;

  [bars[i], bars[j]] = [bars[j], bars[i]];
};

const swapMainAndSubBars = (main, i, sub, j) => {
  const temp = main[i].dataset.transform;

  main[i].dataset.transform = sub[j].dataset.transform;
  main[i].style.transform = `translateX(${sub[j].dataset.transform}px)`;

  sub[j].dataset.transform = temp;
  sub[j].style.transform = `translateX(${temp}px)`;

  const subItemIdx = main.indexOf(sub[j]);
  [main[i], main[subItemIdx]] = [main[subItemIdx], main[i]];

  return [main[i], main[subItemIdx]];
};

const shuffleBars = async (bars, length) => {
  for (let i = 0; i < length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    bars[i].style.backgroundColor = 'blue';
    bars[j].style.backgroundColor = 'blue';
    swapBars(bars, i, j);
    await sleep(550);
    bars[i].style.backgroundColor = 'red';
    bars[j].style.backgroundColor = 'red';
  }
};

const isSorted = (bars, length) => {
  for (let i = 1; i < length; i++) {
    const firstValue = Number(bars[i].dataset.value);
    const secondValue = Number(bars[i - 1].dataset.value);

    if (secondValue > firstValue) return false;
  }

  return true;
};

const debounce = (func, delay = 500) => {
  let timerId;

  return (...args) => {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

export {
  getRandomInt,
  getRandomArray,
  sleep,
  capitalize,
  swapBars,
  swapMainAndSubBars,
  shuffleBars,
  isSorted,
  debounce,
};
