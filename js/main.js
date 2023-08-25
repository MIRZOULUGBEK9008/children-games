const elLoader = document.querySelector(".js-loader");

// Variables
const elsTableData = document.querySelectorAll(".js-table-data");
const ten = 10;
const sixTeen = 16;
const mathOper = ["/", "/", "/", "/"];
let result;

// Loader
window.addEventListener("load", () => {
  setTimeout(() => {
    elLoader.classList.add('loader-wrapper--none');
  }, 1000);
});

// Overlay up
const gameStart = () => {
  // Hidden overlay
  overlay.classList.add("overlay--hidden");

  // Timer
  timer.textContent = "8s";
  timer.classList.remove("section-game__timer--none");
  table.classList.remove("game-table__data--pen");
  // 1. Random numbers for table
  let randomNumberOne = Math.round(Math.random() * ten),
    randomNumberTwo = Math.round(Math.random() * ten);
  // 2. Display it
  const mathOperRandom = Math.round(Math.random() * (mathOper.length - 1));
  if (mathOper[mathOperRandom] == "/" &&
    randomNumberOne > randomNumberTwo &&
    (randomNumberOne % randomNumberTwo != 0) ||
    parseInt(randomNumberOne / randomNumberTwo) != randomNumberOne / randomNumberTwo
  ) {
    while (randomNumberOne % randomNumberTwo == 0 ||
      parseInt(randomNumberOne / randomNumberTwo) != randomNumberOne / randomNumberTwo
    ) {
      randomNumberOne = Math.round(Math.random() * ten);
      randomNumberTwo = Math.round(Math.random() * ten);
    }
  }
  const resultStr = `${randomNumberOne} / ${randomNumberTwo}`;
  result = Function("return " + resultStr)();
  randomZone.textContent = resultStr;


  // Random index for result
  const randomIndex = Math.round(Math.random() * sixTeen);

  // Fill table with random numbers
  const randomNumbersArr = [];
  while (!(randomNumbersArr.length == sixTeen)) {
    const randomAns = Math.round(Math.random() * 100);
    if (!(randomNumbersArr.includes(randomAns)) && randomAns != result) {
      randomNumbersArr.push(randomAns);
    }
  }
  elsTableData.forEach((data, index) => {
    if (randomIndex == index) {
      data.textContent = result;
    } else {
      if (result < 0) {
        data.textContent = -randomNumbersArr[index];
      } else {
        data.textContent = randomNumbersArr[index];
      }
    }
  });
};



// Start game
startGame.addEventListener("click", () => {
  gameStart();
  audioStart.play();
  setInterval(() => {
    timer.textContent = `${timer.textContent[0] - 1}s`;
    if (timer.textContent == "-1s") {
      gameStart();
    }
  }, 1000);
});


// Add click event for every element
elsTableData.forEach(element => {
  element.parentElement.addEventListener("click", () => {
    table.classList.add("game-table__data--pen");
    if (element.textContent != result) {
      audioWrong.play();
      element.textContent = "😔";
      setTimeout(() => {
        gameStart();
      }, 1000);
    } else {
      audioCorrect.play();
      element.textContent = "👌";
      setTimeout(() => {
        gameStart();
      }, 1000);
    }
    timer.classList.add("section-game__timer--none");
  });
});
