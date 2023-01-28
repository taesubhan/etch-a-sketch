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

function addHoverColor(e) {
    e.target.classList.add('hoveredBlock');
}

function hoverEffect() {
    const blocks = document.querySelectorAll('.grid-item');
    blocks.forEach(function(block) {block.addEventListener('mouseover', addHoverColor)});
}

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

function start(dimension) {
    createDivGrid(dimension);
    addResetEffect();
    hoverEffect();
}

start(16);