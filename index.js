// * components
import Dropdown from './src/components/Dropdown';

// * utils
import sort from './src/utils/sort';
import { capitalize, debounce, getRandomArray, sleep } from './src/utils/utils';

(() => {
  'use strict';
  const barsContainer = document.querySelector('.bars-container');
  const sortButton = document.querySelector('.sort-button');
  const regenerateButton = document.querySelector('.regenerate-button');
  const countInput = document.querySelector('.count-input');
  const algorithmDropdown = new Dropdown({
    parent: '.algorithm-dropdown',
    items: ['bubble sort', 'selection sort', 'quick sort', 'merge sort', 'bogo sort'],
    className: 'w-36',
    transformFn: value =>
      value
        .split(' ')
        .map((str, idx) => (idx !== 0 ? capitalize(str) : str))
        .join(''),
  });

  let windowSize;
  let isSorting = false;
  let barsCount = countInput.value;
  let delay;
  let bars;

  const setDelay = () => {
    delay = 550 / (barsCount - 3);
  };
  const getBarWidth = () => {
    const gapsCount = barsCount - 1;
    const containerStyles = getComputedStyle(barsContainer);
    const containerPadding = parseInt(containerStyles.getPropertyValue('padding-inline')) * 2;
    const barWidth = (document.body.clientWidth - containerPadding - gapsCount * 2.5) / barsCount;
    return Math.max(barWidth, 1.5);
  };
  const resizeBars = () => {
    if (isSorting) return;

    bars.forEach((bar, idx) => {
      const barWidth = getBarWidth(barsCount);
      bar.style.width = barWidth + 'px';
      bar.style.transform = `translateX(${(barWidth + 2.5) * idx}px)`;
      bar.dataset.transform = (barWidth + 2.5) * idx;
    });
  };
  const debouncedResizeBars = debounce(resizeBars);
  const createBars = () => {
    if (isSorting) return;

    const randomArray = getRandomArray({ length: barsCount, min: 7, max: 93 });
    const barWidth = getBarWidth(barsCount);
    setDelay();

    barsContainer.innerHTML = '';
    randomArray.forEach((rand, idx) => {
      const bar = document.createElement('div');

      bar.style.transform = `translateX(${(barWidth + 2.5) * idx}px)`;
      bar.style.width = barWidth + 'px';
      bar.style.height = rand + '%';

      bar.dataset.value = rand;
      bar.dataset.transform = (barWidth + 2.5) * idx;

      bar.className = 'bar col-start-1 row-start-1 transition-transform';
      bar.style.transitionDuration = `${delay - 50}ms`;
      bar.style.backgroundColor = 'red';

      barsContainer.appendChild(bar);
    });

    bars = Array.from(document.querySelectorAll('.bar'));
  };

  createBars();

  countInput.addEventListener('change', e => {
    barsCount = Number(e.target.value);

    setDelay();
    createBars();

    bars.forEach(bar => (bar.style.transitionDuration = `${Math.max(1, delay - 50)}ms`));
  });

  regenerateButton.addEventListener('click', createBars);
  sortButton.addEventListener('click', () => sort(algorithmDropdown.value, bars, delay));

  window.addEventListener('resize', debouncedResizeBars);
  window.addEventListener('sortstart', () => {
    isSorting = true;
    windowSize = window.innerWidth;

    countInput.setAttribute('disabled', '');
    sortButton.setAttribute('disabled', '');
    regenerateButton.setAttribute('disabled', '');
    algorithmDropdown.disabled = true;
  });
  window.addEventListener('sortend', async () => {
    isSorting = false;

    for (let i = 0; i < bars.length; i++) {
      bars[i].style.backgroundColor = 'pink';
      await sleep(1000 / barsCount);
    }

    await sleep(500);
    bars.forEach(bar => (bar.style.backgroundColor = 'red'));
    countInput.removeAttribute('disabled');
    sortButton.removeAttribute('disabled');
    regenerateButton.removeAttribute('disabled');
    algorithmDropdown.disabled = false;

    if (windowSize !== window.innerWidth) {
      windowSize = window.innerWidth;
      resizeBars();
    }
  });
})();
