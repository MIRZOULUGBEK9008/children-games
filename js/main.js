// LOADER
const elLoader = document.querySelector(".js-loader");
const elsTableData = document.querySelectorAll(".js-table-data");
let checkClicked = false, result;

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    elLoader.classList.add('loader-wrapper--none');
  }, 1000);
});

// OVERLAY UP
const gameStart = () => {
  overlay.classList.add("overlay--hidden");
  let randomNumberOne = Math.round(Math.random() * 10),
    randomNumberTwo = Math.round(Math.random() * 10);
  const resultStr = `${randomNumberOne} * ${randomNumberTwo}`;
  result = Function("return " + resultStr)();
  randomZone.textContent = resultStr;
  randomNumberOne = Math.round(Math.random() * 10);
  randomNumberTwo = Math.round(Math.random() * 10);


  const randomIndex = Math.round(Math.random() * 16);
  const randomNumbersArr = [];
  while (!(randomNumbersArr.length == 16)) {
    const randomAns = Math.round(Math.random() * 100);
    if (!(randomNumbersArr.includes(randomAns))) {
      randomNumbersArr.push(randomAns);
    }
  }
  elsTableData.forEach((data, index) => {
    if (index < 4 || (index > 7 && index < 12)) {
      if (index % 2) {
        data.parentElement.style.backgroundColor = "#30a2ff";
        data.parentElement.style.color = "#f7ec09";
      } else {
        data.parentElement.style.backgroundColor = "#f7ec09";
        data.parentElement.style.color = "#30a2ff";
      }
    } else {
      if (!(index % 2)) {
        data.parentElement.style.backgroundColor = "#30a2ff";
        data.parentElement.style.color = "#f7ec09";
      } else {
        data.parentElement.style.backgroundColor = "#f7ec09";
        data.parentElement.style.color = "#30a2ff";
      }
    }
    if (randomIndex == index) {
      data.textContent = result;
    } else {
      data.textContent = randomNumbersArr[index];
    }
  });
  checkClicked = true;
};
startGame.addEventListener("click", () => {
  gameStart();
  let time = 8;
  setInterval(() => {
    time--;
    console.log(time.toString().padStart(2, "0"));
    if (!time) {
      time = 8;
      gameStart();
    }
  }, 1000);
});
elsTableData.forEach(element => {
  element.addEventListener("click", () => {
    if (element.textContent != result) {
      audioFail.play();
      time = 8;
      gameStart();
    } else {
      audioSucces.play();
      time = 8;
      gameStart();
    }
  });
});
