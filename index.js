// * utils
import Dropdown from './src/components/Dropdown';
import sort from './src/utils/sort';
import { capitalize, getRandomArray } from './src/utils/utils';

(() => {
  'use strict';
  const barsContainer = document.querySelector('.bars-container');
  const sortButton = document.querySelector('.sort-button');
  const algorithmDropdown = new Dropdown({
    parent: '.algorithm-dropdown',
    items: ['bubble sort', 'selection sort', 'quick sort', 'bogo sort'],
    className: 'w-36',
    transformFn: value =>
      value
        .split(' ')
        .map((str, idx) => (idx !== 0 ? capitalize(str) : str))
        .join(''),
  });
  let bars;

  const createBars = () => {
    const barsCount = 10;
    const gapsCount = barsCount - 1;
    const randomArray = getRandomArray({ length: barsCount, min: 7, max: 93 });
    const parentPadding =
      parseInt(getComputedStyle(barsContainer).getPropertyValue('padding-inline')) * 2;
    const barWidth = (window.innerWidth - parentPadding - gapsCount * 2.5) / barsCount;

    randomArray.forEach((rand, idx) => {
      const bar = document.createElement('div');

      bar.style.transform = `translateX(${(barWidth + 2.5) * idx}px)`;
      bar.style.width = barWidth + 'px';
      bar.style.height = rand + '%';
      bar.dataset.value = rand;
      bar.dataset.transform = (barWidth + 2.5) * idx;
      bar.className = 'bar col-start-1 row-start-1 transition-transform duration-500';
      bar.style.backgroundColor = 'red';

      barsContainer.appendChild(bar);
    });

    bars = Array.from(document.querySelectorAll('.bar'));
  };

  createBars();

  sortButton.addEventListener('click', () => sort(algorithmDropdown.value, bars));
})();
