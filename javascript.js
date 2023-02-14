let hoveredColor; //sets color for hovered grid blocks


/* Create grid */
function createDivGrid(dimension) {
    const numOfBlock = dimension * dimension;
    const container = document.querySelector('div.container');
    for (let i = 0; i < numOfBlock; i++) {
        newDiv = document.createElement('div');
        newDiv.classList.add('grid-item');
        container.appendChild(newDiv);
    }
    container.style.cssText = `grid-template-columns: repeat(${dimension}, 1fr)`;
}

function setColor(color) {
    hoveredColor = color;
}

function start(dimension) {
    createDivGrid(dimension);
    addResetEffect();
    addHoverEffectToAll();
    setColor('black');
}
/* ---- */


/* Remove all event listeners */
function removeAllEventListeners(Node) {
    const newNode = Node.cloneNode(true);
    Node.replaceWith(newNode);
    return newNode;
}
/* ---- */


/* Hover color effect */
function addHoverEffect(e) {
    e.target.classList.add('hoveredBlock');
    e.target.style.backgroundColor = hoveredColor;
}

function addHoverEffectToAll() {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(function(item) {
        item = removeAllEventListeners(item);
        item.addEventListener('mouseover', addHoverEffect);
    });
}
/* ---- */


/* Reset grid */
function removeAllChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function promptNewGrid() {
    let gridDimension = parseInt(prompt('Enter the dimension for new grid (1-100): '))
    if (gridDimension > 100 || gridDimension < 1) {
        alert('ERROR! Value must be between 1 and 100. Please try again.');
        promptNewGrid();
    }
    start(gridDimension);
}

function resetGrid() {
    const container = document.querySelector('.container');
    removeAllChildren(container);
    promptNewGrid();
}

function addResetEffect() {
    const button = document.querySelector('button.reset');
    button.addEventListener('click', resetGrid);
}
/* ---- */


/* Add color features */
function changeColor(e) {
    setColor(e.target.textContent);
}

function addColorButtons(...colors) {
    const featureArea = document.querySelector('.feature-control');
    for (const color of colors) {
        const colorButton = document.createElement('button');
        colorButton.textContent = `${color}`;
        colorButton.classList.add('color-button');
        colorButton.addEventListener('click', changeColor);
        colorButton.addEventListener('click', addHoverEffectToAll);
        featureArea.appendChild(colorButton);
    }
}
/* ---- */


/* Add rainbow feature */
function getRandomNumber(max) {
    return Math.floor(Math.random()*max);
}

function addRainbowEffect(e) {
    e.target.classList.add('hoveredBlock');
    hoveredColor = `rgb(${getRandomNumber(256)},${getRandomNumber(256)},${getRandomNumber(256)})`;
    e.target.style.backgroundColor = hoveredColor;
}

function addRainbowEffectToAll() {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(function(item) {
        item = removeAllEventListeners(item);
        item.addEventListener('mouseover', addRainbowEffect)
    })    
}

function addRainbowButton() {
    const rainbowButton = document.createElement('button');
    rainbowButton.textContent = 'Rainbow';
    rainbowButton.addEventListener('click', addRainbowEffectToAll);
    const buttonList = document.querySelector('.feature-control');
    buttonList.appendChild(rainbowButton);
}
/* ---- */


/* Add erase feature */
function addEraserEffect(e) {
    hoveredColor = '';
    e.target.style.removeProperty('background-color');
    e.target.classList.remove('hoveredBlock');
}

function addEraserEffectToAll() {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(function(item) {
        item = removeAllEventListeners(item);
        item.addEventListener('mouseover', addEraserEffect);
    })
}

function addEraserButton() {
    const featureArea = document.querySelector('.feature-control');
    const eraserButton = document.createElement('button');
    eraserButton.textContent = 'Erase'
    eraserButton.classList.add('eraser');
    eraserButton.addEventListener('click', addEraserEffectToAll);
    featureArea.appendChild(eraserButton);
}
/* ---- */


start(16);
addColorButtons('Black', 'Red', 'Blue', 'Green');
addRainbowButton();
addEraserButton();
