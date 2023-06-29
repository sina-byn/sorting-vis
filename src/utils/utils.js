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

export { getRandomInt, getRandomArray, sleep, capitalize };
