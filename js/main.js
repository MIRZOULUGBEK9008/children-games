// LOADER
const elLoader = document.querySelector('.js-loader');

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    elLoader.classList.add('loader-wrapper--none');
  }, 1000);
});

// OVERLAY UP
const overlayUp = () => {
  overlay.classList.add("overlay--hidden");
  audioStart.play();
  let randomNumberOne = Math.floor(Math.random() * 10) + 1,
    randomNumberTwo = Math.floor(Math.random() * 10) + 1;

  randomZone.textContent = `${randomNumberOne} * ${randomNumberTwo}`;
  setInterval(() => {
    randomNumberOne = Math.floor(Math.random() * 10) + 1;
    randomNumberTwo = Math.floor(Math.random() * 10) + 1;
    randomZone.textContent = `${randomNumberOne} * ${randomNumberTwo}`;
    // audioFail.play();
  }, 4000);
};
