const elLoader = document.querySelector(".js-loader");

// Variables
const elsTableData = document.querySelectorAll(".js-table-data");
const ten = 10;
const sixTeen = 16;
const mathOper = ["+", "-", "*", "/", "%"];
let result;

// Loader
window.addEventListener("load", () => {
  setTimeout(() => {
    elLoader.classList.add('loader-wrapper--none');
  }, 1000);
});

// Overlay up
const gameStart = () => {
  // Timer
  timer.textContent = "8s";
  timer.classList.remove("section-game__timer--none");
  table.classList.remove("game-table__data--pen");
  // 1. Random numbers for table
  let randomNumberOne = Math.round(Math.random() * ten),
    randomNumberTwo = Math.round(Math.random() * ten);
  // 2. Display it
  const mathOperRandom = Math.round(Math.random() * (mathOper.length - 1));

  if (mathOper[mathOperRandom] === "%") {
    while (randomNumberTwo === 0) {
      randomNumberTwo = Math.round(Math.random() * ten);
    }
  }
  if (mathOper[mathOperRandom] === "/" &&
    (randomNumberOne < randomNumberTwo ||
      randomNumberOne % randomNumberTwo !== 0 ||
      randomNumberTwo === 0)
  ) {
    while (true) {
      randomNumberOne = Math.round(Math.random() * ten);
      randomNumberTwo = Math.round(Math.random() * ten);
      if (randomNumberOne % randomNumberTwo == 0) break;
    }
  }

  const resultStr = `${randomNumberOne} ${mathOper[mathOperRandom]} ${randomNumberTwo}`;
  result = Function("return " + resultStr)();
  if (mathOper[mathOperRandom] === "/") {
    randomZone.textContent = `${randomNumberOne} ÷ ${randomNumberTwo}`;
  } else if (mathOper[mathOperRandom] === "*") {
    randomZone.textContent = `${randomNumberOne} × ${randomNumberTwo}`;
  } else {
    randomZone.textContent = resultStr;
  }


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

startGame.addEventListener("click", () => {
  // Hidden overlay
  overlay.classList.add("overlay--hidden");

  audioStart.play();
});

// Start game
gameContinue.addEventListener("click", () => {
  // Hidden overlay goodluck
  overlayGoodluck.classList.add("overlay-goodluck--hidden");
  audioStart.play();
  gameStart();
  setInterval(() => {
    timer.textContent = `${timer.textContent[0] - 1}s`;
    if (timer.textContent === "-1s") {
      gameStart();
      correct.textContent = Number(correct.textContent) - 1;
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
      // Score
      wrong.textContent = Number(wrong.textContent) + 1;
      if (wrong.textContent > correct.textContent) {
        setTimeout(() => {
          gameOverOrWinTitle.textContent = "You lose 😜";
          gameOverOrWin.classList.add("overlay-win-lose--lose");
          audioGameOver.play();
        }, 800);
      }
      setTimeout(() => {
        gameStart();
      }, 1000);
    } else {
      audioCorrect.play();
      element.textContent = "👌";
      // Score
      correct.textContent = Number(correct.textContent) + 1;
      if (correct.textContent == 10) {
        setTimeout(() => {
          gameOverOrWinTitle.textContent = "You win 👏";
          gameOverOrWin.classList.add("overlay-win-lose--win");
          audioWin.play();
        }, 600);
      }
      setTimeout(() => {
        gameStart();
      }, 1000);
    }
    timer.classList.add("section-game__timer--none");
  });
});
gameOverOrWinController.addEventListener("click", () => {
  window.location.reload();
});