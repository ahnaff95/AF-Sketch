"use strict";

//// Functions to Implement /////

/// Main ---
// 1: Change Grid Color                                ✅
// 2: Inputing No. of squares                          ✅

/// Bonus ---
// 1: Rainbow Mode (Random RGB Value for each hover)   ✅
// 2: Eraser Mode                                      ✅
// 3: Color Picker                                     ✅
// 4: Square Slider                                    ✅
// 5: Sketch only when holding down mouse              ✅
// 6. Change Canvas Color                              ✅
// 7. Crosshair Cursor                                 ✅
// 8. Styling and making it look good
// (like my own paint tool)

const changeGridBtn = document.getElementById("changeGridBtn");
const clearBtn = document.getElementById("clearBtn");
const gridContainer = document.querySelector(".grid__container");
const rainbowBtn = document.getElementById("rainbowBtn");
const normalBtn = document.getElementById("normalBtn");
const eraserBtn = document.getElementById("eraserBtn");
const colorPicker = document.getElementById("colorSketch");
const colorPickerBG = document.getElementById("colorBG");
const gridRange = document.getElementById("gridRange");
const rangeLabel = document.getElementById("rangeLabel");
// const squareContainer = document.getElementById("gridContainer");
console.log(Number(gridRange.value));

const create = function () {
  for (let i = 0; i < gridRange.value ** 2; i++) {
    const square = document.createElement("div");
    // square.innerText = "1";
    square.classList.add("grid--square");
    gridContainer.appendChild(square);
  }
};
create();

let squareGrid = document.getElementsByClassName("grid--square");
console.log(squareGrid);

let mousedown = false;
document.body.onmousedown = () => (mousedown = true);
document.body.onmouseup = () => (mousedown = false);

function changeGridSize(rangeInput) {
  // const size = prompt("Enter your grid size (between 1 & 100):");
  // if (size > 100 || size < 1) {
  //   alert("Wrong Input - Please choose a value between 1 & 100");
  // }

  const size = Number(rangeInput);

  while (squareGrid.length > 0) {
    squareGrid[0].parentNode.removeChild(squareGrid[0]);
  }

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    // square.innerText = "1";
    square.classList.add("grid--square");
    gridContainer.appendChild(square);

    gridContainer.style = `grid-template-columns: repeat(${size}, 1fr); grid-template-rows: repeat(${size}, 1fr);`;
  }
  squareGrid = document.getElementsByClassName("grid--square");
  console.log(squareGrid);
  // squareGrid.forEach((div) => clear(div));

  for (const div of squareGrid) {
    div.addEventListener("mouseover", () => sketch(div));
    clearBtn.addEventListener("click", () => clear(div));
  }
  const chosenColor = colorPickerBG.value;
  for (const div of squareGrid) {
    div.style = `background-color: ${chosenColor}`;
  }
}

// This changeGridSize function has probaby been the hardest challenge since starting to code.

gridRange.addEventListener("change", () => {
  changeGridSize(gridRange.value);
});

gridRange.addEventListener("input", () => {
  rangeLabel.textContent = `${gridRange.value} x ${gridRange.value}`;
});

rainbowBtn.addEventListener("click", () => {
  clearActive();
  rainbowBtn.classList.add("active");
  if (!rainbowBtn.classList.contains("active")) {
    rainbowBtn.classList.add("active");
  }
  for (const div of squareGrid) {
    div.addEventListener("mouseover", () => rainbow(div));
    clearBtn.addEventListener("click", () => clear(div));
  }
});

eraserBtn.addEventListener("click", () => {
  clearActive();
  eraserBtn.classList.add("active");
  for (const div of squareGrid) {
    div.addEventListener("mouseover", () => erase(div));
    clearBtn.addEventListener("click", () => clear(div));
  }
});

normalBtn.addEventListener("click", () => {
  clearActive();
  normalBtn.classList.add("active");
  for (const div of squareGrid) {
    div.addEventListener("mouseover", () => sketch(div));
    clearBtn.addEventListener("click", () => clear(div));
  }
});

colorPickerBG.addEventListener("input", () => changeCanvas());

for (const div of squareGrid) {
  div.addEventListener("mouseover", () => sketch(div));
  clearBtn.addEventListener("click", () => clear(div));
}

function sketch(square) {
  if (mousedown) {
    // console.log("mousedown");
    const chosenColor = colorPicker.value;
    square.style.backgroundColor = `${chosenColor}`;
  }
  // console.log("mouseup");
}

function changeCanvas() {
  const chosenColor = colorPickerBG.value;
  // console.log(chosenColor);
  for (const div of squareGrid) {
    div.style = `background-color: ${chosenColor}`;
  }
}

function clear(square) {
  square.style.backgroundColor = "white";
}

function rainbow(square) {
  if (mousedown) {
    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);
    square.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
  }
}

function erase(square) {
  if (mousedown) {
    console.log("mousedown");
    square.style.backgroundColor = "white";
  }
  console.log("mouseup");
}

function clearActive() {
  normalBtn.classList.remove("active");
  rainbowBtn.classList.remove("active");
  eraserBtn.classList.remove("active");
}
