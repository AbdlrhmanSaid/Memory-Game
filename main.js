let control = document.querySelector(".controls-btns");

//Get User Name And Remove Cotrols-brn
document.querySelector(".controls-btns button").onclick = function () {
  let nameTxt = document.querySelector(".controls-btns input");
  let infoName = document.querySelector(".info-containers .name span");

  if (nameTxt.value === "") {
    document.querySelector(".controls-btns").remove();
    infoName.innerHTML = "unKnown";
  } else {
    document.querySelector(".controls-btns").remove();
    infoName.innerHTML = nameTxt.value;
  }
};

let duration = 1000;

let blockContainer = document.querySelector(".blocks");

let blocks = Array.from(blockContainer.children);

let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);

let wrongAttempts = 1;

// add oreder css property on game block
blocks.forEach((block, index) => {
  // add css prop
  block.style.order = orderRange[index];

  // add click event
  block.addEventListener("click", function () {
    // trigger the flib block function
    flibBlock(block);
  });
});

// flip block function
function flibBlock(selectedBlock) {
  // add class flipped
  selectedBlock.classList.add("flipped");
  // collect all filpped cards
  let allFlippedBlocks = blocks.filter((flibedBlock) =>
    flibedBlock.classList.contains("flipped")
  );
  // if there two block select
  if (allFlippedBlocks.length === 2) {
    // stop clicking function
    stopclick();
    // check method block function
    checkBlock(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

// stop clicking function
function stopclick() {
  blockContainer.classList.add("no-click");
  setTimeout(() => {
    blockContainer.classList.remove("no-click");
  }, duration);
}
function checkBlock(firstEle, secEle) {
  let tries = document.querySelector(".tries span");

  if (firstEle.dataset.technology === secEle.dataset.technology) {
    firstEle.classList.remove("flipped");
    secEle.classList.remove("flipped");

    firstEle.classList.add("has-match");
    secEle.classList.add("has-match");
  } else {
    tries.innerHTML = wrongAttempts++;
    setTimeout(() => {
      firstEle.classList.remove("flipped");
      secEle.classList.remove("flipped");
    }, duration);
  }
  // create game over window
  if (wrongAttempts === 9) {
    document.querySelector(".game-over").style.display = "block";
    let againBtn = document.querySelector(".game-over button");
    againBtn.onclick = function () {
      location.reload();
    };
  }
}
//create shuffle function
function shuffle(array) {
  let current = array.length,
    temp,
    random;
  while (current > 0) {
    // get random number
    random = Math.floor(Math.random() * current);

    // decrease length by one
    current--;

    // save current element in stash
    temp = array[current];

    // current element = random element
    array[current] = array[random];

    // random element = get element from stash
    array[random] = temp;
  }
  return array;
}
